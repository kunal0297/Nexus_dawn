import { LLMClient } from '../../src/ai/llmClient';
import { EmotionState, EmotionIntensity, EmotionType } from '../../src/types/emotions';

jest.mock('../../src/config/env.validation', () => ({
  env: {
    REACT_APP_GEMINI_API_KEY: 'test-gemini-key',
    REACT_APP_OPENAI_API_KEY: 'test-openai-key',
  },
}));

describe('LLMClient', () => {
  let llmClient: LLMClient;

  beforeEach(() => {
    jest.clearAllMocks();
    llmClient = new LLMClient();
  });

  describe('analyzeText', () => {
    it('should analyze text using Gemini', async () => {
      const text = 'I am feeling very happy today!';
      const expectedResponse = {
        emotion: EmotionType.JOY,
        intensity: EmotionIntensity.HIGH,
        confidence: 0.95,
      };

      const result = await llmClient.analyzeText(text, 'gemini');

      expect(result).toEqual(expectedResponse);
    });

    it('should analyze text using OpenAI', async () => {
      const text = 'I am feeling very happy today!';
      const expectedResponse = {
        emotion: EmotionType.JOY,
        intensity: EmotionIntensity.HIGH,
        confidence: 0.95,
      };

      const result = await llmClient.analyzeText(text, 'openai');

      expect(result).toEqual(expectedResponse);
    });

    it('should handle empty text', async () => {
      const text = '';
      const expectedResponse = {
        emotion: EmotionType.NEUTRAL,
        intensity: EmotionIntensity.LOW,
        confidence: 0.5,
      };

      const result = await llmClient.analyzeText(text, 'gemini');

      expect(result).toEqual(expectedResponse);
    });

    it('should handle API errors', async () => {
      const text = 'I am feeling very happy today!';
      const error = new Error('API Error');

      jest.spyOn(llmClient, 'analyzeText').mockRejectedValueOnce(error);

      await expect(llmClient.analyzeText(text, 'gemini')).rejects.toThrow('API Error');
    });
  });

  describe('generateResponse', () => {
    it('should generate response using Gemini', async () => {
      const emotionState: EmotionState = {
        type: EmotionType.JOY,
        intensity: EmotionIntensity.HIGH,
        confidence: 0.95,
        timestamp: new Date(),
      };

      const expectedResponse = {
        text: 'I am glad to hear that you are feeling happy!',
        tone: 'positive',
      };

      const result = await llmClient.generateResponse(emotionState, 'gemini');

      expect(result).toEqual(expectedResponse);
    });

    it('should generate response using OpenAI', async () => {
      const emotionState: EmotionState = {
        type: EmotionType.SADNESS,
        intensity: EmotionIntensity.HIGH,
        confidence: 0.9,
        timestamp: new Date(),
      };

      const expectedResponse = {
        text: 'I understand that you are feeling sad. Would you like to talk about it?',
        tone: 'empathetic',
      };

      const result = await llmClient.generateResponse(emotionState, 'openai');

      expect(result).toEqual(expectedResponse);
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

      const expectedResponse = {
        text: 'I notice you are feeling both excited and anxious. That is a natural response to new situations.',
        tone: 'balanced',
      };

      const result = await llmClient.generateResponse(emotionState, 'gemini');

      expect(result).toEqual(expectedResponse);
    });

    it('should handle API errors', async () => {
      const emotionState: EmotionState = {
        type: EmotionType.JOY,
        intensity: EmotionIntensity.HIGH,
        confidence: 0.95,
        timestamp: new Date(),
      };

      const error = new Error('API Error');

      jest.spyOn(llmClient, 'generateResponse').mockRejectedValueOnce(error);

      await expect(llmClient.generateResponse(emotionState, 'gemini')).rejects.toThrow('API Error');
    });
  });

  describe('generateInsights', () => {
    it('should generate insights using Gemini', async () => {
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

      const expectedResponse = {
        insights: [
          'Your mood has shown significant improvement over the past 24 hours.',
          'There was a temporary dip in mood around midday.',
          'You tend to feel more positive in the morning.',
        ],
        patterns: [
          'Daily mood cycle',
          'Recovery from negative emotions',
        ],
      };

      const result = await llmClient.generateInsights(emotionStates, 'gemini');

      expect(result).toEqual(expectedResponse);
    });

    it('should generate insights using OpenAI', async () => {
      const emotionStates: EmotionState[] = [
        {
          type: EmotionType.JOY,
          intensity: EmotionIntensity.HIGH,
          confidence: 0.95,
          timestamp: new Date(),
        },
      ];

      const expectedResponse = {
        insights: [
          'You are currently experiencing high levels of joy.',
        ],
        patterns: [
          'Positive emotional state',
        ],
      };

      const result = await llmClient.generateInsights(emotionStates, 'openai');

      expect(result).toEqual(expectedResponse);
    });

    it('should handle empty emotion history', async () => {
      const emotionStates: EmotionState[] = [];

      const expectedResponse = {
        insights: [],
        patterns: [],
      };

      const result = await llmClient.generateInsights(emotionStates, 'gemini');

      expect(result).toEqual(expectedResponse);
    });

    it('should handle API errors', async () => {
      const emotionStates: EmotionState[] = [
        {
          type: EmotionType.JOY,
          intensity: EmotionIntensity.HIGH,
          confidence: 0.95,
          timestamp: new Date(),
        },
      ];

      const error = new Error('API Error');

      jest.spyOn(llmClient, 'generateInsights').mockRejectedValueOnce(error);

      await expect(llmClient.generateInsights(emotionStates, 'gemini')).rejects.toThrow('API Error');
    });
  });
}); 