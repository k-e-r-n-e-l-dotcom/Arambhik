/*
  # Create User Profiles Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `full_name` (text, required)
      - `role` (text: admin/teacher/student, default 'student')
      - `username` (text, unique, required)
      - `email` (text)
      - `phone` (text)
      - `class` (text, for students)
      - `father_mobile` (text, for students)
      - `mother_mobile` (text, for students)
      - `student_mobile` (text, for students)
      - `teacher_subject` (text, for teachers)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Helper Functions
    - `is_admin()` checks if current user has admin role
    - `get_user_role()` returns current user's role

  3. Security
    - Enable RLS on `profiles` table
    - Admins can view all profiles
    - Teachers can view student profiles
    - Users can view own profile
    - Admins can update any profile
    - Users can update own profile
    - Admins can delete profiles

  4. Indexes
    - `profiles.role` for role-based queries
    - `profiles.class` for class-based lookups
    - `profiles.created_at` for ordering
*/

-- Create profiles table first
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'student' CHECK (role IN ('admin', 'teacher', 'student')),
  username text UNIQUE NOT NULL,
  email text,
  phone text,
  class text,
  father_mobile text,
  mother_mobile text,
  student_mobile text,
  teacher_subject text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Helper function: check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper function: get current user role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS text AS $$
  SELECT role FROM profiles
  WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- SELECT policies
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Teachers can view student profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'teacher'
    )
    AND role = 'student'
  );

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- INSERT policy
CREATE POLICY "Admins can insert profiles"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- UPDATE policies
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- DELETE policy
CREATE POLICY "Admins can delete profiles"
  ON profiles FOR DELETE
  TO authenticated
  USING (is_admin());

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_class ON profiles(class);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON profiles(created_at DESC);
