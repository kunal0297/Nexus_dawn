export interface EmotionalState {
  valence: number;    // -1 to 1 (negative to positive)
  arousal: number;    // 0 to 1 (calm to excited)
  dominance: number;  // 0 to 1 (submissive to dominant)
  timestamp: number;
  confidence?: number;
}

export interface EmotionalResponse {
  text: string;
  intensity: number;
  emotionalState: EmotionalState;
  timestamp: number;
}

export interface EmotionalMemory {
  id: string;
  emotionalState: EmotionalState;
  context: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface EmotionalPattern {
  key: string;
  strength: number;
  frequency: number;
  lastSeen: number;
}

export interface ResonanceResult {
  resonance: number;
  coherence: number;
  adaptation: number;
  response: EmotionalResponse;
} 