/*
  # Fix Security Issues - RLS Performance and Policies

  ## Changes Made

  ### 1. RLS Performance Optimization (profiles table)
    - Wrap all `auth.uid()` and `auth.jwt()` calls with `(select ...)` to prevent re-evaluation per row
    - This improves query performance at scale by ensuring auth functions are called once per query

  ### 2. Remove Unused Indexes
    - Drop `idx_subjects_display_order` (unused)
    - Drop `idx_profiles_class` (unused)
    - Drop `idx_profiles_created_at` (unused)

  ### 3. Consolidate Multiple Permissive Policies (profiles table)
    - Combine multiple SELECT policies into a single policy
    - Combine multiple UPDATE policies into a single policy
    - Reduces policy evaluation overhead and simplifies security model

  ### 4. Fix Function Search Paths
    - Set explicit search_path for `is_admin()` and `get_user_role()` functions
    - Prevents security vulnerabilities from search_path manipulation

  ### 5. Fix RLS "Always True" Policies
    - Replace USING(true) policies on chapters, classes, and subjects tables
    - Restrict INSERT/UPDATE/DELETE to admins only
    - Keep SELECT public for all users

  ## Security Notes
    - All policies remain restrictive (no data leakage)
    - Admin-only operations properly enforced
    - Public read access maintained for study materials
    - Performance improved without compromising security
*/

-- ============================================================================
-- 1. FIX RLS PERFORMANCE ON PROFILES TABLE
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Teachers can view student profiles" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can delete profiles" ON profiles;

-- Consolidate SELECT policies into one (fixes multiple permissive policies issue)
CREATE POLICY "Profiles select access"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    -- Users can view own profile
    (select auth.uid()) = id
    OR
    -- Admins can view all profiles
    ((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'
    OR
    -- Teachers can view student profiles
    (
      ((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'teacher'
      AND role = 'student'
    )
  );

-- INSERT policy (admin only)
CREATE POLICY "Profiles insert access"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

-- Consolidate UPDATE policies into one
CREATE POLICY "Profiles update access"
  ON profiles FOR UPDATE
  TO authenticated
  USING (
    -- Users can update own profile
    (select auth.uid()) = id
    OR
    -- Admins can update any profile
    ((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'
  )
  WITH CHECK (
    -- Users can update own profile
    (select auth.uid()) = id
    OR
    -- Admins can update any profile
    ((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin'
  );

-- DELETE policy (admin only)
CREATE POLICY "Profiles delete access"
  ON profiles FOR DELETE
  TO authenticated
  USING (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================================
-- 2. REMOVE UNUSED INDEXES
-- ============================================================================

DROP INDEX IF EXISTS idx_subjects_display_order;
DROP INDEX IF EXISTS idx_profiles_class;
DROP INDEX IF EXISTS idx_profiles_created_at;

-- ============================================================================
-- 3. FIX FUNCTION SEARCH PATHS
-- ============================================================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
  SELECT coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

CREATE OR REPLACE FUNCTION get_user_role()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
  SELECT coalesce(
    auth.jwt() -> 'app_metadata' ->> 'role',
    'student'
  );
$$;

-- ============================================================================
-- 4. FIX "ALWAYS TRUE" RLS POLICIES ON CLASSES TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Authenticated users can insert classes" ON classes;
DROP POLICY IF EXISTS "Authenticated users can update classes" ON classes;
DROP POLICY IF EXISTS "Authenticated users can delete classes" ON classes;

-- Only admins can modify classes
CREATE POLICY "Admins can insert classes"
  ON classes FOR INSERT
  TO authenticated
  WITH CHECK (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update classes"
  ON classes FOR UPDATE
  TO authenticated
  USING (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete classes"
  ON classes FOR DELETE
  TO authenticated
  USING (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================================
-- 5. FIX "ALWAYS TRUE" RLS POLICIES ON SUBJECTS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Authenticated users can insert subjects" ON subjects;
DROP POLICY IF EXISTS "Authenticated users can update subjects" ON subjects;
DROP POLICY IF EXISTS "Authenticated users can delete subjects" ON subjects;

-- Only admins can modify subjects
CREATE POLICY "Admins can insert subjects"
  ON subjects FOR INSERT
  TO authenticated
  WITH CHECK (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update subjects"
  ON subjects FOR UPDATE
  TO authenticated
  USING (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete subjects"
  ON subjects FOR DELETE
  TO authenticated
  USING (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================================
-- 6. FIX "ALWAYS TRUE" RLS POLICIES ON CHAPTERS TABLE
-- ============================================================================

DROP POLICY IF EXISTS "Authenticated users can insert chapters" ON chapters;
DROP POLICY IF EXISTS "Authenticated users can update chapters" ON chapters;
DROP POLICY IF EXISTS "Authenticated users can delete chapters" ON chapters;

-- Only admins can modify chapters
CREATE POLICY "Admins can insert chapters"
  ON chapters FOR INSERT
  TO authenticated
  WITH CHECK (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update chapters"
  ON chapters FOR UPDATE
  TO authenticated
  USING (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete chapters"
  ON chapters FOR DELETE
  TO authenticated
  USING (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');
