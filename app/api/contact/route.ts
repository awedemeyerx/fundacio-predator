import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendContactNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, page } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Save to Supabase
    if (supabaseAdmin) {
      try {
        await supabaseAdmin.from('contact_submissions').insert({
          name,
          email,
          message,
          page: page || 'unknown',
        });
      } catch (dbError) {
        console.error('Failed to save contact submission:', dbError);
      }
    }

    // Send notification email via Brevo
    if (process.env.BREVO_API_KEY) {
      try {
        await sendContactNotification({ name, email, message, page: page || 'unknown' });
      } catch (emailError) {
        console.error('Failed to send contact notification:', emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
