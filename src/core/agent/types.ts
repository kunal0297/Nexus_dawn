import { EmotionalState, MemoryContext } from '../memory/types';

export interface AgentConfig {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  personality: PersonalityTraits;
  emotionalThresholds: EmotionalThresholds;
}

export interface PersonalityTraits {
  openness: number;      // 0-1: Willingness to try new things
  conscientiousness: number; // 0-1: Attention to detail and responsibility
  extraversion: number;  // 0-1: Social engagement level
  agreeableness: number; // 0-1: Cooperation and empathy
  neuroticism: number;   // 0-1: Emotional stability
}

export interface EmotionalThresholds {
  valence: {
    min: number;
    max: number;
  };
  arousal: {
    min: number;
    max: number;
  };
  dominance: {
    min: number;
    max: number;
  };
}

export interface AgentContext {
  currentEmotionalState: EmotionalState;
  memoryContext: MemoryContext;
  activeBehaviors: string[];
  lastInteraction: Date;
  interactionCount: number;
}

export interface AgentBehavior {
  id: string;
  name: string;
  description: string;
  priority: number;
  conditions: BehaviorCondition[];
  actions: BehaviorAction[];
}

export interface BehaviorCondition {
  type: 'emotional' | 'contextual' | 'temporal';
  check: (context: AgentContext) => boolean;
}

export interface BehaviorAction {
  type: 'response' | 'memory' | 'state_change';
  execute: (context: AgentContext) => Promise<void>;
}

export interface AgentResponse {
  content: string;
  emotionalState: EmotionalState;
  confidence: number;
  metadata: Record<string, any>;
}

export interface AgentMetrics {
  responseTime: number;
  emotionalAccuracy: number;
  behaviorSuccess: number;
  memoryUtilization: number;
} 