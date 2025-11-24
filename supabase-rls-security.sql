-- =====================================================
-- SUPABASE AUTHENTICATION SETUP
-- =====================================================
-- This enables proper authentication for anonymous users
-- Run this in your Supabase SQL Editor

-- STEP 1: FIRST, DROP ALL EXISTING POLICIES
DROP POLICY IF EXISTS "Enable insert for anon users" ON public.volunteer_submissions;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.volunteer_submissions;
DROP POLICY IF EXISTS "Allow public inserts" ON public.volunteer_submissions;
DROP POLICY IF EXISTS "allow_public_insert" ON public.volunteer_submissions;
DROP POLICY IF EXISTS "allow_authenticated_read" ON public.volunteer_submissions;
DROP POLICY IF EXISTS "allow_authenticated_update" ON public.volunteer_submissions;
DROP POLICY IF EXISTS "allow_authenticated_delete" ON public.volunteer_submissions;
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.volunteer_submissions;
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.volunteer_submissions;
DROP POLICY IF EXISTS "Allow authenticated select" ON public.volunteer_submissions;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.volunteer_submissions;
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.volunteer_submissions;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.volunteer_submissions;
DROP POLICY IF EXISTS "Enable select for authenticated" ON public.volunteer_submissions;
DROP POLICY IF EXISTS "Enable update for authenticated" ON public.volunteer_submissions;
DROP POLICY IF EXISTS "Enable delete for authenticated" ON public.volunteer_submissions;

-- STEP 2: ENABLE RLS
ALTER TABLE public.volunteer_submissions ENABLE ROW LEVEL SECURITY;

-- STEP 3: CREATE POLICY FOR ANONYMOUS INSERTS (This is the key fix!)
-- This allows unauthenticated users to insert records
CREATE POLICY "anon_can_insert_volunteer_submissions"
  ON public.volunteer_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- STEP 4: CREATE POLICY FOR AUTHENTICATED INSERTS (Users can submit too)
CREATE POLICY "authenticated_can_insert_volunteer_submissions"
  ON public.volunteer_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- STEP 5: CREATE POLICY FOR AUTHENTICATED USERS TO READ (Admins only)
CREATE POLICY "authenticated_can_read_volunteer_submissions"
  ON public.volunteer_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- STEP 6: CREATE POLICY FOR AUTHENTICATED USERS TO UPDATE (Admins only)
CREATE POLICY "authenticated_can_update_volunteer_submissions"
  ON public.volunteer_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- STEP 7: CREATE POLICY FOR AUTHENTICATED USERS TO DELETE (Admins only)
CREATE POLICY "authenticated_can_delete_volunteer_submissions"
  ON public.volunteer_submissions
  FOR DELETE
  TO authenticated
  USING (true);

-- STEP 8: GRANT PERMISSIONS TO PUBLIC ROLE (This is crucial!)
GRANT USAGE ON SCHEMA public TO public;
GRANT INSERT ON TABLE public.volunteer_submissions TO public;

-- STEP 9: VERIFY EVERYTHING
-- Run this to check if policies are created:
-- SELECT schemaname, tablename, policyname, permissive, roles, qual, with_check 
-- FROM pg_policies WHERE tablename = 'volunteer_submissions' ORDER BY policyname;

-- If you see these policies, authentication is set up correctly:
-- 1. anon_can_insert_volunteer_submissions
-- 2. authenticated_can_insert_volunteer_submissions
-- 3. authenticated_can_read_volunteer_submissions
-- 4. authenticated_can_update_volunteer_submissions
-- 5. authenticated_can_delete_volunteer_submissions
