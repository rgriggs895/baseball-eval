-- Create player_evaluations table
CREATE TABLE IF NOT EXISTS player_evaluations (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  player_number VARCHAR(50) NOT NULL,
  age_group VARCHAR(50) NOT NULL,
  primary_position VARCHAR(50) NOT NULL,
  secondary_position VARCHAR(50),

  -- Evaluation scores (1-5 for each)
  outfield_fundamentals INTEGER CHECK (outfield_fundamentals >= 1 AND outfield_fundamentals <= 5),
  outfield_arm_strength INTEGER CHECK (outfield_arm_strength >= 1 AND outfield_arm_strength <= 5),
  infield_fundamentals INTEGER CHECK (infield_fundamentals >= 1 AND infield_fundamentals <= 5),
  infield_arm_strength INTEGER CHECK (infield_arm_strength >= 1 AND infield_arm_strength <= 5),
  hitting_fundamentals INTEGER CHECK (hitting_fundamentals >= 1 AND hitting_fundamentals <= 5),
  hitting_power INTEGER CHECK (hitting_power >= 1 AND hitting_power <= 5),
  pitching_fundamentals INTEGER CHECK (pitching_fundamentals >= 1 AND pitching_fundamentals <= 5),
  pitching_velocity INTEGER CHECK (pitching_velocity >= 1 AND pitching_velocity <= 5),
  pitching_command INTEGER CHECK (pitching_command >= 1 AND pitching_command <= 5),
  catching_fundamentals INTEGER CHECK (catching_fundamentals >= 1 AND catching_fundamentals <= 5),
  catching_arm_strength INTEGER CHECK (catching_arm_strength >= 1 AND catching_arm_strength <= 5),
  catching_blocking INTEGER CHECK (catching_blocking >= 1 AND catching_blocking <= 5),

  total_points INTEGER NOT NULL,
  notes TEXT[] DEFAULT '{}',

  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index on player_number for faster lookups
CREATE INDEX idx_player_number ON player_evaluations(player_number);

-- Create index on age_group for filtering
CREATE INDEX idx_age_group ON player_evaluations(age_group);

-- Create index on user_id for faster lookups
CREATE INDEX idx_user_id ON player_evaluations(user_id);

-- Enable Row Level Security
ALTER TABLE player_evaluations ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only read their own evaluations
CREATE POLICY "Users can view their own evaluations"
  ON player_evaluations FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policies: Users can insert their own evaluations
CREATE POLICY "Users can insert their own evaluations"
  ON player_evaluations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies: Users can update their own evaluations
CREATE POLICY "Users can update their own evaluations"
  ON player_evaluations FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies: Users can delete their own evaluations
CREATE POLICY "Users can delete their own evaluations"
  ON player_evaluations FOR DELETE
  USING (auth.uid() = user_id);
