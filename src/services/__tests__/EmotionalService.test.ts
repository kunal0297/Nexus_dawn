import { EmotionalService } from '../EmotionalService';
import { VADEmotionalState, VADEmotions } from '../../types/emotions';

describe('EmotionalService', () => {
  let service: EmotionalService;

  beforeEach(() => {
    service = new EmotionalService();
  });

  describe('calculateResonance', () => {
    it('calculates resonance from VAD values', () => {
      const emotions: VADEmotionalState = {
        valence: 0.8,
        arousal: 0.6,
        dominance: 0.4,
        timestamp: new Date()
      };

      const resonance = EmotionalService.calculateResonance(emotions);

      expect(resonance).toHaveProperty('intensity');
      expect(resonance).toHaveProperty('frequency');
      expect(resonance).toHaveProperty('phase');
      expect(resonance).toHaveProperty('harmonics');
      expect(resonance.intensity).toBeGreaterThanOrEqual(0);
      expect(resonance.intensity).toBeLessThanOrEqual(1);
      expect(resonance.frequency).toBeGreaterThan(0);
      expect(resonance.phase).toBeGreaterThanOrEqual(0);
      expect(resonance.phase).toBeLessThanOrEqual(Math.PI * 2);
      expect(Array.isArray(resonance.harmonics)).toBe(true);
    });

    it('handles edge cases', () => {
      const edgeCases: VADEmotionalState[] = [
        { valence: 0, arousal: 0, dominance: 0, timestamp: new Date() },
        { valence: 1, arousal: 1, dominance: 1, timestamp: new Date() },
        { valence: 0.5, arousal: 0.5, dominance: 0.5, timestamp: new Date() }
      ];

      edgeCases.forEach(emotions => {
        const resonance = EmotionalService.calculateResonance(emotions);
        expect(resonance.intensity).toBeGreaterThanOrEqual(0);
        expect(resonance.intensity).toBeLessThanOrEqual(1);
        expect(resonance.frequency).toBeGreaterThan(0);
        expect(resonance.phase).toBeGreaterThanOrEqual(0);
        expect(resonance.phase).toBeLessThanOrEqual(Math.PI * 2);
        expect(Array.isArray(resonance.harmonics)).toBe(true);
      });
    });
  });

  describe('blendEmotions', () => {
    it('blends two emotional states', () => {
      const state1: VADEmotionalState = {
        valence: 0.8,
        arousal: 0.6,
        dominance: 0.4,
        timestamp: new Date()
      };

      const state2: VADEmotionalState = {
        valence: 0.2,
        arousal: 0.4,
        dominance: 0.6,
        timestamp: new Date()
      };

      const blended = EmotionalService.blendEmotions(state1, state2, 0.5);

      expect(blended.valence).toBeCloseTo(0.5, 1);
      expect(blended.arousal).toBeCloseTo(0.5, 1);
      expect(blended.dominance).toBeCloseTo(0.5, 1);
    });

    it('handles different blend ratios', () => {
      const state1: VADEmotionalState = {
        valence: 1,
        arousal: 1,
        dominance: 1,
        timestamp: new Date()
      };

      const state2: VADEmotionalState = {
        valence: 0,
        arousal: 0,
        dominance: 0,
        timestamp: new Date()
      };

      const blended = EmotionalService.blendEmotions(state1, state2, 0.25);
      expect(blended.valence).toBeCloseTo(0.75, 1);
      expect(blended.arousal).toBeCloseTo(0.75, 1);
      expect(blended.dominance).toBeCloseTo(0.75, 1);
    });
  });

  describe('createPreset', () => {
    it('creates a preset with valid emotions', () => {
      const emotions: VADEmotionalState = {
        valence: 0.8,
        arousal: 0.6,
        dominance: 0.4,
        timestamp: new Date()
      };

      const preset = EmotionalService.createPreset(
        'test-preset',
        'Test Preset',
        'A test preset',
        emotions
      );

      expect(preset.id).toBe('test-preset');
      expect(preset.name).toBe('Test Preset');
      expect(preset.description).toBe('A test preset');
      expect(preset.emotions).toEqual(emotions);
      expect(preset.resonance).toBeDefined();
    });

    it('validates emotions before creating preset', () => {
      const invalidEmotions = {
        valence: 1.5,
        arousal: -0.2,
        dominance: 2.0,
        timestamp: new Date()
      };

      expect(() => {
        EmotionalService.createPreset(
          'invalid-preset',
          'Invalid Preset',
          'An invalid preset',
          invalidEmotions as VADEmotionalState
        );
      }).toThrow();
    });
  });

  describe('validateEmotions', () => {
    it('validates valid emotions', () => {
      const validEmotions: VADEmotionalState = {
        valence: 0.8,
        arousal: 0.6,
        dominance: 0.4,
        timestamp: new Date()
      };

      expect(EmotionalService.validateEmotions(validEmotions)).toBe(true);
    });

    it('rejects invalid emotions', () => {
      const invalidEmotions = [
        { valence: 1.5, arousal: 0.5, dominance: 0.5, timestamp: new Date() },
        { valence: 0.5, arousal: -0.2, dominance: 0.5, timestamp: new Date() },
        { valence: 0.5, arousal: 0.5, dominance: 2.0, timestamp: new Date() }
      ];

      invalidEmotions.forEach(emotions => {
        expect(EmotionalService.validateEmotions(emotions as VADEmotionalState)).toBe(false);
      });
    });
  });

  describe('getEmotionColor', () => {
    it('returns correct gradient for normal mode', () => {
      const gradient = EmotionalService.getEmotionColor('valence', 0.5, false);
      expect(gradient).toContain('linear-gradient');
      expect(gradient).toContain('#FF6B6B');
      expect(gradient).toContain('#4ECDC4');
    });

    it('returns correct gradient for cosmic mode', () => {
      const gradient = EmotionalService.getEmotionColor('valence', 0.5, true);
      expect(gradient).toContain('linear-gradient');
      expect(gradient).toContain('#FF00FF');
      expect(gradient).toContain('#00FFFF');
    });

    it('handles different emotion types', () => {
      const valenceGradient = EmotionalService.getEmotionColor('valence', 0.5, false);
      const arousalGradient = EmotionalService.getEmotionColor('arousal', 0.5, false);
      const dominanceGradient = EmotionalService.getEmotionColor('dominance', 0.5, false);

      expect(valenceGradient).toContain('#FF6B6B');
      expect(arousalGradient).toContain('#FFE66D');
      expect(dominanceGradient).toContain('#4ECDC4');
    });

    it('handles different intensity values', () => {
      const intensities = [0, 0.25, 0.5, 0.75, 1];
      
      intensities.forEach(intensity => {
        const gradient = EmotionalService.getEmotionColor('valence', intensity, false);
        expect(gradient).toContain('linear-gradient');
        expect(gradient).toContain(`${intensity * 100}%`);
      });
    });
  });
}); 