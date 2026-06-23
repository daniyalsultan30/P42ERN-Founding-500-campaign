-- Create waitlist_signups table for the Founding 500 campaign
CREATE TABLE waitlist_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  message_type_focus TEXT CHECK (message_type_focus IN ('Work', 'Personal', 'Both equally', 'Not sure yet')),
  referral_intent TEXT CHECK (referral_intent IN ('Yes', 'No', 'Maybe')),
  use_case_tags TEXT[] DEFAULT '{}',
  blockers TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Create policies for public inserts and authenticated reads
CREATE POLICY "allow_public_insert" ON waitlist_signups
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "allow_authenticated_select" ON waitlist_signups
  FOR SELECT TO authenticated USING (true);

-- Create index for faster queries
CREATE INDEX idx_waitlist_created_at ON waitlist_signups(created_at DESC);