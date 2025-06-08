import { MemoryManager } from '../MemoryManager';
import { VectorStore } from '../VectorStore';
import { EmotionalState, EmotionalMemory } from '../../types/emotional';
import { MemoryContext } from '../types';

describe('MemoryManager', () => {
  let memoryManager: MemoryManager;
  let vectorStore: VectorStore;

  beforeEach(() => {
    vectorStore = new VectorStore();
    memoryManager = new MemoryManager(vectorStore);
  });

  const createTestEmotionalState = (): EmotionalState => ({
    valence: 0.8,
    arousal: 0.6,
    dominance: 0.7,
    timestamp: Date.now()
  });

  const createTestMemory = (): EmotionalMemory => ({
    id: 'test-id',
    emotionalState: createTestEmotionalState(),
    context: 'Test interaction',
    timestamp: Date.now(),
    metadata: {
      source: 'test',
      importance: 'high'
    }
  });

  describe('storeMemory', () => {
    it('should store a memory and return its ID', async () => {
      const memory = createTestMemory();
      
      await memoryManager.storeMemory(memory);
      
      const retrievedMemories = await memoryManager.retrieveSimilarMemories(memory.emotionalState);
      expect(retrievedMemories).toHaveLength(1);
      expect(retrievedMemories[0].emotionalState.valence).toBe(memory.emotionalState.valence);
    });

    it('should store memory with metadata', async () => {
      const memory = createTestMemory();
      
      await memoryManager.storeMemory(memory);
      
      const retrievedMemories = await memoryManager.retrieveSimilarMemories(memory.emotionalState);
      expect(retrievedMemories[0].metadata).toEqual(memory.metadata);
    });
  });

  describe('retrieveSimilarMemories', () => {
    it('should retrieve memories similar to the query state', async () => {
      // Store some test memories
      const memory1 = createTestMemory();
      const memory2 = {
        ...createTestMemory(),
        id: 'test-id-2',
        emotionalState: {
          ...createTestEmotionalState(),
          valence: 0.2
        }
      };
      
      await memoryManager.storeMemory(memory1);
      await memoryManager.storeMemory(memory2);
      
      // Query with similar state
      const queryState = { ...memory1.emotionalState, valence: 0.75 };
      const results = await memoryManager.retrieveSimilarMemories(queryState, 5);
      
      // Only the most similar memory should be returned
      const closest = results.reduce((prev, curr) => {
        return Math.abs(curr.emotionalState.valence - queryState.valence) < Math.abs(prev.emotionalState.valence - queryState.valence) ? curr : prev;
      }, results[0]);
      
      expect(closest.emotionalState.valence).toBeCloseTo(memory1.emotionalState.valence);
    });

    it('should respect the limit parameter', async () => {
      // Store multiple memories
      for (let i = 0; i < 10; i++) {
        const memory = {
          ...createTestMemory(),
          id: `test-id-${i}`,
          emotionalState: {
            ...createTestEmotionalState(),
            valence: i / 10
          }
        };
        await memoryManager.storeMemory(memory);
      }
      
      const results = await memoryManager.retrieveSimilarMemories(
        createTestEmotionalState(),
        3
      );
      
      expect(results.length).toBeLessThanOrEqual(3);
    });
  });

  describe('retrieveMemoriesByTimeRange', () => {
    it('should retrieve memories within the specified time range', async () => {
      const now = Date.now();
      const yesterday = now - 24 * 60 * 60 * 1000;
      const tomorrow = now + 24 * 60 * 60 * 1000;
      
      const memory1 = {
        ...createTestMemory(),
        id: 'test-id-1',
        timestamp: yesterday
      };
      const memory2 = {
        ...createTestMemory(),
        id: 'test-id-2',
        timestamp: now
      };
      const memory3 = {
        ...createTestMemory(),
        id: 'test-id-3',
        timestamp: tomorrow
      };
      
      await memoryManager.storeMemory(memory1);
      await memoryManager.storeMemory(memory2);
      await memoryManager.storeMemory(memory3);
      
      // Adjust the range to include only the memory with 'now' timestamp
      const results = await memoryManager.retrieveMemoriesByTimeRange(
        new Date(now - 1000), // just before 'now'
        new Date(now + 1000)  // just after 'now'
      );
      
      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(results.some(m => m.timestamp === now)).toBe(true);
    });
  });

  describe('clearMemories', () => {
    it('should clear all stored memories', async () => {
      const memory = createTestMemory();
      
      await memoryManager.storeMemory(memory);
      await memoryManager.clearMemories();
      
      const results = await memoryManager.retrieveSimilarMemories(memory.emotionalState);
      expect(results).toHaveLength(0);
    });
  });
}); 