export type EmotionVector = {
  valence: number;      // Positive vs negative (-1 to 1)
  arousal: number;      // Intensity (0 to 1)
  dominance: number;    // Control level (0 to 1)
  complexity: number;   // Emotional complexity (0 to 1)
};

export type PersonalityTrait = {
  openness: number;     // Openness to experience (0 to 1)
  conscientiousness: number; // Organization and responsibility (0 to 1)
  extraversion: number; // Social energy (0 to 1)
  agreeableness: number; // Compassion and cooperation (0 to 1)
  neuroticism: number;  // Emotional stability (0 to 1)
};

export type EmotionalState = {
  currentEmotion: EmotionVector;
  personalityProfile: PersonalityTrait;
  resonanceLevel: number;  // Emotional resonance with the system (0 to 1)
  emotionalMemory: EmotionVector[];  // Recent emotional states
  emotionalContext: {
    environment: string;
    socialContext: string;
    temporalContext: string;
  };
};

export type EmotionalResponse = {
  responseType: 'verbal' | 'visual' | 'interactive' | 'ambient';
  intensity: number;
  emotionalTone: EmotionVector;
  resonanceAdjustment: number;
  contextAwareness: number;
};

export type EmotionProcessingConfig = {
  sensitivity: number;
  memoryDepth: number;
  adaptationRate: number;
  resonanceThreshold: number;
};

export type EmotionalEvent = {
  timestamp: number;
  trigger: string;
  emotionalImpact: EmotionVector;
  context: Record<string, any>;
  resonance: number;
}; 