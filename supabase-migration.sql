-- Migration script to add authentication to existing player_evaluations table
-- Run this in your Supabase SQL Editor

-- Step 1: Drop existing policies (if any)
DROP POLICY IF EXISTS "Allow all operations" ON player_evaluations;
DROP POLICY IF EXISTS "Users can view their own evaluations" ON player_evaluations;
DROP POLICY IF EXISTS "Users can insert their own evaluations" ON player_evaluations;
DROP POLICY IF EXISTS "Users can update their own evaluations" ON player_evaluations;
DROP POLICY IF EXISTS "Users can delete their own evaluations" ON player_evaluations;

-- Step 2: Add user_id column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'player_evaluations' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE player_evaluations
    ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Step 3: Create index on user_id if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_user_id ON player_evaluations(user_id);

-- Step 4: Enable Row Level Security
ALTER TABLE player_evaluations ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS Policies
CREATE POLICY "Users can view their own evaluations"
  ON player_evaluations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own evaluations"
  ON player_evaluations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own evaluations"
  ON player_evaluations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own evaluations"
  ON player_evaluations FOR DELETE
  USING (auth.uid() = user_id);

-- Done! Your table is now ready for authentication.
