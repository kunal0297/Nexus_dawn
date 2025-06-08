export interface EmotionData {
  emotion: string;
  value: number;
}

export type EmotionType = 
  | 'Joy'
  | 'Sadness'
  | 'Anger'
  | 'Fear'
  | 'Trust'
  | 'Surprise'
  | 'Anticipation'
  | 'Disgust';

export interface EmotionalState {
  emotions: EmotionData[];
  timestamp: Date;
  context?: string;
}

export interface VADEmotions {
  valence: number;  // Pleasure-Displeasure
  arousal: number;  // Activation-Deactivation
  dominance: number; // Control-Submission
}

export interface VADEmotionalState extends VADEmotions {
  timestamp: Date;
  context?: string;
}

export interface EmotionalResonance {
  intensity: number;
  frequency: number;
  phase: number;
  harmonics: number[];
}

export interface EmotionalPreset {
  id: string;
  name: string;
  description: string;
  emotions: VADEmotions;
  resonance?: EmotionalResonance;
} 