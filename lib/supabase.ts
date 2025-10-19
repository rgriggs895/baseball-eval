import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PlayerEvaluation {
  id?: number;
  user_id: string;
  player_number: string;
  age_group: string;
  primary_position: string;
  secondary_position: string;
  outfield_fundamentals: number;
  outfield_arm_strength: number;
  infield_fundamentals: number;
  infield_arm_strength: number;
  hitting_fundamentals: number;
  hitting_power: number;
  pitching_fundamentals: number;
  pitching_velocity: number;
  pitching_command: number;
  catching_fundamentals: number;
  catching_arm_strength: number;
  catching_blocking: number;
  total_points: number;
  notes: string[];
  created_at?: string;
  updated_at?: string;
}
