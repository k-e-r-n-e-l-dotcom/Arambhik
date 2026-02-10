/*
  # Update Materials Policies for Public Access and Teacher Uploads

  1. Changes
    - Allow public (unauthenticated) read access to materials
    - Allow teachers to upload, update, and delete materials
    - Maintain admin full access

  2. Security
    - Public users can only read materials
    - Teachers and admins can manage materials
    - No authentication required for viewing content
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Students can view materials for their class" ON materials;
DROP POLICY IF EXISTS "Admins can insert materials" ON materials;
DROP POLICY IF EXISTS "Admins can update materials" ON materials;
DROP POLICY IF EXISTS "Admins can delete materials" ON materials;

-- Create new policies for public read access
CREATE POLICY "Public can view all materials"
  ON materials FOR SELECT
  TO anon, authenticated
  USING (true);

-- Teachers and admins can insert materials
CREATE POLICY "Teachers and admins can insert materials"
  ON materials FOR INSERT
  TO authenticated
  WITH CHECK (
    (auth.jwt()->>'role')::text IN ('admin', 'teacher')
  );

-- Teachers and admins can update materials
CREATE POLICY "Teachers and admins can update materials"
  ON materials FOR UPDATE
  TO authenticated
  USING ((auth.jwt()->>'role')::text IN ('admin', 'teacher'))
  WITH CHECK ((auth.jwt()->>'role')::text IN ('admin', 'teacher'));

-- Teachers and admins can delete materials
CREATE POLICY "Teachers and admins can delete materials"
  ON materials FOR DELETE
  TO authenticated
  USING ((auth.jwt()->>'role')::text IN ('admin', 'teacher'));
