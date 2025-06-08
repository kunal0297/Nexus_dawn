import algosdk from 'algosdk';
import { blockchainService } from './BlockchainService';
import { MemoryEntry, MemoryFormData, MemoryMood, DNA_PATTERNS, MemoryFilter } from '../types/memories';
import { EncryptionService } from './encryption';
import { SanitizationService } from './sanitization';
import { env } from '../config/env.validation';

class MemoryService {
  private static instance: MemoryService;

  private constructor() {}

  public static getInstance(): MemoryService {
    if (!MemoryService.instance) {
      MemoryService.instance = new MemoryService();
    }
    return MemoryService.instance;
  }

  private generateDNASequence(mood: MemoryMood, timestamp: number): string {
    const basePattern = DNA_PATTERNS[mood.toUpperCase() as keyof typeof DNA_PATTERNS];
    const timestampStr = timestamp.toString(16);
    let sequence = '';
    for (let i = 0; i < 8; i++) {
      const patternIndex = parseInt(timestampStr[i % timestampStr.length], 16) % 4;
      sequence += basePattern[patternIndex];
    }
    return sequence;
  }

  public async storeMemory(data: MemoryFormData): Promise<MemoryEntry> {
    // Sanitize all user input
    const sanitizedContent = SanitizationService.sanitizeString(data.content);
    const sanitizedTags = Array.isArray(data.tags)
      ? data.tags.map(tag => SanitizationService.sanitizeString(tag))
      : [];
    const sanitizedMetadata = SanitizationService.sanitizeObject(data.metadata);

    const walletAddress = blockchainService.getState().account;
    if (!walletAddress) throw new Error('Wallet not connected');
    const timestamp = Date.now();
    const dnaSequence = this.generateDNASequence(data.mood, timestamp);

    const memory: MemoryEntry = {
      id: algosdk.generateAccount().addr,
      walletAddress,
      encryptedContent: EncryptionService.encrypt(sanitizedContent),
      timestamp,
      tags: sanitizedTags,
      mood: data.mood,
      dnaSequence,
      metadata: sanitizedMetadata
    };

    // Store memory on Algorand
    await blockchainService.saveInteraction(memory);
    return memory;
  }

  public async getMemories(filter?: MemoryFilter): Promise<MemoryEntry[]> {
    // TODO: Implement fetching memories from blockchain or storage
    // Placeholder: return empty array
    return [];
  }

  public async deleteMemory(memoryId: string): Promise<void> {
    const walletAddress = blockchainService.getState().account;
    if (!walletAddress) throw new Error('Wallet not connected');
    // TODO: Implement deletion logic if supported
    throw new Error('Delete memory not implemented');
  }
}

export const memoryService = MemoryService.getInstance(); 