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
    .select('id, email, name, auth_uid')
    .eq('email', email.toLowerCase())
    .single();

  const isResend = !!existing;

  // Generate invite link via Supabase Auth
  const redirectTo = 'https://fundaciopredator.org/admin/auth/reset-callback';
  let authUid: string = existing?.auth_uid || '';
  let inviteLink: string | null = null;

  // We build our own invite URL pointing to an intermediate page.
  // This prevents email security scanners from consuming the one-time token.
  // The intermediate page shows a button; only when clicked, verifyOtp() is called.
  let tokenHash: string | null = null;
  let tokenType: string = 'invite';

  if (!isResend) {
    // New user: try invite link first
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'invite',
      email: email.toLowerCase(),
      options: { redirectTo },
    });

    if (linkError) {
      if (linkError.message?.includes('already been registered') || linkError.status === 422) {
        // User exists in Auth but not in admin_users — look up their uid
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
      } else {
        return NextResponse.json({ error: linkError.message }, { status: 500 });
      }
    } else {
      authUid = linkData.user.id;
      tokenHash = linkData.properties.hashed_token;
    }
  }

  // If no token yet (existing auth user or resend), generate a magic link
  if (!tokenHash) {
    const { data: magicData } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: email.toLowerCase(),
      options: { redirectTo },
    });
    if (magicData?.properties?.hashed_token) {
      tokenHash = magicData.properties.hashed_token;
      tokenType = 'magiclink';
    }
  }

  // Build invite URL pointing to our intermediate page (not Supabase's verify endpoint)
  if (tokenHash) {
    const inviteLink = `https://fundaciopredator.org/admin/auth/accept-invite?token_hash=${tokenHash}&type=${tokenType}`;
    try {
      await sendAdminInvite({ email: email.toLowerCase(), name: name || existing?.name || null, inviteLink });
    } catch (emailErr) {
      console.error('Failed to send invite email:', emailErr);
    }
  }

  // Create admin user entry (only for new users)
  if (!isResend) {
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

  return NextResponse.json({ user: existing, resent: true });
}
