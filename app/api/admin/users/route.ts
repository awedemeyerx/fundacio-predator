import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAdminUser } from '@/lib/admin-auth';

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

  // Invite user via Supabase Auth — creates auth user + sends magic link
  const redirectTo = 'https://fundaciopredator.org/admin/auth/callback';
  let authUid: string;

  const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(
    email.toLowerCase(),
    { redirectTo }
  );

  if (inviteError) {
    // If user already exists in Auth (409), look up their existing uid
    if (inviteError.status === 422 || inviteError.message?.includes('already been registered')) {
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
      return NextResponse.json({ error: inviteError.message }, { status: 500 });
    }
  } else {
    authUid = inviteData.user.id;
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
