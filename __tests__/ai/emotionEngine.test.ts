import { EmotionEngine } from '../../src/ai/emotionEngine';
import { EmotionState, EmotionIntensity, EmotionType } from '../../src/types/emotions';

jest.mock('../../src/services/llmClient');

describe('EmotionEngine', () => {
  let emotionEngine: EmotionEngine;

  beforeEach(() => {
    jest.clearAllMocks();
    emotionEngine = new EmotionEngine();
  });

  describe('analyzeEmotion', () => {
    it('should analyze text and return emotion state', async () => {
      const text = 'I am feeling very happy today!';
      const expectedEmotion: EmotionState = {
        type: EmotionType.JOY,
        intensity: EmotionIntensity.HIGH,
        confidence: 0.95,
        timestamp: expect.any(Date),
      };

      const result = await emotionEngine.analyzeEmotion(text);

      expect(result).toEqual(expectedEmotion);
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('should handle neutral text', async () => {
      const text = 'The weather is cloudy today.';
      const expectedEmotion: EmotionState = {
        type: EmotionType.NEUTRAL,
        intensity: EmotionIntensity.LOW,
        confidence: 0.85,
        timestamp: expect.any(Date),
      };

      const result = await emotionEngine.analyzeEmotion(text);

      expect(result).toEqual(expectedEmotion);
    });

    it('should handle empty text', async () => {
      const text = '';
      const expectedEmotion: EmotionState = {
        type: EmotionType.NEUTRAL,
        intensity: EmotionIntensity.LOW,
        confidence: 0.5,
        timestamp: expect.any(Date),
      };

      const result = await emotionEngine.analyzeEmotion(text);

      expect(result).toEqual(expectedEmotion);
    });

    it('should handle complex emotional expressions', async () => {
      const text = 'I am both excited and nervous about the upcoming event.';
      const expectedEmotion: EmotionState = {
        type: EmotionType.MIXED,
        intensity: EmotionIntensity.MEDIUM,
        confidence: 0.9,
        timestamp: expect.any(Date),
        subEmotions: [
          { type: EmotionType.JOY, intensity: EmotionIntensity.MEDIUM },
          { type: EmotionType.ANXIETY, intensity: EmotionIntensity.MEDIUM },
        ],
      };

      const result = await emotionEngine.analyzeEmotion(text);

      expect(result).toEqual(expectedEmotion);
      expect(result.subEmotions).toHaveLength(2);
    });
  });

  describe('getEmotionalResponse', () => {
    it('should generate appropriate emotional response', async () => {
      const emotionState: EmotionState = {
        type: EmotionType.JOY,
        intensity: EmotionIntensity.HIGH,
        confidence: 0.95,
        timestamp: new Date(),
      };

      const result = await emotionEngine.getEmotionalResponse(emotionState);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('response');
      expect(result).toHaveProperty('tone');
      expect(result.tone).toBe('positive');
    });

    it('should handle negative emotions appropriately', async () => {
      const emotionState: EmotionState = {
        type: EmotionType.SADNESS,
        intensity: EmotionIntensity.HIGH,
        confidence: 0.9,
        timestamp: new Date(),
      };

      const result = await emotionEngine.getEmotionalResponse(emotionState);

      expect(result).toBeDefined();
      expect(result.tone).toBe('empathetic');
    });

    it('should handle mixed emotions', async () => {
      const emotionState: EmotionState = {
        type: EmotionType.MIXED,
        intensity: EmotionIntensity.MEDIUM,
        confidence: 0.85,
        timestamp: new Date(),
        subEmotions: [
          { type: EmotionType.JOY, intensity: EmotionIntensity.MEDIUM },
          { type: EmotionType.ANXIETY, intensity: EmotionIntensity.MEDIUM },
        ],
      };

      const result = await emotionEngine.getEmotionalResponse(emotionState);

      expect(result).toBeDefined();
      expect(result.tone).toBe('balanced');
    });
  });

  describe('trackEmotionalProgression', () => {
    it('should track emotional changes over time', async () => {
      const emotionStates: EmotionState[] = [
        {
          type: EmotionType.SADNESS,
          intensity: EmotionIntensity.HIGH,
          confidence: 0.9,
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        },
        {
          type: EmotionType.NEUTRAL,
          intensity: EmotionIntensity.MEDIUM,
          confidence: 0.85,
          timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        },
        {
          type: EmotionType.JOY,
          intensity: EmotionIntensity.MEDIUM,
          confidence: 0.9,
          timestamp: new Date(),
        },
      ];

      const result = await emotionEngine.trackEmotionalProgression(emotionStates);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('progression');
      expect(result).toHaveProperty('trend');
      expect(result.trend).toBe('improving');
    });

    it('should handle stable emotional states', async () => {
      const emotionStates: EmotionState[] = [
        {
          type: EmotionType.JOY,
          intensity: EmotionIntensity.MEDIUM,
          confidence: 0.9,
          timestamp: new Date(Date.now() - 3600000),
        },
        {
          type: EmotionType.JOY,
          intensity: EmotionIntensity.MEDIUM,
          confidence: 0.9,
          timestamp: new Date(),
        },
      ];

      const result = await emotionEngine.trackEmotionalProgression(emotionStates);

      expect(result).toBeDefined();
      expect(result.trend).toBe('stable');
    });

    it('should handle empty emotion history', async () => {
      const emotionStates: EmotionState[] = [];

      const result = await emotionEngine.trackEmotionalProgression(emotionStates);

      expect(result).toBeDefined();
      expect(result.trend).toBe('neutral');
    });
  });

  describe('generateEmotionalInsights', () => {
    it('should generate insights from emotional data', async () => {
      const emotionStates: EmotionState[] = [
        {
          type: EmotionType.JOY,
          intensity: EmotionIntensity.HIGH,
          confidence: 0.95,
          timestamp: new Date(Date.now() - 86400000), // 24 hours ago
        },
        {
          type: EmotionType.SADNESS,
          intensity: EmotionIntensity.MEDIUM,
          confidence: 0.9,
          timestamp: new Date(Date.now() - 43200000), // 12 hours ago
        },
        {
          type: EmotionType.JOY,
          intensity: EmotionIntensity.MEDIUM,
          confidence: 0.9,
          timestamp: new Date(),
        },
      ];

      const result = await emotionEngine.generateEmotionalInsights(emotionStates);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('insights');
      expect(result).toHaveProperty('patterns');
      expect(result.insights).toHaveLength(3);
    });

    it('should handle single emotion state', async () => {
      const emotionStates: EmotionState[] = [
        {
          type: EmotionType.JOY,
          intensity: EmotionIntensity.HIGH,
          confidence: 0.95,
          timestamp: new Date(),
        },
      ];

      const result = await emotionEngine.generateEmotionalInsights(emotionStates);

      expect(result).toBeDefined();
      expect(result.insights).toHaveLength(1);
    });

    it('should handle empty emotion history', async () => {
      const emotionStates: EmotionState[] = [];

      const result = await emotionEngine.generateEmotionalInsights(emotionStates);

      expect(result).toBeDefined();
      expect(result.insights).toHaveLength(0);
    });
  });
}); 