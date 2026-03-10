-- Run these queries in your Supabase SQL Editor

-- Create Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  business_name TEXT,
  service_interested TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Note: Since we use Service Role Key for inserting from the server, 
-- we don't strictly *need* RLS to allow inserts from anon. 
-- However, it is best practice to enable it if you ever use the anon key.
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create Meeting Requests Table
CREATE TABLE IF NOT EXISTS public.meeting_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  preferred_time TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.meeting_requests ENABLE ROW LEVEL SECURITY;

-- Optional: If you want to enable inserting directly from the client without API routes (not recommended here safely without Auth), 
-- you'd add policies like this:
-- CREATE POLICY "Allow anonymous inserts" ON public.leads FOR INSERT TO anon WITH CHECK (true);
