import { VADEmotions, EmotionalResonance, EmotionalPreset, VADEmotionalState } from '../types/emotions';
import { EncryptionService } from './encryption';
import { SanitizationService } from './sanitization';
import { env } from '../config/env.validation';
import { EmotionalState, EmotionalResponse } from '../types/emotional';

export class EmotionalService {
  private static readonly RESONANCE_FREQUENCIES = [1, 2, 3, 5, 8, 13]; // Fibonacci-based frequencies

  public static calculateResonance(emotions: VADEmotions): EmotionalResonance {
    // Calculate base resonance from VAD values
    const intensity = (emotions.valence + emotions.arousal + emotions.dominance) / 3;
    // Ensure frequency is always > 0 (minimum 0.01)
    const frequency = Math.max(emotions.arousal * 10, 0.01); // Scale arousal to frequency range
    const phase = emotions.valence * Math.PI * 2; // Map valence to phase

    // Calculate harmonics based on dominance
    const harmonics = this.RESONANCE_FREQUENCIES.map(freq => 
      freq * (1 + emotions.dominance * 0.5)
    );

    return {
      intensity,
      frequency,
      phase,
      harmonics
    };
  }

  public static blendEmotions(emotions1: VADEmotions, emotions2: VADEmotions, ratio: number): VADEmotions {
    return {
      valence: emotions1.valence * (1 - ratio) + emotions2.valence * ratio,
      arousal: emotions1.arousal * (1 - ratio) + emotions2.arousal * ratio,
      dominance: emotions1.dominance * (1 - ratio) + emotions2.dominance * ratio
    };
  }

  public static createPreset(
    id: string,
    name: string,
    description: string,
    emotions: VADEmotions
  ): EmotionalPreset {
    // Validate emotions
    if (!this.validateEmotions(emotions)) {
      throw new Error('Invalid emotions: values must be between 0 and 1');
    }
    // Sanitize inputs
    const sanitizedId = SanitizationService.sanitizeString(id);
    const sanitizedName = SanitizationService.sanitizeString(name);
    const sanitizedDescription = SanitizationService.sanitizeString(description);

    // Calculate resonance
    const resonance = this.calculateResonance(emotions);

    return {
      id: sanitizedId,
      name: sanitizedName,
      description: sanitizedDescription,
      emotions,
      resonance
    };
  }

  public static encryptEmotionalState(state: VADEmotionalState): string {
    return EncryptionService.encrypt(JSON.stringify(state));
  }

  public static decryptEmotionalState(encryptedState: string): VADEmotionalState {
    const decrypted = EncryptionService.decrypt(encryptedState);
    return JSON.parse(decrypted);
  }

  public static validateEmotions(emotions: VADEmotions): boolean {
    return (
      emotions.valence >= 0 &&
      emotions.valence <= 1 &&
      emotions.arousal >= 0 &&
      emotions.arousal <= 1 &&
      emotions.dominance >= 0 &&
      emotions.dominance <= 1
    );
  }

  public static getEmotionColor(emotion: keyof VADEmotions, value: number, cosmicMode: boolean = false): string {
    const colors = {
      valence: cosmicMode ? ['#FF00FF', '#00FFFF'] : ['#FF6B6B', '#4ECDC4'],
      arousal: cosmicMode ? ['#FF0000', '#00FF00'] : ['#FFE66D', '#FF6B6B'],
      dominance: cosmicMode ? ['#0000FF', '#FF00FF'] : ['#4ECDC4', '#45B7D1']
    };

    const [start, end] = colors[emotion];
    const gradientValue = Math.max(0, Math.min(1, value));
    return `linear-gradient(90deg, ${start} ${gradientValue * 100}%, ${end} ${gradientValue * 100}%)`;
  }

  async generateResponse(
    state: EmotionalState,
    context: string,
    intensity: number = 1.0
  ): Promise<EmotionalResponse> {
    try {
      // Generate response based on emotional state and context
      const response = await this.generateEmotionalResponse(state, context);
      
      // Adjust response intensity
      const adjustedResponse = this.adjustResponseIntensity(response, intensity);
      
      return {
        ...adjustedResponse,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error generating response:', error);
      // Return a fallback response
      return {
        text: 'Unable to generate response at this time.',
        intensity: Math.min(Math.max(intensity, 0), 1),
        emotionalState: state,
        timestamp: Date.now()
      };
    }
  }

  private async generateEmotionalResponse(
    state: EmotionalState,
    context: string
  ): Promise<EmotionalResponse> {
    try {
      // TODO: Implement actual response generation using LLM
      // For now, return a mock response
      return {
        text: `I understand your ${this.getEmotionalDescription(state)} state.`,
        intensity: 1.0,
        emotionalState: state,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error generating emotional response:', error);
      throw error;
    }
  }

  private adjustResponseIntensity(
    response: EmotionalResponse,
    intensity: number
  ): EmotionalResponse {
    return {
      ...response,
      intensity: Math.min(Math.max(intensity, 0), 1)
    };
  }

  private getEmotionalDescription(state: EmotionalState): string {
    const valence = state.valence > 0 ? 'positive' : 'negative';
    const arousal = state.arousal > 0.5 ? 'high' : 'low';
    const dominance = state.dominance > 0.5 ? 'dominant' : 'submissive';
    
    return `${valence} ${arousal} ${dominance}`;
  }
} 