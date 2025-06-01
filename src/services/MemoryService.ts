import { algosdk } from 'algosdk';
import CryptoJS from 'crypto-js';
import { blockchainService } from './BlockchainService';
import { MemoryEntry, MemoryFormData, MemoryMood, DNA_PATTERNS, MemoryFilter } from '../types/memories';

class MemoryService {
  private static instance: MemoryService;
  private readonly encryptionKey: string;

  private constructor() {
    this.encryptionKey = process.env.REACT_APP_MEMORY_ENCRYPTION_KEY || 'default-key';
  }

  public static getInstance(): MemoryService {
    if (!MemoryService.instance) {
      MemoryService.instance = new MemoryService();
    }
    return MemoryService.instance;
  }

  private generateDNASequence(mood: MemoryMood, timestamp: number): string {
    const basePattern = DNA_PATTERNS[mood];
    const timestampStr = timestamp.toString(16);
    let sequence = '';
    
    // Generate a unique DNA sequence based on mood pattern and timestamp
    for (let i = 0; i < 8; i++) {
      const patternIndex = parseInt(timestampStr[i % timestampStr.length], 16) % 4;
      sequence += basePattern[patternIndex];
    }
    
    return sequence;
  }

  private encryptContent(content: string): string {
    return CryptoJS.AES.encrypt(content, this.encryptionKey).toString();
  }

  private decryptContent(encryptedContent: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedContent, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  public async storeMemory(data: MemoryFormData): Promise<MemoryEntry> {
    const walletAddress = await blockchainService.getCurrentAddress();
    const timestamp = Date.now();
    const dnaSequence = this.generateDNASequence(data.mood, timestamp);

    const memory: MemoryEntry = {
      id: algosdk.generateAccount().addr,
      walletAddress,
      encryptedContent: this.encryptContent(data.content),
      timestamp,
      tags: data.tags,
      mood: data.mood,
      dnaSequence,
      metadata: data.metadata
    };

    // Store memory on Algorand
    const note = new TextEncoder().encode(JSON.stringify(memory));
    await blockchainService.sendTransaction({
      to: process.env.REACT_APP_MEMORY_STORAGE_ADDRESS || '',
      amount: 0,
      note
    });

    return memory;
  }

  public async getMemories(filter?: MemoryFilter): Promise<MemoryEntry[]> {
    const walletAddress = await blockchainService.getCurrentAddress();
    
    // Fetch memories from Algorand
    const transactions = await blockchainService.getTransactions(
      process.env.REACT_APP_MEMORY_STORAGE_ADDRESS || ''
    );

    let memories: MemoryEntry[] = transactions
      .filter(tx => tx.note)
      .map(tx => {
        const memory = JSON.parse(new TextDecoder().decode(tx.note)) as MemoryEntry;
        return {
          ...memory,
          encryptedContent: this.decryptContent(memory.encryptedContent)
        };
      })
      .filter(memory => memory.walletAddress === walletAddress);

    // Apply filters
    if (filter) {
      if (filter.mood) {
        memories = memories.filter(m => m.mood === filter.mood);
      }
      if (filter.tags?.length) {
        memories = memories.filter(m => 
          filter.tags!.some(tag => m.tags.includes(tag))
        );
      }
      if (filter.dateRange) {
        memories = memories.filter(m => 
          m.timestamp >= filter.dateRange!.start && 
          m.timestamp <= filter.dateRange!.end
        );
      }
      if (filter.searchQuery) {
        const query = filter.searchQuery.toLowerCase();
        memories = memories.filter(m => 
          m.encryptedContent.toLowerCase().includes(query) ||
          m.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
    }

    return memories.sort((a, b) => b.timestamp - a.timestamp);
  }

  public async deleteMemory(memoryId: string): Promise<void> {
    // In a real implementation, you might want to mark the memory as deleted
    // rather than actually removing it from the blockchain
    const walletAddress = await blockchainService.getCurrentAddress();
    const memories = await this.getMemories();
    const memory = memories.find(m => m.id === memoryId);

    if (!memory || memory.walletAddress !== walletAddress) {
      throw new Error('Memory not found or unauthorized');
    }

    // Store deletion record on Algorand
    const deletionRecord = {
      type: 'deletion',
      memoryId,
      timestamp: Date.now(),
      walletAddress
    };

    const note = new TextEncoder().encode(JSON.stringify(deletionRecord));
    await blockchainService.sendTransaction({
      to: process.env.REACT_APP_MEMORY_STORAGE_ADDRESS || '',
      amount: 0,
      note
    });
  }
}

export const memoryService = MemoryService.getInstance(); 