import { MemoryEntry, VectorStoreConfig, SearchOptions } from './types';

export class VectorStore {
  private memories: MemoryEntry[] = [];
  private config: VectorStoreConfig;
  private vectors: Map<string, number[]> = new Map();
  private entries: Map<string, MemoryEntry> = new Map();

  constructor(config?: Partial<VectorStoreConfig>) {
    this.config = {
      dimensions: 3, // Default to VAD dimensions
      similarityMetric: 'cosine',
      maxResults: 10,
      ...config
    };
  }

  /**
   * Store a memory entry
   */
  async store(memory: MemoryEntry): Promise<void> {
    this.memories.push(memory);
    this.entries.set(memory.id, memory);
  }

  /**
   * Search for similar memories using vector similarity
   */
  async search(
    queryVector: number[],
    options: SearchOptions = {}
  ): Promise<MemoryEntry[]> {
    const { limit = this.config.maxResults, threshold = 0.5 } = options;

    // Calculate similarities
    const similarities = this.memories.map(memory => ({
      memory,
      similarity: this.calculateSimilarity(queryVector, memory.vector)
    }));

    // Filter by threshold and sort by similarity
    return similarities
      .filter(({ similarity }) => similarity >= threshold)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .map(({ memory }) => memory);
  }

  /**
   * Search memories within a time range
   */
  async searchByTimeRange(
    startDate: Date,
    endDate: Date
  ): Promise<MemoryEntry[]> {
    return this.memories.filter(memory => {
      const timestamp = new Date(memory.timestamp);
      return timestamp >= startDate && timestamp <= endDate;
    });
  }

  /**
   * Clear all stored memories
   */
  async clear(): Promise<void> {
    this.memories = [];
    this.vectors.clear();
    this.entries.clear();
  }

  /**
   * Calculate similarity between two vectors
   */
  private calculateSimilarity(v1: number[], v2: number[]): number {
    switch (this.config.similarityMetric) {
      case 'cosine':
        return this.cosineSimilarity(v1, v2);
      case 'euclidean':
        return this.euclideanSimilarity(v1, v2);
      case 'dot':
        return this.dotProduct(v1, v2);
      default:
        throw new Error(`Unknown similarity metric: ${this.config.similarityMetric}`);
    }
  }

  /**
   * Calculate cosine similarity between two vectors
   */
  private cosineSimilarity(v1: number[], v2: number[]): number {
    const dotProduct = this.dotProduct(v1, v2);
    const magnitude1 = Math.sqrt(v1.reduce((sum, val) => sum + val * val, 0));
    const magnitude2 = Math.sqrt(v2.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitude1 * magnitude2);
  }

  /**
   * Calculate Euclidean similarity between two vectors
   */
  private euclideanSimilarity(v1: number[], v2: number[]): number {
    const sumSquaredDiff = v1.reduce((sum, val, i) => {
      const diff = val - v2[i];
      return sum + diff * diff;
    }, 0);
    return 1 / (1 + Math.sqrt(sumSquaredDiff));
  }

  /**
   * Calculate dot product between two vectors
   */
  private dotProduct(v1: number[], v2: number[]): number {
    return v1.reduce((sum, val, i) => sum + val * v2[i], 0);
  }

  async addVector(id: string, vector: number[]): Promise<void> {
    this.vectors.set(id, vector);
  }

  async findSimilarVectors(
    queryVector: number[],
    limit: number = 5
  ): Promise<string[]> {
    const similarities = Array.from(this.vectors.entries()).map(([id, vector]) => ({
      id,
      similarity: this.cosineSimilarity(queryVector, vector)
    }));

    return similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .map(item => item.id);
  }

  async retrieve(id: string): Promise<MemoryEntry | undefined> {
    return this.entries.get(id);
  }

  async delete(id: string): Promise<void> {
    this.vectors.delete(id);
    this.entries.delete(id);
  }
} 