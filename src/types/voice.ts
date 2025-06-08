export interface VoiceEmotion {
  valence: number;    // Positive/negative (-1 to 1)
  arousal: number;    // Energy level (0 to 1)
  dominance: number;  // Control level (0 to 1)
  confidence: number; // Detection confidence (0 to 1)
}

export interface TranscriptionResult {
  text: string;
  confidence: number;
  language: string;
  duration: number;
}

export interface VoiceProcessingResult {
  transcription: TranscriptionResult;
  emotion: VoiceEmotion;
  timestamp: number;
}

export interface FacialEmotion {
  neutral: number;
  happy: number;
  sad: number;
  angry: number;
  fearful: number;
  disgusted: number;
  surprised: number;
  confidence: number;
}

export interface BiofeedbackState {
  voice?: VoiceProcessingResult;
  facial?: FacialEmotion;
  timestamp: number;
}

export interface VoiceProcessingConfig {
  model: 'whisper' | 'gemini';
  language?: string;
  sampleRate?: number;
  emotionThreshold?: number;
}

export interface FacialProcessingConfig {
  model: 'faceapi' | 'mediapipe';
  detectionInterval?: number;
  minConfidence?: number;
} 