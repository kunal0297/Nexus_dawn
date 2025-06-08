import { v4 as uuidv4 } from 'uuid';
import { MemoryManager } from '../memory/MemoryManager';
import { MemoryContext } from '../memory/types';
import { EmotionalState } from '../../types/emotional';
import {
  AgentConfig,
  AgentContext,
  AgentBehavior,
  AgentResponse,
  AgentMetrics,
  BehaviorCondition,
  BehaviorAction
} from './types';

export class Agent {
  private config: AgentConfig;
  private memoryManager: MemoryManager;
  private behaviors: Map<string, AgentBehavior>;
  private context: AgentContext;
  private metrics: AgentMetrics;

  constructor(config: AgentConfig, memoryManager: MemoryManager) {
    this.config = config;
    this.memoryManager = memoryManager;
    this.behaviors = new Map();
    this.context = this.initializeContext();
    this.metrics = this.initializeMetrics();
  }

  private initializeContext(): AgentContext {
    return {
      currentEmotionalState: {
        valence: 0.5,
        arousal: 0.5,
        dominance: 0.5,
        timestamp: Date.now()
      },
      memoryContext: {
        type: 'conversation',
        description: 'Agent initialization',
        tags: ['system', 'startup'],
        location: 'system',
        participants: ['agent']
      },
      activeBehaviors: [],
      lastInteraction: new Date(),
      interactionCount: 0
    };
  }

  private initializeMetrics(): AgentMetrics {
    return {
      responseTime: 0,
      emotionalAccuracy: 0,
      behaviorSuccess: 0,
      memoryUtilization: 0
    };
  }

  public async registerBehavior(behavior: AgentBehavior): Promise<void> {
    this.behaviors.set(behavior.id, behavior);
  }

  public async processInput(
    input: string,
    emotionalState: EmotionalState,
    context: MemoryContext
  ): Promise<AgentResponse> {
    const startTime = Date.now();
    
    // Update context
    this.context.currentEmotionalState = { ...emotionalState };
    this.context.memoryContext = context;
    this.context.lastInteraction = new Date();
    this.context.interactionCount++;

    // Store interaction in memory
    await this.memoryManager.storeMemory({
      id: uuidv4(),
      emotionalState,
      context: context.description || '',
      timestamp: Date.now(),
      metadata: {
        input,
        agentId: this.config.id
      }
    });

    // Find applicable behaviors
    const applicableBehaviors = await this.findApplicableBehaviors();
    
    // Execute behaviors in priority order
    const response = await this.executeBehaviors(applicableBehaviors, input);

    // Update metrics
    this.updateMetrics(startTime, response);

    return response;
  }

  private async findApplicableBehaviors(): Promise<AgentBehavior[]> {
    const applicable: AgentBehavior[] = [];
    
    for (const behavior of this.behaviors.values()) {
      const isApplicable = behavior.conditions.every(condition => 
        condition.check(this.context)
      );
      
      if (isApplicable) {
        applicable.push(behavior);
      }
    }

    return applicable.sort((a, b) => a.priority - b.priority);
  }

  private async executeBehaviors(
    behaviors: AgentBehavior[],
    input: string
  ): Promise<AgentResponse> {
    let response: AgentResponse = {
      content: '',
      emotionalState: this.context.currentEmotionalState,
      confidence: 0,
      metadata: {}
    };

    // Track active behaviors
    this.context.activeBehaviors = behaviors.map(b => b.id);

    for (const behavior of behaviors) {
      for (const action of behavior.actions) {
        await action.execute(this.context);
      }
    }

    // Generate response based on current state and behaviors
    response = await this.generateResponse(input);
    
    return response;
  }

  private async generateResponse(input: string): Promise<AgentResponse> {
    // Retrieve relevant memories
    const similarMemories = await this.memoryManager.retrieveSimilarMemories(
      this.context.currentEmotionalState,
      5
    ) || [];

    // Calculate emotional influence from memories
    const emotionalInfluence = this.calculateEmotionalInfluence(similarMemories);

    // Generate response content based on personality and emotional state
    const content = await this.generateContent(input, emotionalInfluence);

    return {
      content,
      emotionalState: this.context.currentEmotionalState,
      confidence: this.calculateConfidence(emotionalInfluence),
      metadata: {
        behaviorCount: this.context.activeBehaviors.length,
        memoryCount: similarMemories.length
      }
    };
  }

  private calculateEmotionalInfluence(memories: any[]): number {
    if (!memories || memories.length === 0) return 0;

    const totalInfluence = memories.reduce((sum, memory) => {
      const similarity = this.calculateSimilarity(
        memory.emotionalState,
        this.context.currentEmotionalState
      );
      return sum + similarity;
    }, 0);

    return totalInfluence / memories.length;
  }

  private calculateSimilarity(state1: EmotionalState, state2: EmotionalState): number {
    const valenceDiff = Math.abs(state1.valence - state2.valence);
    const arousalDiff = Math.abs(state1.arousal - state2.arousal);
    const dominanceDiff = Math.abs(state1.dominance - state2.dominance);

    return 1 - (valenceDiff + arousalDiff + dominanceDiff) / 3;
  }

  private calculateConfidence(emotionalInfluence: number): number {
    return Math.min(1, Math.max(0, 
      (emotionalInfluence + this.metrics.behaviorSuccess) / 2
    ));
  }

  private async generateContent(
    input: string,
    emotionalInfluence: number
  ): Promise<string> {
    // This is a placeholder for the actual content generation
    // In a real implementation, this would use an LLM or other generation method
    return `Processed: ${input} (Emotional Influence: ${emotionalInfluence.toFixed(2)})`;
  }

  private updateMetrics(startTime: number, response: AgentResponse): void {
    const endTime = Date.now();
    
    this.metrics.responseTime = endTime - startTime;
    this.metrics.emotionalAccuracy = this.calculateEmotionalAccuracy(response);
    this.metrics.behaviorSuccess = this.calculateBehaviorSuccess();
    this.metrics.memoryUtilization = this.calculateMemoryUtilization();
  }

  private calculateEmotionalAccuracy(response: AgentResponse): number {
    const targetState = this.context.currentEmotionalState;
    const actualState = response.emotionalState;
    
    return this.calculateSimilarity(targetState, actualState);
  }

  private calculateBehaviorSuccess(): number {
    return this.behaviors.size === 0 ? 0 : this.context.activeBehaviors.length / this.behaviors.size;
  }

  private calculateMemoryUtilization(): number {
    return Math.min(1, this.context.interactionCount / 100);
  }

  public getMetrics(): AgentMetrics {
    return { ...this.metrics };
  }

  public getContext(): AgentContext {
    return { ...this.context };
  }
} 