import { EmotionalState, EmotionalResponse, EmotionalMemory } from '../types/emotional';
import { EmotionalService } from './EmotionalService';
import { MemoryManager } from '../core/memory/MemoryManager';
import { VectorStore } from '../core/memory/VectorStore';

export interface ResonanceConfig {
  resonanceThreshold: number;
  adaptationRate: number;
  coherenceWindow: number;
  maxHistoryLength: number;
}

export interface ResonanceResult {
  resonance: number;
  coherence: number;
  adaptation: number;
  response: EmotionalResponse;
}

export class EmotionalResonanceService {
  private emotionalService: EmotionalService;
  private memoryManager: MemoryManager;
  private config: ResonanceConfig;
  private emotionalHistory: EmotionalState[] = [];
  private resonancePatterns: Map<string, number> = new Map();

  constructor(
    emotionalService: EmotionalService,
    memoryManager: MemoryManager,
    config: Partial<ResonanceConfig> = {}
  ) {
    this.emotionalService = emotionalService;
    this.memoryManager = memoryManager;
    this.config = {
      resonanceThreshold: 0.7,
      adaptationRate: 0.1,
      coherenceWindow: 5,
      maxHistoryLength: 100,
      ...config
    };
  }

  /**
   * Process emotional state and generate resonant response
   */
  async processEmotionalResonance(
    currentState: EmotionalState,
    context: string = ''
  ): Promise<ResonanceResult> {
    // Update emotional history
    this.updateEmotionalHistory(currentState);

    // Calculate resonance metrics
    const resonance = await this.calculateResonance(currentState);
    const coherence = this.calculateCoherence();
    const adaptation = this.calculateAdaptation(currentState);

    // Generate resonant response
    const response = await this.generateResonantResponse(
      currentState,
      context,
      resonance,
      coherence
    );

    // Update resonance patterns
    this.updateResonancePatterns(currentState, response);

    return {
      resonance,
      coherence,
      adaptation,
      response
    };
  }

  /**
   * Calculate emotional resonance between current state and historical patterns
   */
  private async calculateResonance(state: EmotionalState): Promise<number> {
    const relevantMemories = await this.memoryManager.retrieveSimilarMemories(
      state,
      this.config.coherenceWindow
    );

    if (relevantMemories.length === 0) {
      return 0.5; // Default resonance for new patterns
    }

    const resonanceScores = relevantMemories.map((memory: EmotionalMemory) => {
      const memoryState = memory.emotionalState;
      return this.calculateEmotionalSimilarity(state, memoryState);
    });

    return resonanceScores.reduce((sum: number, score: number) => sum + score, 0) / resonanceScores.length;
  }

  /**
   * Calculate emotional coherence across recent history
   */
  private calculateCoherence(): number {
    if (this.emotionalHistory.length < 2) {
      return 1.0; // Perfect coherence for single state
    }

    const recentHistory = this.emotionalHistory.slice(-this.config.coherenceWindow);
    const coherenceScores = [];

    for (let i = 1; i < recentHistory.length; i++) {
      const current = recentHistory[i];
      const previous = recentHistory[i - 1];
      coherenceScores.push(this.calculateEmotionalSimilarity(current, previous));
    }

    return coherenceScores.reduce((sum, score) => sum + score, 0) / coherenceScores.length;
  }

  /**
   * Calculate adaptation rate based on emotional state changes
   */
  private calculateAdaptation(state: EmotionalState): number {
    if (this.emotionalHistory.length === 0) {
      return 0;
    }

    const previousState = this.emotionalHistory[this.emotionalHistory.length - 1];
    const stateChange = this.calculateEmotionalDistance(state, previousState);
    
    return Math.min(
      this.config.adaptationRate * (1 + stateChange),
      1.0
    );
  }

  /**
   * Generate resonant response based on current state and context
   */
  private async generateResonantResponse(
    state: EmotionalState,
    context: string,
    resonance: number,
    coherence: number
  ): Promise<EmotionalResponse> {
    // Adjust response intensity based on resonance and coherence
    const intensity = Math.min(resonance * coherence, 1.0);
    
    // Generate base response
    const baseResponse = await this.emotionalService.generateResponse(
      state,
      context,
      intensity
    );

    // Adapt response based on resonance patterns
    const adaptedResponse = this.adaptResponseToPatterns(
      baseResponse,
      state,
      resonance
    );

    return adaptedResponse;
  }

  /**
   * Update emotional history with new state
   */
  private updateEmotionalHistory(state: EmotionalState): void {
    this.emotionalHistory.push(state);
    if (this.emotionalHistory.length > this.config.maxHistoryLength) {
      this.emotionalHistory.shift();
    }
  }

  /**
   * Update resonance patterns based on state and response
   */
  private updateResonancePatterns(
    state: EmotionalState,
    response: EmotionalResponse
  ): void {
    const patternKey = this.generatePatternKey(state, response);
    const currentValue = this.resonancePatterns.get(patternKey) || 0;
    
    this.resonancePatterns.set(
      patternKey,
      currentValue + this.config.adaptationRate
    );
  }

  /**
   * Calculate similarity between two emotional states
   */
  private calculateEmotionalSimilarity(
    state1: EmotionalState,
    state2: EmotionalState
  ): number {
    const distance = this.calculateEmotionalDistance(state1, state2);
    return Math.max(0, 1 - distance);
  }

  /**
   * Calculate distance between two emotional states
   */
  private calculateEmotionalDistance(
    state1: EmotionalState,
    state2: EmotionalState
  ): number {
    const valenceDiff = Math.abs(state1.valence - state2.valence);
    const arousalDiff = Math.abs(state1.arousal - state2.arousal);
    const dominanceDiff = Math.abs(state1.dominance - state2.dominance);
    
    return (valenceDiff + arousalDiff + dominanceDiff) / 3;
  }

  /**
   * Generate pattern key for resonance tracking
   */
  private generatePatternKey(
    state: EmotionalState,
    response: EmotionalResponse
  ): string {
    return `${state.valence.toFixed(2)}:${state.arousal.toFixed(2)}:${state.dominance.toFixed(2)}:${response.intensity.toFixed(2)}`;
  }

  /**
   * Adapt response based on learned resonance patterns
   */
  private adaptResponseToPatterns(
    response: EmotionalResponse,
    state: EmotionalState,
    resonance: number
  ): EmotionalResponse {
    const patternKey = this.generatePatternKey(state, response);
    const patternStrength = this.resonancePatterns.get(patternKey) || 0;

    if (patternStrength > this.config.resonanceThreshold) {
      const intensityMultiplier = 1 + (patternStrength * this.config.adaptationRate);
      return {
        ...response,
        intensity: Math.min(response.intensity * intensityMultiplier, 1.0)
      };
    }

    return response;
  }
} 