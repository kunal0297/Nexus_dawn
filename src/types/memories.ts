export interface MemoryEntry {
  id: string;
  walletAddress: string;
  encryptedContent: string;
  timestamp: number;
  tags: string[];
  mood: MemoryMood;
  dnaSequence: string; // Unique identifier for the memory
  metadata: {
    location?: string;
    weather?: string;
    people?: string[];
    intensity: number;
  };
}

export enum MemoryMood {
  JOYFUL = 'joyful',
  REFLECTIVE = 'reflective',
  NOSTALGIC = 'nostalgic',
  INSPIRED = 'inspired',
  PEACEFUL = 'peaceful',
  MYSTERIOUS = 'mysterious'
}

export interface MemoryFormData {
  content: string;
  mood: MemoryMood;
  tags: string[];
  metadata: {
    location?: string;
    weather?: string;
    people?: string[];
    intensity: number;
  };
}

export interface MemoryFilter {
  mood?: MemoryMood;
  tags?: string[];
  dateRange?: {
    start: number;
    end: number;
  };
  searchQuery?: string;
}

// DNA sequence generation patterns
export const DNA_PATTERNS = {
  JOYFUL: 'ATCG',
  REFLECTIVE: 'GCTA',
  NOSTALGIC: 'TAGC',
  INSPIRED: 'CGAT',
  PEACEFUL: 'AGCT',
  MYSTERIOUS: 'TCGA'
} as const; 