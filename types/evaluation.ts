export interface EvaluationData {
  playerNumber: string;
  ageGroup: string;
  primaryPosition: string;
  secondaryPosition: string;

  // Evaluation scores
  outfieldFundamentals: number;
  outfieldArmStrength: number;
  infieldFundamentals: number;
  infieldArmStrength: number;
  hittingFundamentals: number;
  hittingPower: number;
  pitchingFundamentals: number;
  pitchingVelocity: number;
  pitchingCommand: number;
  catchingFundamentals: number;
  catchingArmStrength: number;
  catchingBlocking: number;

  notes: string[];
  totalPoints: number;
}

export const initialEvaluationData: EvaluationData = {
  playerNumber: '',
  ageGroup: '',
  primaryPosition: '',
  secondaryPosition: '',
  outfieldFundamentals: 0,
  outfieldArmStrength: 0,
  infieldFundamentals: 0,
  infieldArmStrength: 0,
  hittingFundamentals: 0,
  hittingPower: 0,
  pitchingFundamentals: 0,
  pitchingVelocity: 0,
  pitchingCommand: 0,
  catchingFundamentals: 0,
  catchingArmStrength: 0,
  catchingBlocking: 0,
  notes: [],
  totalPoints: 0,
};

export type EvaluationCategory =
  | 'outfieldFundamentals'
  | 'outfieldArmStrength'
  | 'infieldFundamentals'
  | 'infieldArmStrength'
  | 'hittingFundamentals'
  | 'hittingPower'
  | 'pitchingFundamentals'
  | 'pitchingVelocity'
  | 'pitchingCommand'
  | 'catchingFundamentals'
  | 'catchingArmStrength'
  | 'catchingBlocking';
