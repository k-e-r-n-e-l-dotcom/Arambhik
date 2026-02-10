/*
  # Create LMS System Tables

  1. New Tables
    - `materials`
      - `id` (uuid, primary key)
      - `title` (text)
      - `subject` (text)
      - `class` (text)
      - `file_url` (text)
      - `type` (text) - book, notes, mindmap, link
      - `description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `leaderboard`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key to profiles)
      - `score` (numeric)
      - `rank` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Update profiles table
    - Add `address` field
    - Add `attendance_percentage` field
    - Add `marks` field

  3. Security
    - Enable RLS on all tables
    - Students can read their own materials and leaderboard
    - Admins can manage everything
*/

-- Update profiles table with new fields
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'address'
  ) THEN
    ALTER TABLE profiles ADD COLUMN address text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'attendance_percentage'
  ) THEN
    ALTER TABLE profiles ADD COLUMN attendance_percentage numeric DEFAULT 0;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'marks'
  ) THEN
    ALTER TABLE profiles ADD COLUMN marks numeric DEFAULT 0;
  END IF;
END $$;

-- Create materials table
CREATE TABLE IF NOT EXISTS materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subject text NOT NULL,
  class text NOT NULL,
  file_url text,
  type text NOT NULL CHECK (type IN ('book', 'notes', 'mindmap', 'link')),
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE materials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view materials for their class"
  ON materials FOR SELECT
  TO authenticated
  USING (
    (auth.jwt()->>'role')::text IN ('admin', 'teacher')
    OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id::text = (auth.jwt()->>'profile_id')::text
      AND profiles.class = materials.class
      AND profiles.role = 'student'
    )
  );

CREATE POLICY "Admins can insert materials"
  ON materials FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt()->>'role')::text = 'admin');

CREATE POLICY "Admins can update materials"
  ON materials FOR UPDATE
  TO authenticated
  USING ((auth.jwt()->>'role')::text = 'admin')
  WITH CHECK ((auth.jwt()->>'role')::text = 'admin');

CREATE POLICY "Admins can delete materials"
  ON materials FOR DELETE
  TO authenticated
  USING ((auth.jwt()->>'role')::text = 'admin');

-- Create leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  score numeric NOT NULL DEFAULT 0,
  rank integer NOT NULL DEFAULT 999,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(student_id)
);

ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view leaderboard"
  ON leaderboard FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert leaderboard entries"
  ON leaderboard FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt()->>'role')::text = 'admin');

CREATE POLICY "Admins can update leaderboard"
  ON leaderboard FOR UPDATE
  TO authenticated
  USING ((auth.jwt()->>'role')::text = 'admin')
  WITH CHECK ((auth.jwt()->>'role')::text = 'admin');

CREATE POLICY "Admins can delete leaderboard entries"
  ON leaderboard FOR DELETE
  TO authenticated
  USING ((auth.jwt()->>'role')::text = 'admin');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_materials_class ON materials(class);
CREATE INDEX IF NOT EXISTS idx_materials_type ON materials(type);
CREATE INDEX IF NOT EXISTS idx_leaderboard_rank ON leaderboard(rank);
CREATE INDEX IF NOT EXISTS idx_leaderboard_student_id ON leaderboard(student_id);
CREATE INDEX IF NOT EXISTS idx_profiles_class ON profiles(class);

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_materials_updated_at ON materials;
CREATE TRIGGER update_materials_updated_at
  BEFORE UPDATE ON materials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_leaderboard_updated_at ON leaderboard;
CREATE TRIGGER update_leaderboard_updated_at
  BEFORE UPDATE ON leaderboard
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
