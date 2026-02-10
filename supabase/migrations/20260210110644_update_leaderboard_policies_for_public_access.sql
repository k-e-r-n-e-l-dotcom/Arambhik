/*
  # Update Leaderboard Policies for Public Access

  1. Changes
    - Allow public (unauthenticated) read access to leaderboard
    - Maintain admin and teacher control for updates

  2. Security
    - Public users can only read leaderboard
    - Only admins and teachers can modify leaderboard
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Everyone can view leaderboard" ON leaderboard;
DROP POLICY IF EXISTS "Admins can insert leaderboard entries" ON leaderboard;
DROP POLICY IF EXISTS "Admins can update leaderboard" ON leaderboard;
DROP POLICY IF EXISTS "Admins can delete leaderboard entries" ON leaderboard;

-- Create new policy for public read access
CREATE POLICY "Public can view leaderboard"
  ON leaderboard FOR SELECT
  TO anon, authenticated
  USING (true);

-- Teachers and admins can insert leaderboard entries
CREATE POLICY "Teachers and admins can insert leaderboard entries"
  ON leaderboard FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt()->>'role')::text IN ('admin', 'teacher'));

-- Teachers and admins can update leaderboard
CREATE POLICY "Teachers and admins can update leaderboard"
  ON leaderboard FOR UPDATE
  TO authenticated
  USING ((auth.jwt()->>'role')::text IN ('admin', 'teacher'))
  WITH CHECK ((auth.jwt()->>'role')::text IN ('admin', 'teacher'));

-- Teachers and admins can delete leaderboard entries
CREATE POLICY "Teachers and admins can delete leaderboard entries"
  ON leaderboard FOR DELETE
  TO authenticated
  USING ((auth.jwt()->>'role')::text IN ('admin', 'teacher'));
