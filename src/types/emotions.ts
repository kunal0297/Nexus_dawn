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