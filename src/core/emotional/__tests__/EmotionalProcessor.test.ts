import { jest } from '@jest/globals';
import { EmotionalProcessor } from '../EmotionalProcessor';
import { MemoryManager } from '../../memory/MemoryManager';
import { VectorStore } from '../../memory/VectorStore';
import { EmotionalState, EmotionalMemory } from '../../../types/emotional';

describe('EmotionalProcessor', () => {
  let processor: EmotionalProcessor;
  let memoryManager: MemoryManager;

  beforeEach(() => {
    const vectorStore = new VectorStore();
    memoryManager = new MemoryManager(vectorStore);
    processor = new EmotionalProcessor(memoryManager);
  });

  describe('analyzeEmotionalState', () => {
    it('should identify joy as dominant emotion', async () => {
      const emotionalState: EmotionalState = {
        valence: 0.9,
        arousal: 0.8,
        dominance: 0.7,
        timestamp: Date.now()
      };

      const analysis = await processor.analyzeEmotionalState(emotionalState, 'User is happy');

      expect(analysis.dominantEmotion).toBe('joy');
      expect(analysis.intensity).toBeGreaterThan(0.7);
      expect(analysis.recommendations).toContain('Maintain positive engagement');
    });

    it('should identify anger as dominant emotion', async () => {
      const emotionalState: EmotionalState = {
        valence: 0.2,
        arousal: 0.9,
        dominance: 0.8,
        timestamp: Date.now()
      };

      const analysis = await processor.analyzeEmotionalState(emotionalState, 'User is angry');

      expect(analysis.dominantEmotion).toBe('anger');
      expect(analysis.intensity).toBeGreaterThan(0.7);
      expect(analysis.recommendations).toContain('Implement de-escalation techniques');
    });

    it('should identify emotional patterns in historical data', async () => {
      // Mock historical emotional states
      const mockHistoricalStates: EmotionalMemory[] = [
        {
          id: '1',
          emotionalState: {
            valence: 0.5,
            arousal: 0.5,
            dominance: 0.5,
            timestamp: Date.now()
          },
          context: 'Initial state',
          timestamp: Date.now(),
          metadata: {
            source: 'test',
            confidence: 0.9
          }
        },
        {
          id: '2',
          emotionalState: {
            valence: 0.8,
            arousal: 0.8,
            dominance: 0.7,
            timestamp: Date.now()
          },
          context: 'Positive interaction',
          timestamp: Date.now(),
          metadata: {
            source: 'test',
            confidence: 0.9
          }
        }
      ];

      jest.spyOn(memoryManager, 'retrieveSimilarMemories').mockResolvedValue(mockHistoricalStates);

      const currentState: EmotionalState = {
        valence: 0.9,
        arousal: 0.9,
        dominance: 0.8,
        timestamp: Date.now()
      };

      const analysis = await processor.analyzeEmotionalState(currentState, 'User is very happy');

      expect(analysis.patterns.length).toBeGreaterThan(0);
      expect(analysis.patterns[0].pattern).toContain('escalation');
      expect(analysis.patterns[0].confidence).toBeGreaterThan(0.6);
    });

    it('should handle memory retrieval errors gracefully', async () => {
      jest.spyOn(memoryManager, 'retrieveSimilarMemories').mockRejectedValue(new Error('Test error'));

      const emotionalState: EmotionalState = {
        valence: 0.5,
        arousal: 0.5,
        dominance: 0.5,
        timestamp: Date.now()
      };

      const analysis = await processor.analyzeEmotionalState(emotionalState, 'Test context');

      expect(analysis.dominantEmotion).toBe('neutral');
      expect(analysis.patterns).toHaveLength(0);
      expect(analysis.recommendations).toContain('Monitor emotional state');
    });

    it('should analyze contextual patterns', async () => {
      const emotionalState: EmotionalState = {
        valence: 0.7,
        arousal: 0.6,
        dominance: 0.5,
        timestamp: Date.now()
      };

      const analysis = await processor.analyzeEmotionalState(
        emotionalState,
        'User is happy and excited about the new feature'
      );

      expect(analysis.patterns.some(p => p.pattern === 'Contextual emotional response')).toBe(true);
      expect(analysis.patterns.some(p => p.triggers[0].includes('happy'))).toBe(true);
    });

    it('should generate appropriate recommendations based on intensity', async () => {
      const highIntensityState: EmotionalState = {
        valence: 0.9,
        arousal: 0.9,
        dominance: 0.9,
        timestamp: Date.now()
      };

      const highIntensityAnalysis = await processor.analyzeEmotionalState(
        highIntensityState,
        'User is extremely excited'
      );

      expect(highIntensityAnalysis.recommendations).toContain(
        'Consider emotional regulation techniques'
      );

      const lowIntensityState: EmotionalState = {
        valence: 0.3,
        arousal: 0.2,
        dominance: 0.1,
        timestamp: Date.now()
      };

      const lowIntensityAnalysis = await processor.analyzeEmotionalState(
        lowIntensityState,
        'User is very quiet'
      );

      expect(lowIntensityAnalysis.recommendations).toContain(
        'Encourage emotional expression'
      );
    });
  });
}); 