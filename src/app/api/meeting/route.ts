import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, preferredTime, message } = body;

    // Basic validation
    if (!name || !email || !preferredTime) {
      return NextResponse.json(
        { error: 'Name, email, and preferred time are required fields.' },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      console.warn('Supabase not configured. Simulating meeting request capture for development.');
      return NextResponse.json({ success: true, message: 'Meeting request captured successfully (simulated).' });
    }

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('meeting_requests')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          preferred_time: preferredTime,
          message: message || null,
        },
      ])
      .select();

    if (error) {
      console.error('Error inserting meeting request to Supabase:', error);
      return NextResponse.json(
        { error: 'Failed to capture meeting request. Database error.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Unexpected error in meeting request capture:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
