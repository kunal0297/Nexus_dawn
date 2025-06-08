import { Agent } from '../Agent';
import { MemoryManager } from '../../memory/MemoryManager';
import { VectorStore } from '../../memory/VectorStore';
import { EmotionalState } from '../../../types/emotional';
import { MemoryContext } from '../../memory/types';
import { AgentBehavior, BehaviorCondition, BehaviorAction, AgentConfig } from '../types';

jest.mock('../../memory/MemoryManager');

describe('Agent', () => {
  let agent: Agent;
  let mockMemoryManager: jest.Mocked<MemoryManager>;
  const mockConfig: AgentConfig = {
    id: 'test-agent',
    name: 'Test Agent',
    description: 'A test agent',
    capabilities: ['chat', 'learn'],
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

  beforeEach(() => {
    const vectorStore = new VectorStore();
    mockMemoryManager = new MemoryManager(vectorStore) as jest.Mocked<MemoryManager>;
    agent = new Agent(mockConfig, mockMemoryManager);
  });

  describe('Behavior Registration', () => {
    it('should register a behavior successfully', async () => {
      const mockBehavior: AgentBehavior = {
        id: 'test-behavior',
        name: 'Test Behavior',
        description: 'A test behavior',
        priority: 1,
        conditions: [],
        actions: []
      };

      await agent.registerBehavior(mockBehavior);
      const response = await agent.processInput(
        'test input',
        {
          valence: 0.5,
          arousal: 0.5,
          dominance: 0.5,
          timestamp: Date.now()
        },
        {
          type: 'conversation',
          description: 'Test conversation',
          tags: ['test'],
          location: 'test',
          participants: ['user']
        }
      );

      expect(response).toBeDefined();
      expect(response.content).toBeDefined();
      expect(response.emotionalState).toBeDefined();
    });
  });

  describe('Input Processing', () => {
    it('should process input and generate response', async () => {
      const input = 'Hello, agent!';
      const emotionalState: EmotionalState = {
        valence: 0.8,
        arousal: 0.6,
        dominance: 0.7,
        timestamp: Date.now()
      };
      const context: MemoryContext = {
        type: 'conversation',
        description: 'Greeting',
        tags: ['greeting'],
        location: 'chat',
        participants: ['user', 'agent']
      };

      const response = await agent.processInput(input, emotionalState, context);

      expect(response).toBeDefined();
      expect(response.content).toContain(input);
      expect(response.emotionalState).toEqual(emotionalState);
      expect(response.confidence).toBeGreaterThanOrEqual(0);
      expect(response.confidence).toBeLessThanOrEqual(1);
    });

    it('should update metrics after processing input', async () => {
      const input = 'Test input';
      const emotionalState: EmotionalState = {
        valence: 0.5,
        arousal: 0.5,
        dominance: 0.5,
        timestamp: Date.now()
      };
      const context: MemoryContext = {
        type: 'conversation',
        description: 'Test',
        tags: ['test'],
        location: 'test',
        participants: ['user']
      };

      await agent.processInput(input, emotionalState, context);
      const metrics = agent.getMetrics();

      expect(metrics.responseTime).toBeGreaterThanOrEqual(0);
      expect(metrics.emotionalAccuracy).toBeGreaterThanOrEqual(0);
      expect(metrics.emotionalAccuracy).toBeLessThanOrEqual(1);
      expect(metrics.behaviorSuccess).toBeGreaterThanOrEqual(0);
      expect(metrics.behaviorSuccess).toBeLessThanOrEqual(1);
      expect(metrics.memoryUtilization).toBeGreaterThanOrEqual(0);
      expect(metrics.memoryUtilization).toBeLessThanOrEqual(1);
    });
  });

  describe('Behavior Execution', () => {
    it('should execute behaviors in priority order', async () => {
      const executionOrder: string[] = [];
      
      const behavior1: AgentBehavior = {
        id: 'behavior1',
        name: 'Behavior 1',
        description: 'First behavior',
        priority: 2,
        conditions: [],
        actions: [{
          type: 'response',
          execute: async () => {
            executionOrder.push('behavior1');
          }
        }]
      };

      const behavior2: AgentBehavior = {
        id: 'behavior2',
        name: 'Behavior 2',
        description: 'Second behavior',
        priority: 1,
        conditions: [],
        actions: [{
          type: 'response',
          execute: async () => {
            executionOrder.push('behavior2');
          }
        }]
      };

      await agent.registerBehavior(behavior1);
      await agent.registerBehavior(behavior2);

      await agent.processInput(
        'test',
        {
          valence: 0.5,
          arousal: 0.5,
          dominance: 0.5,
          timestamp: Date.now()
        },
        {
          type: 'conversation',
          description: 'Test',
          tags: ['test'],
          location: 'test',
          participants: ['user']
        }
      );

      expect(executionOrder).toEqual(['behavior2', 'behavior1']);
    });

    it('should only execute behaviors with satisfied conditions', async () => {
      const executedBehaviors: string[] = [];

      const condition: BehaviorCondition = {
        type: 'emotional',
        check: (context) => context.currentEmotionalState.valence > 0.7
      };

      const behavior: AgentBehavior = {
        id: 'test-behavior',
        name: 'Test Behavior',
        description: 'A test behavior',
        priority: 1,
        conditions: [condition],
        actions: [{
          type: 'response',
          execute: async () => {
            executedBehaviors.push('test-behavior');
          }
        }]
      };

      await agent.registerBehavior(behavior);

      // Test with low valence
      await agent.processInput(
        'test',
        {
          valence: 0.3,
          arousal: 0.5,
          dominance: 0.5,
          timestamp: Date.now()
        },
        {
          type: 'conversation',
          description: 'Test',
          tags: ['test'],
          location: 'test',
          participants: ['user']
        }
      );

      expect(executedBehaviors).toHaveLength(0);

      // Test with high valence
      await agent.processInput(
        'test',
        {
          valence: 0.8,
          arousal: 0.5,
          dominance: 0.5,
          timestamp: Date.now()
        },
        {
          type: 'conversation',
          description: 'Test',
          tags: ['test'],
          location: 'test',
          participants: ['user']
        }
      );

      expect(executedBehaviors).toHaveLength(1);
    });
  });

  describe('Context Management', () => {
    it('should update context after processing input', async () => {
      const initialContext = agent.getContext();
      expect(initialContext.interactionCount).toBe(0);

      await agent.processInput(
        'test',
        {
          valence: 0.5,
          arousal: 0.5,
          dominance: 0.5,
          timestamp: Date.now()
        },
        {
          type: 'conversation',
          description: 'Test',
          tags: ['test'],
          location: 'test',
          participants: ['user']
        }
      );

      const updatedContext = agent.getContext();
      expect(updatedContext.interactionCount).toBe(1);
      expect(updatedContext.lastInteraction).toBeInstanceOf(Date);
    });
  });
}); 