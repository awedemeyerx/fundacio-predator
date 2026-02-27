import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAdminUser } from '@/lib/admin-auth';
import { sendAdminInvite } from '@/lib/email';

export async function GET() {
  const user = await getAdminUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { data, error } = await supabaseAdmin
    .from('fundacio_admin_users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ users: data });
}

export async function POST(request: NextRequest) {
  const currentUser = await getAdminUser();
  if (!currentUser || currentUser.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { email, role, name } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const validRoles = ['admin', 'editor'];
  if (role && !validRoles.includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  // Check if email already exists in admin users table
  const { data: existing } = await supabaseAdmin
    .from('fundacio_admin_users')
    .select('id')
    .eq('email', email.toLowerCase())
    .single();

  if (existing) {
    return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
  }

  // Generate invite link via Supabase Auth (without sending email)
  const redirectTo = 'https://fundaciopredator.org/admin/auth/reset-callback';
  let authUid: string;
  let inviteLink: string | null = null;

  const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
    type: 'invite',
    email: email.toLowerCase(),
    options: { redirectTo },
  });

  if (linkError) {
    // If user already exists in Auth, look up their existing uid
    if (linkError.message?.includes('already been registered') || linkError.status === 422) {
      const { data: listData, error: listError } = await supabaseAdmin.auth.admin.listUsers();
      if (listError) {
        return NextResponse.json({ error: listError.message }, { status: 500 });
      }
      const existingAuthUser = listData.users.find(
        (u) => u.email?.toLowerCase() === email.toLowerCase()
      );
      if (!existingAuthUser) {
        return NextResponse.json({ error: 'User exists in auth but could not be found' }, { status: 500 });
      }
      authUid = existingAuthUser.id;

      // Generate a magic link for the existing auth user so we can still send an invite email
      const { data: magicData } = await supabaseAdmin.auth.admin.generateLink({
        type: 'magiclink',
        email: email.toLowerCase(),
        options: { redirectTo },
      });
      if (magicData?.properties?.action_link) {
        inviteLink = magicData.properties.action_link;
      }
    } else {
      return NextResponse.json({ error: linkError.message }, { status: 500 });
    }
  } else {
    authUid = linkData.user.id;
    inviteLink = linkData.properties.action_link;
  }

  // Send invite email via Brevo
  if (inviteLink) {
    try {
      await sendAdminInvite({ email: email.toLowerCase(), name: name || null, inviteLink });
    } catch (emailErr) {
      console.error('Failed to send invite email:', emailErr);
      // Continue — user was created, email can be resent later
    }
  }

  // Create the admin user entry with the real auth uid
  const { data, error } = await supabaseAdmin
    .from('fundacio_admin_users')
    .insert({
      auth_uid: authUid,
      email: email.toLowerCase(),
      name: name || null,
      role: role || 'editor',
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ user: data });
}
