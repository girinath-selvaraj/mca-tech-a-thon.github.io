/*
  # Tech Event Database Schema

  1. New Tables
    - `attendees`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `full_name` (text)
      - `company` (text)
      - `created_at` (timestamp)
    
    - `sessions`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `speaker_id` (uuid, foreign key)
      - `start_time` (timestamp)
      - `end_time` (timestamp)
      - `room` (text)
      - `capacity` (integer)
    
    - `speakers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `bio` (text)
      - `company` (text)
      - `photo_url` (text)
      - `twitter` (text)
      - `linkedin` (text)
    
    - `registrations`
      - `id` (uuid, primary key)
      - `attendee_id` (uuid, foreign key)
      - `session_id` (uuid, foreign key)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create tables
CREATE TABLE speakers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  bio text,
  company text,
  photo_url text,
  twitter text,
  linkedin text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  speaker_id uuid REFERENCES speakers(id),
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  room text,
  capacity integer DEFAULT 100,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE attendees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  company text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attendee_id uuid REFERENCES attendees(id),
  session_id uuid REFERENCES sessions(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(attendee_id, session_id)
);

-- Enable Row Level Security
ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view speakers"
  ON speakers
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view sessions"
  ON sessions
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can view their own attendee profile"
  ON attendees
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can register for sessions"
  ON registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM attendees
      WHERE id = registrations.attendee_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their registrations"
  ON registrations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM attendees
      WHERE id = registrations.attendee_id
      AND user_id = auth.uid()
    )
  );