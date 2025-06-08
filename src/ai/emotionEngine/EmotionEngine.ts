import { 
  EmotionVector, 
  EmotionalState, 
  EmotionalResponse, 
  EmotionProcessingConfig,
  EmotionalEvent,
  PersonalityTrait 
} from './types';

export class EmotionEngine {
  private state: EmotionalState;
  private config: EmotionProcessingConfig;
  private eventHistory: EmotionalEvent[] = [];

  constructor(
    initialState: Partial<EmotionalState> = {},
    config: Partial<EmotionProcessingConfig> = {}
  ) {
    this.state = {
      currentEmotion: {
        valence: 0,
        arousal: 0.5,
        dominance: 0.5,
        complexity: 0.5
      },
      personalityProfile: {
        openness: 0.5,
        conscientiousness: 0.5,
        extraversion: 0.5,
        agreeableness: 0.5,
        neuroticism: 0.5
      },
      resonanceLevel: 0.5,
      emotionalMemory: [],
      emotionalContext: {
        environment: 'neutral',
        socialContext: 'individual',
        temporalContext: 'present'
      },
      ...initialState
    };

    this.config = {
      sensitivity: 0.7,
      memoryDepth: 10,
      adaptationRate: 0.3,
      resonanceThreshold: 0.6,
      ...config
    };
  }

  public processEmotionalEvent(event: EmotionalEvent): EmotionalResponse {
    // Add event to history
    this.eventHistory.push(event);
    if (this.eventHistory.length > this.config.memoryDepth) {
      this.eventHistory.shift();
    }

    // Update emotional state
    this.updateEmotionalState(event);

    // Calculate resonance
    const resonance = this.calculateResonance(event);

    // Generate response
    return this.generateResponse(resonance);
  }

  private updateEmotionalState(event: EmotionalEvent): void {
    const { emotionalImpact } = event;
    
    // Update current emotion with weighted average
    this.state.currentEmotion = {
      valence: this.adaptValue(this.state.currentEmotion.valence, emotionalImpact.valence),
      arousal: this.adaptValue(this.state.currentEmotion.arousal, emotionalImpact.arousal),
      dominance: this.adaptValue(this.state.currentEmotion.dominance, emotionalImpact.dominance),
      complexity: this.adaptValue(this.state.currentEmotion.complexity, emotionalImpact.complexity)
    };

    // Update emotional memory
    this.state.emotionalMemory.push({ ...this.state.currentEmotion });
    if (this.state.emotionalMemory.length > this.config.memoryDepth) {
      this.state.emotionalMemory.shift();
    }

    // Update resonance level
    this.state.resonanceLevel = this.calculateResonance(event);
  }

  private adaptValue(current: number, target: number): number {
    return current + (target - current) * this.config.adaptationRate;
  }

  private calculateResonance(event: EmotionalEvent): number {
    const personalityInfluence = this.calculatePersonalityInfluence(event);
    const emotionalIntensity = Math.sqrt(
      event.emotionalImpact.valence ** 2 +
      event.emotionalImpact.arousal ** 2 +
      event.emotionalImpact.dominance ** 2
    );

    return (personalityInfluence + emotionalIntensity) / 2;
  }

  private calculatePersonalityInfluence(event: EmotionalEvent): number {
    const { personalityProfile } = this.state;
    
    // Calculate how well the event aligns with personality traits
    const traitAlignment = (
      personalityProfile.openness +
      personalityProfile.extraversion +
      (1 - personalityProfile.neuroticism)
    ) / 3;

    return traitAlignment * this.config.sensitivity;
  }

  private generateResponse(resonance: number): EmotionalResponse {
    const { currentEmotion } = this.state;
    
    // Determine response type based on emotional state and resonance
    const responseType = this.determineResponseType(currentEmotion, resonance);
    
    // Calculate response intensity based on resonance and emotional state
    const intensity = Math.min(
      (resonance + currentEmotion.arousal) / 2,
      1
    );

    return {
      responseType,
      intensity,
      emotionalTone: { ...currentEmotion },
      resonanceAdjustment: resonance - this.state.resonanceLevel,
      contextAwareness: this.calculateContextAwareness()
    };
  }

  private determineResponseType(emotion: EmotionVector, resonance: number): EmotionalResponse['responseType'] {
    if (resonance > this.config.resonanceThreshold) {
      return 'interactive';
    }
    
    if (emotion.arousal > 0.7) {
      return 'visual';
    }
    
    if (emotion.complexity > 0.6) {
      return 'verbal';
    }
    
    return 'ambient';
  }

  private calculateContextAwareness(): number {
    const recentEvents = this.eventHistory.slice(-3);
    if (recentEvents.length === 0) return 0;

    // Calculate how well the system understands the current context
    const contextUnderstanding = recentEvents.reduce((sum, event) => {
      return sum + (event.context ? 1 : 0);
    }, 0) / recentEvents.length;

    return contextUnderstanding;
  }

  public getCurrentState(): EmotionalState {
    return { ...this.state };
  }

  public updateConfig(newConfig: Partial<EmotionProcessingConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
} 