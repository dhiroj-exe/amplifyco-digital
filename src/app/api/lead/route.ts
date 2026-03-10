import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, businessName, serviceInterested, message, subject } = body;

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required fields.' },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      console.warn('Supabase not configured. Simulating lead capture for development.');
      return NextResponse.json({ success: true, message: 'Lead captured successfully (simulated).' });
    }

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          business_name: businessName || null,
          service_interested: serviceInterested || subject || null,
          message: message || null,
        },
      ])
      .select();

    if (error) {
      console.error('Error inserting lead to Supabase:', error);
      return NextResponse.json(
        { error: 'Failed to capture lead. Database error.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Unexpected error in lead capture:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
