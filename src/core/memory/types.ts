import { EmotionalState } from '../../types/emotional';

export interface MemoryContext {
  text?: string;
  type: 'conversation' | 'action' | 'observation';
  description?: string;
  tags?: string[];
  location?: string;
  participants?: string[];
  metadata?: Record<string, any>;
}

export interface MemoryEntry {
  id: string;
  timestamp: number;
  emotionalState: EmotionalState;
  context: MemoryContext;
  metadata?: Record<string, any>;
  vector?: number[];
}

export interface VectorStoreConfig {
  similarityThreshold: number;
  maxResults: number;
  vectorDimension: number;
}

export interface SearchOptions {
  limit?: number;
  threshold?: number;
  filters?: Record<string, any>;
} 