/*
  # Student Corner Content Schema

  ## Summary
  Creates a comprehensive content management system for the Student Corner with support for classes 6-10.

  ## New Tables

  ### `classes`
  Stores class information (e.g., Class 6, Class 7)
  - `id` (uuid, primary key)
  - `name` (text, unique) - Class name (e.g., "Class 6")
  - `display_order` (integer) - Sort order
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `subjects`
  Stores subject information per class
  - `id` (uuid, primary key)
  - `class_id` (uuid, foreign key to classes)
  - `name` (text) - Subject name (e.g., "Science", "Mathematics")
  - `display_order` (integer) - Sort order within class
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `chapters`
  Stores chapter content for each subject
  - `id` (uuid, primary key)
  - `subject_id` (uuid, foreign key to subjects)
  - `title` (text) - Chapter title
  - `ncert_link` (text) - URL to NCERT resources
  - `notes` (text) - Study notes (300+ words)
  - `mindmap` (text) - Mindmap content/data
  - `display_order` (integer) - Sort order within subject
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - All tables are PUBLIC for read access (no authentication required)
  - Only authenticated admins can INSERT/UPDATE/DELETE
  - RLS enabled on all tables with appropriate policies
*/

CREATE TABLE IF NOT EXISTS classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  name text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(class_id, name)
);

CREATE TABLE IF NOT EXISTS chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  title text NOT NULL,
  ncert_link text DEFAULT '',
  notes text DEFAULT '',
  mindmap text DEFAULT '',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view classes"
  ON classes FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view subjects"
  ON subjects FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view chapters"
  ON chapters FOR SELECT
  USING (true);

CREATE INDEX IF NOT EXISTS idx_subjects_class_id ON subjects(class_id);
CREATE INDEX IF NOT EXISTS idx_chapters_subject_id ON chapters(subject_id);

INSERT INTO classes (name, display_order) VALUES
  ('Class 6', 1),
  ('Class 7', 2),
  ('Class 8', 3),
  ('Class 9', 4),
  ('Class 10', 5)
ON CONFLICT (name) DO NOTHING;
