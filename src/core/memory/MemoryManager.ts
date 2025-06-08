import { v4 as uuidv4 } from 'uuid';
import { VectorStore } from './VectorStore';
import { EmotionalState, EmotionalMemory } from '../../types/emotional';
import { MemoryEntry } from './types';

export class MemoryManager {
  private vectorStore: VectorStore;
  private memories: Map<string, EmotionalMemory> = new Map();

  constructor(vectorStore: VectorStore) {
    this.vectorStore = vectorStore;
  }

  /**
   * Store a new memory with emotional state and context
   */
  async storeMemory(memory: EmotionalMemory): Promise<void> {
    this.memories.set(memory.id, memory);
    const vector = this.emotionalStateToVector(memory.emotionalState);
    await this.vectorStore.addVector(memory.id, vector);
    await this.vectorStore.store({
      id: memory.id,
      timestamp: memory.timestamp,
      emotionalState: memory.emotionalState,
      context: {
        text: memory.context,
        type: 'conversation',
        metadata: memory.metadata
      },
      vector
    });
  }

  /**
   * Retrieve memories similar to the given emotional state
   */
  async retrieveSimilarMemories(
    emotionalState: EmotionalState,
    limit: number = 10
  ): Promise<EmotionalMemory[]> {
    const queryVector = this.emotionalStateToVector(emotionalState);
    const similarIds = await this.vectorStore.findSimilarVectors(queryVector, limit);
    
    return similarIds
      .map(id => this.memories.get(id))
      .filter((memory): memory is EmotionalMemory => memory !== undefined);
  }

  /**
   * Retrieve memories within a time range
   */
  async retrieveMemoriesByTimeRange(
    startDate: Date,
    endDate: Date
  ): Promise<EmotionalMemory[]> {
    const entries = await this.vectorStore.searchByTimeRange(startDate, endDate);
    return entries
      .map(entry => this.memories.get(entry.id))
      .filter((memory): memory is EmotionalMemory => memory !== undefined);
  }

  /**
   * Clear all stored memories
   */
  async clearMemories(): Promise<void> {
    await this.vectorStore.clear();
    this.memories.clear();
  }

  /**
   * Convert emotional state to vector representation
   */
  private emotionalStateToVector(state: EmotionalState): number[] {
    return [
      (state.valence + 1) / 2,  // Normalize to 0-1
      state.arousal,
      state.dominance
    ];
  }
} 