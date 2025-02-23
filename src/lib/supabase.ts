// This file is kept for type definitions only
export type Speaker = {
  id: string;
  name: string;
  bio: string | null;
  company: string | null;
  photo_url: string | null;
  twitter: string | null;
  linkedin: string | null;
};

export type Session = {
  id: string;
  title: string;
  description: string | null;
  speaker_id: string;
  start_time: string;
  end_time: string;
  room: string | null;
  capacity: number;
  speaker?: Speaker;
};

export type Attendee = {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  company: string | null;
};

export type Registration = {
  id: string;
  attendee_id: string;
  session_id: string;
  created_at: string;
  session?: Session;
};