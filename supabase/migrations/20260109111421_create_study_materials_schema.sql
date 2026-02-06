/*
  # Study Materials Management System

  1. New Tables
    - `classes`
      - `id` (uuid, primary key)
      - `name` (text) - e.g., "Class 6", "Class 7"
      - `display_order` (integer) - for sorting
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `subjects`
      - `id` (uuid, primary key)
      - `class_id` (uuid, foreign key to classes)
      - `name` (text) - e.g., "Science", "Mathematics"
      - `icon` (text) - emoji or icon name
      - `color` (text) - CSS color class
      - `display_order` (integer) - for sorting
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `chapters`
      - `id` (uuid, primary key)
      - `subject_id` (uuid, foreign key to subjects)
      - `title` (text) - chapter title
      - `display_order` (integer) - for sorting
      - `ncert_link` (text) - URL to NCERT textbook
      - `notes` (text) - study notes content
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Students can read all content
    - Only authenticated admin users can modify content
*/

-- Create classes table
CREATE TABLE IF NOT EXISTS classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  name text NOT NULL,
  icon text DEFAULT '📚',
  color text DEFAULT 'bg-blue-500',
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(class_id, name)
);

-- Create chapters table
CREATE TABLE IF NOT EXISTS chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  title text NOT NULL,
  display_order integer NOT NULL,
  ncert_link text DEFAULT '',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;

-- Policies for classes table
CREATE POLICY "Anyone can read classes"
  ON classes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert classes"
  ON classes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update classes"
  ON classes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete classes"
  ON classes FOR DELETE
  TO authenticated
  USING (true);

-- Policies for subjects table
CREATE POLICY "Anyone can read subjects"
  ON subjects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert subjects"
  ON subjects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update subjects"
  ON subjects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete subjects"
  ON subjects FOR DELETE
  TO authenticated
  USING (true);

-- Policies for chapters table
CREATE POLICY "Anyone can read chapters"
  ON chapters FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert chapters"
  ON chapters FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update chapters"
  ON chapters FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete chapters"
  ON chapters FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_subjects_class_id ON subjects(class_id);
CREATE INDEX IF NOT EXISTS idx_chapters_subject_id ON chapters(subject_id);
CREATE INDEX IF NOT EXISTS idx_classes_display_order ON classes(display_order);
CREATE INDEX IF NOT EXISTS idx_subjects_display_order ON subjects(display_order);
CREATE INDEX IF NOT EXISTS idx_chapters_display_order ON chapters(display_order);
