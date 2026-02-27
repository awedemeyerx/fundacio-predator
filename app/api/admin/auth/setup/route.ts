import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * Bootstrap route: creates the first admin user.
 * Only works when no admin users exist yet (or table doesn't exist).
 * POST { email, password, name? }
 */
export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.supabase_url || '';
  const supabaseServiceKey = process.env.supabase_secret_key || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const adminClient = createClient(supabaseUrl, supabaseServiceKey);

  // Check if admin users already exist — if so, block this route
  const { data: existingUsers, error: tableError } = await adminClient
    .from('fundacio_admin_users')
    .select('id')
    .limit(1);

  if (existingUsers && existingUsers.length > 0) {
    return NextResponse.json({ error: 'Setup already completed. Admin users exist.' }, { status: 403 });
  }

  const { email, password, name } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
  }

  // Create Supabase Auth user
  const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (authError) {
    // User might already exist in Auth but not in admin_users
    if (authError.message.includes('already been registered')) {
      // Look up existing auth user
      const { data: { users } } = await adminClient.auth.admin.listUsers();
      const existingAuth = users?.find(u => u.email === email.toLowerCase());

      if (existingAuth) {
        // Insert into admin_users table
        const { error: insertError } = await adminClient
          .from('fundacio_admin_users')
          .insert({
            auth_uid: existingAuth.id,
            email: email.toLowerCase(),
            name: name || null,
            role: 'admin',
          });

        if (insertError) {
          return NextResponse.json({ error: insertError.message }, { status: 500 });
        }

        return NextResponse.json({
          success: true,
          message: 'Auth user existed, added as admin. You can now log in.',
        });
      }
    }
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }

  // Insert into fundacio_admin_users as admin
  const { error: insertError } = await adminClient
    .from('fundacio_admin_users')
    .insert({
      auth_uid: authData.user.id,
      email: email.toLowerCase(),
      name: name || null,
      role: 'admin',
    });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: 'First admin created. You can now log in at /admin/login',
  });
}
