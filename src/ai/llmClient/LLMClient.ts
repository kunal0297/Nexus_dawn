import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  LLMConfig,
  LLMRequest,
  LLMResponse,
  LLMCacheEntry,
  LLMError,
  LLMContext
} from './types';
import { EncryptionService } from '../../services/encryption';
import { SanitizationService } from '../../services/sanitization';
import { env } from '../../config/env.validation';

export class LLMClient {
  private genAI: GoogleGenerativeAI;
  private config: LLMConfig;
  private cache: Map<string, LLMCacheEntry>;
  private rateLimiter: {
    lastRequestTime: number;
    minRequestInterval: number;
  };

  constructor(apiKey: string, config: Partial<LLMConfig> = {}) {
    // Validate API key
    if (!apiKey) {
      throw new Error('API key is required');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.config = {
      model: 'gemini-pro',
      temperature: 0.7,
      maxTokens: 1000,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      retryAttempts: 3,
      retryDelay: 1000,
      cacheTTL: 5 * 60 * 1000, // 5 minutes
      ...config
    };
    this.cache = new Map();
    this.rateLimiter = {
      lastRequestTime: 0,
      minRequestInterval: 100 // Minimum time between requests in ms
    };
  }

  public async generateResponse(
    request: LLMRequest,
    context?: LLMContext
  ): Promise<LLMResponse> {
    // Sanitize request
    const sanitizedRequest = {
      ...request,
      prompt: SanitizationService.sanitizeString(request.prompt),
      systemMessage: request.systemMessage ? SanitizationService.sanitizeString(request.systemMessage) : undefined
    };

    // Sanitize context
    const sanitizedContext = context ? {
      ...context,
      previousMessages: context.previousMessages?.map(msg => ({
        ...msg,
        content: SanitizationService.sanitizeString(msg.content)
      }))
    } : undefined;

    const cacheKey = this.generateCacheKey(sanitizedRequest, sanitizedContext);
    const cachedResponse = this.getCachedResponse(cacheKey);

    if (cachedResponse) {
      return {
        ...cachedResponse,
        metadata: {
          ...cachedResponse.metadata,
          cached: true
        }
      };
    }

    return this.executeRequest(sanitizedRequest, sanitizedContext, cacheKey);
  }

  private async executeRequest(
    request: LLMRequest,
    context?: LLMContext,
    cacheKey?: string
  ): Promise<LLMResponse> {
    const model = this.genAI.getGenerativeModel({ model: this.config.model });
    let attempts = 0;

    while (attempts < this.config.retryAttempts) {
      try {
        await this.enforceRateLimit();

        const prompt = this.preparePrompt(request, context);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        // Encrypt sensitive response data
        const encryptedContent = EncryptionService.encrypt(text);

        const llmResponse: LLMResponse = {
          content: encryptedContent,
          usage: {
            promptTokens: this.estimateTokens(request.prompt),
            completionTokens: this.estimateTokens(text),
            totalTokens: this.estimateTokens(request.prompt) + this.estimateTokens(text)
          },
          metadata: {
            model: this.config.model,
            timestamp: Date.now(),
            cached: false
          }
        };

        if (cacheKey) {
          this.cacheResponse(cacheKey, llmResponse);
        }

        return llmResponse;
      } catch (error) {
        attempts++;
        const llmError = this.handleError(error);

        if (!llmError.retryable || attempts >= this.config.retryAttempts) {
          throw llmError;
        }

        await this.delay(this.config.retryDelay * attempts);
      }
    }

    throw {
      code: 'UNKNOWN',
      message: 'Max retry attempts reached',
      retryable: false
    } as LLMError;
  }

  private preparePrompt(request: LLMRequest, context?: LLMContext): string {
    let prompt = '';
    if (request.systemMessage) {
      prompt += `[System]\n${request.systemMessage}\n`;
    }
    if (context?.previousMessages) {
      for (const msg of context.previousMessages) {
        prompt += `[${msg.role.charAt(0).toUpperCase() + msg.role.slice(1)}]\n${msg.content}\n`;
      }
    }
    if (context?.emotionalState) {
      prompt += `[EmotionalContext]\n${this.generateEmotionalContext(context.emotionalState)}\n`;
    }
    prompt += `[User]\n${request.prompt}`;
    return prompt;
  }

  private generateEmotionalContext(emotionalState: LLMContext['emotionalState']): string {
    if (!emotionalState) return '';

    const { valence, arousal, dominance } = emotionalState;
    return `Current emotional context:
- Valence: ${valence > 0 ? 'Positive' : 'Negative'} (${Math.abs(valence).toFixed(2)})
- Arousal: ${arousal > 0.5 ? 'High' : 'Low'} (${arousal.toFixed(2)})
- Dominance: ${dominance > 0.5 ? 'High' : 'Low'} (${dominance.toFixed(2)})
Adjust your response accordingly to maintain emotional resonance.`;
  }

  private generateCacheKey(request: LLMRequest, context?: LLMContext): string {
    const keyParts = [
      request.prompt,
      request.systemMessage,
      context?.conversationId,
      context?.userId,
      JSON.stringify(context?.emotionalState)
    ].filter(Boolean);

    return keyParts.join('|');
  }

  private getCachedResponse(cacheKey: string): LLMResponse | null {
    const cached = this.cache.get(cacheKey);
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > this.config.cacheTTL) {
      this.cache.delete(cacheKey);
      return null;
    }

    return cached.response;
  }

  private cacheResponse(cacheKey: string, response: LLMResponse): void {
    this.cache.set(cacheKey, {
      response,
      timestamp: Date.now()
    });
  }

  private async enforceRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.rateLimiter.lastRequestTime;

    if (timeSinceLastRequest < this.rateLimiter.minRequestInterval) {
      await this.delay(this.rateLimiter.minRequestInterval - timeSinceLastRequest);
    }

    this.rateLimiter.lastRequestTime = Date.now();
  }

  private handleError(error: any): LLMError {
    if (error.response?.status === 429) {
      return {
        code: 'RATE_LIMIT',
        message: 'Rate limit exceeded',
        retryable: true,
        originalError: error
      };
    }

    if (error.response?.status >= 500) {
      return {
        code: 'SERVER_ERROR',
        message: 'Server error occurred',
        retryable: true,
        originalError: error
      };
    }

    if (error.code === 'ECONNABORTED') {
      return {
        code: 'TIMEOUT',
        message: 'Request timed out',
        retryable: true,
        originalError: error
      };
    }

    return {
      code: 'UNKNOWN',
      message: error.message || 'An unknown error occurred',
      retryable: false,
      originalError: error
    };
  }

  private estimateTokens(text: string): number {
    // Simple estimation: 1 token ≈ 4 characters
    return Math.ceil(text.length / 4);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public clearCache(): void {
    this.cache.clear();
  }

  public updateConfig(newConfig: Partial<LLMConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
} 