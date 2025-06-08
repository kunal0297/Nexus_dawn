import { jest } from '@jest/globals';
import { MoodAdaptivePrompting } from '../MoodAdaptivePrompting';
import { Agent } from '../../agent/Agent';
import { MemoryManager } from '../../memory/MemoryManager';
import { VectorStore } from '../../memory/VectorStore';
import { EmotionalState, MemoryContext } from '../../memory/types';
import { AgentConfig } from '../../agent/types';

describe('MoodAdaptivePrompting', () => {
  let prompting: MoodAdaptivePrompting;
  let agent: Agent;
  let memoryManager: MemoryManager;
  let config: AgentConfig;
  let mockVectorStore: any;

  beforeEach(() => {
    mockVectorStore = {
      findSimilarVectors: jest.fn().mockResolvedValue([]),
      addVector: jest.fn(),
      store: jest.fn(),
      searchByTimeRange: jest.fn().mockResolvedValue([]),
      clear: jest.fn(),
    };
    memoryManager = new MemoryManager(mockVectorStore);
    config = {
      id: 'test-agent',
      name: 'Test Agent',
      description: 'A test agent',
      capabilities: ['emotional_response'],
      personality: {
        openness: 0.8,
        conscientiousness: 0.7,
        extraversion: 0.6,
        agreeableness: 0.9,
        neuroticism: 0.3
      },
      emotionalThresholds: {
        valence: { min: 0, max: 1 },
        arousal: { min: 0, max: 1 },
        dominance: { min: 0, max: 1 }
      }
    };
    agent = new Agent(config, memoryManager);
    prompting = new MoodAdaptivePrompting(agent, memoryManager);
  });

  describe('generatePrompt', () => {
    it('should generate a prompt with emotional influence', async () => {
      const input = 'Hello, how are you?';
      const emotionalState: EmotionalState = {
        valence: 0.8,
        arousal: 0.6,
        dominance: 0.7,
        timestamp: Date.now()
      };
      const memoryContext: MemoryContext = {
        type: 'conversation',
        description: 'User greeting',
        tags: ['greeting', 'casual'],
        location: 'chat',
        participants: ['user', 'agent']
      };

      const prompt = await prompting.generatePrompt(input, emotionalState, memoryContext);

      expect(prompt).toContain('Given the emotional context of');
      expect(prompt).toContain('valence: 0.80');
      expect(prompt).toContain('arousal: 0.60');
      expect(prompt).toContain(input);
    });

    it('should handle empty memories', async () => {
      const input = 'Test input';
      const emotionalState: EmotionalState = {
        valence: 0.5,
        arousal: 0.5,
        dominance: 0.5,
        timestamp: Date.now()
      };
      const memoryContext: MemoryContext = {
        type: 'conversation',
        description: 'Test interaction',
        tags: ['test'],
        location: 'test',
        participants: ['user', 'agent']
      };

      const prompt = await prompting.generatePrompt(input, emotionalState, memoryContext);

      expect(prompt).toContain('No relevant memories');
      expect(prompt).toContain('In a balanced emotional state');
      expect(prompt).toContain(input);
    });

    it('should select appropriate template for high arousal', async () => {
      const input = 'Test input';
      const emotionalState: EmotionalState = {
        valence: 0.8,
        arousal: 0.8,
        dominance: 0.7,
        timestamp: Date.now()
      };
      const memoryContext: MemoryContext = {
        type: 'conversation',
        description: 'High arousal interaction',
        tags: ['excited'],
        location: 'test',
        participants: ['user', 'agent']
      };

      const prompt = await prompting.generatePrompt(input, emotionalState, memoryContext);

      expect(prompt).toContain('With high emotional intensity');
    });

    it('should select appropriate template for low arousal', async () => {
      const input = 'Test input';
      const emotionalState: EmotionalState = {
        valence: 0.6,
        arousal: 0.2,
        dominance: 0.5,
        timestamp: Date.now()
      };
      const memoryContext: MemoryContext = {
        type: 'conversation',
        description: 'Calm interaction',
        tags: ['calm'],
        location: 'test',
        participants: ['user', 'agent']
      };

      const prompt = await prompting.generatePrompt(input, emotionalState, memoryContext);

      expect(prompt).toContain('Considering the calm state');
    });

    it('should handle memory retrieval errors gracefully', async () => {
      // Mock memoryManager to throw an error
      jest.spyOn(memoryManager, 'retrieveSimilarMemories').mockRejectedValue(new Error('Test error'));

      const input = 'Test input';
      const emotionalState: EmotionalState = {
        valence: 0.5,
        arousal: 0.5,
        dominance: 0.5,
        timestamp: Date.now()
      };
      const memoryContext: MemoryContext = {
        type: 'conversation',
        description: 'Test interaction',
        tags: ['test'],
        location: 'test',
        participants: ['user', 'agent']
      };

      const prompt = await prompting.generatePrompt(input, emotionalState, memoryContext);

      expect(prompt).toContain('No relevant memories');
      expect(prompt).toContain('In a balanced emotional state');
      expect(prompt).toContain(input);
    });

    it('should filter memories based on similarity threshold', async () => {
      // Mock memoryManager to return memories with varying similarity
      const mockMemories = [
        {
          id: '1',
          timestamp: Date.now(),
          emotionalState: {
            valence: 0.8,
            arousal: 0.7,
            dominance: 0.6,
            timestamp: Date.now()
          },
          context: 'similar',
          metadata: {},
        },
        {
          id: '2',
          timestamp: Date.now(),
          emotionalState: {
            valence: 0.2,
            arousal: 0.3,
            dominance: 0.4,
            timestamp: Date.now()
          },
          context: 'dissimilar',
          metadata: {},
        }
      ];
      jest.spyOn(memoryManager, 'retrieveSimilarMemories').mockResolvedValue(mockMemories);

      const input = 'Test input';
      const emotionalState: EmotionalState = {
        valence: 0.8,
        arousal: 0.7,
        dominance: 0.6,
        timestamp: Date.now()
      };
      const memoryContext: MemoryContext = {
        type: 'conversation',
        description: 'Test interaction',
        tags: ['test'],
        location: 'test',
        participants: ['user', 'agent']
      };

      const prompt = await prompting.generatePrompt(input, emotionalState, memoryContext);

      expect(prompt).toContain('Based on 2 similar experiences');
    });
  });
}); 