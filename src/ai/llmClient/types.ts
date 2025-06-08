export type LLMConfig = {
  model: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  retryAttempts: number;
  retryDelay: number;
  cacheTTL: number;
};

export type LLMRequest = {
  prompt: string;
  systemMessage?: string;
  context?: Record<string, any>;
  config?: Partial<LLMConfig>;
};

export type LLMResponse = {
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  metadata: {
    model: string;
    timestamp: number;
    cached: boolean;
  };
};

export type LLMCacheEntry = {
  response: LLMResponse;
  timestamp: number;
};

export type LLMError = {
  code: 'RATE_LIMIT' | 'INVALID_REQUEST' | 'SERVER_ERROR' | 'TIMEOUT' | 'UNKNOWN';
  message: string;
  retryable: boolean;
  originalError?: any;
};

export type LLMContext = {
  conversationId?: string;
  userId?: string;
  emotionalState?: {
    valence: number;
    arousal: number;
    dominance: number;
  };
  previousMessages?: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
}; 