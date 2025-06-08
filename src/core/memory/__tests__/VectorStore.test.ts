import { VectorStore } from '../VectorStore';
import { MemoryEntry, VectorStoreConfig } from '../types';

describe('VectorStore', () => {
  let vectorStore: VectorStore;
  const defaultConfig: VectorStoreConfig = {
    dimensions: 3,
    similarityMetric: 'cosine',
    maxResults: 10
  };

  beforeEach(() => {
    vectorStore = new VectorStore(defaultConfig);
  });

  const createTestMemory = (vector: number[]): MemoryEntry => ({
    id: 'test-id',
    timestamp: new Date().toISOString(),
    emotionalState: {
      valence: vector[0],
      arousal: vector[1],
      dominance: vector[2]
    },
    context: {
      type: 'interaction',
      description: 'Test'
    },
    vector
  });

  describe('store', () => {
    it('should store a memory entry', async () => {
      const memory = createTestMemory([0.5, 0.5, 0.5]);
      await vectorStore.store(memory);
      
      const results = await vectorStore.search([0.5, 0.5, 0.5]);
      expect(results).toHaveLength(1);
      expect(results[0].id).toBe(memory.id);
    });
  });

  describe('search', () => {
    it('should find similar vectors using cosine similarity', async () => {
      const memory1 = createTestMemory([1, 0, 0]);
      const memory2 = createTestMemory([0, 1, 0]);
      const memory3 = createTestMemory([0, 0, 1]);
      
      await vectorStore.store(memory1);
      await vectorStore.store(memory2);
      await vectorStore.store(memory3);
      
      const results = await vectorStore.search([0.9, 0.1, 0.1]);
      expect(results[0].id).toBe(memory1.id);
    });

    it('should respect the similarity threshold', async () => {
      const memory1 = createTestMemory([1, 0, 0]);
      const memory2 = createTestMemory([0.5, 0.5, 0]);
      
      await vectorStore.store(memory1);
      await vectorStore.store(memory2);
      
      const results = await vectorStore.search([1, 0, 0], { threshold: 0.8 });
      expect(results).toHaveLength(1);
      expect(results[0].id).toBe(memory1.id);
    });

    it('should respect the limit parameter', async () => {
      // Store multiple memories
      for (let i = 0; i < 20; i++) {
        const vector = [i / 20, 0.5, 0.5];
        await vectorStore.store(createTestMemory(vector));
      }
      
      const results = await vectorStore.search([0.5, 0.5, 0.5], { limit: 5 });
      expect(results).toHaveLength(5);
    });
  });

  describe('searchByTimeRange', () => {
    it('should find memories within the time range', async () => {
      const now = new Date();
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      
      const memory1 = {
        ...createTestMemory([0.5, 0.5, 0.5]),
        timestamp: yesterday.toISOString()
      };
      const memory2 = {
        ...createTestMemory([0.5, 0.5, 0.5]),
        timestamp: now.toISOString()
      };
      const memory3 = {
        ...createTestMemory([0.5, 0.5, 0.5]),
        timestamp: tomorrow.toISOString()
      };
      
      await vectorStore.store(memory1);
      await vectorStore.store(memory2);
      await vectorStore.store(memory3);
      
      const results = await vectorStore.searchByTimeRange(yesterday, now);
      expect(results).toHaveLength(2);
    });
  });

  describe('clear', () => {
    it('should remove all stored memories', async () => {
      const memory = createTestMemory([0.5, 0.5, 0.5]);
      await vectorStore.store(memory);
      await vectorStore.clear();
      
      const results = await vectorStore.search([0.5, 0.5, 0.5]);
      expect(results).toHaveLength(0);
    });
  });

  describe('similarity metrics', () => {
    it('should support cosine similarity', async () => {
      const store = new VectorStore({ ...defaultConfig, similarityMetric: 'cosine' });
      const memory = createTestMemory([1, 0, 0]);
      await store.store(memory);
      
      const results = await store.search([0.9, 0.1, 0.1]);
      expect(results).toHaveLength(1);
    });

    it('should support euclidean similarity', async () => {
      const store = new VectorStore({ ...defaultConfig, similarityMetric: 'euclidean' });
      const memory = createTestMemory([1, 0, 0]);
      await store.store(memory);
      
      const results = await store.search([0.9, 0.1, 0.1]);
      expect(results).toHaveLength(1);
    });

    it('should support dot product similarity', async () => {
      const store = new VectorStore({ ...defaultConfig, similarityMetric: 'dot' });
      const memory = createTestMemory([1, 0, 0]);
      await store.store(memory);
      
      const results = await store.search([0.9, 0.1, 0.1]);
      expect(results).toHaveLength(1);
    });
  });
}); 