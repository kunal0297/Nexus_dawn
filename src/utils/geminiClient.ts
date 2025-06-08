import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

export class GeminiClient {
  private static instance: GeminiClient;
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;
  private maxRetries: number = 3;
  private retryDelay: number = 1000; // 1 second

  private constructor() {
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key is not configured');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  public static getInstance(): GeminiClient {
    if (!GeminiClient.instance) {
      GeminiClient.instance = new GeminiClient();
    }
    return GeminiClient.instance;
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async retry<T>(
    operation: () => Promise<T>,
    retryCount: number = 0
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (retryCount < this.maxRetries) {
        await this.sleep(this.retryDelay * Math.pow(2, retryCount));
        return this.retry(operation, retryCount + 1);
      }
      throw error;
    }
  }

  async generateContent(prompt: string): Promise<string> {
    return this.retry(async () => {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    });
  }

  async generateStructuredContent<T>(prompt: string): Promise<T> {
    return this.retry(async () => {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      try {
        return JSON.parse(text) as T;
      } catch (error) {
        throw new Error(`Failed to parse Gemini response as JSON: ${text}`);
      }
    });
  }

  async generateEmbedding(text: string): Promise<number[]> {
    return this.retry(async () => {
      const result = await this.model.embedContent(text);
      const embedding = await result.embedding;
      return embedding.values;
    });
  }

  async analyzeSentiment(text: string): Promise<{
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
    emotions: string[];
  }> {
    const prompt = `Analyze the sentiment of this text and provide a structured response with sentiment (positive/negative/neutral), score (0-1), and emotions: ${text}`;
    return this.generateStructuredContent(prompt);
  }

  async extractKeyPhrases(text: string): Promise<string[]> {
    const prompt = `Extract key phrases from this text and return them as a JSON array: ${text}`;
    return this.generateStructuredContent(prompt);
  }

  async summarizeText(text: string, maxLength: number = 150): Promise<string> {
    const prompt = `Summarize this text in ${maxLength} characters or less: ${text}`;
    return this.generateContent(prompt);
  }

  async generatePersonalityInsights(activities: string[]): Promise<{
    dominantTraits: string[];
    emotionalPatterns: string[];
    growthAreas: string[];
    recommendations: string[];
  }> {
    const prompt = `Analyze these activities and provide personality insights in JSON format with dominant traits, emotional patterns, growth areas, and recommendations: ${JSON.stringify(activities)}`;
    return this.generateStructuredContent(prompt);
  }

  async generateEmotionalTimeline(activities: Array<{ content: string; timestamp: number }>): Promise<{
    timeline: Array<{
      timestamp: number;
      emotion: string;
      intensity: number;
      trigger: string;
    }>;
    patterns: string[];
  }> {
    const prompt = `Analyze this timeline of activities and generate an emotional timeline with patterns: ${JSON.stringify(activities)}`;
    return this.generateStructuredContent(prompt);
  }
} 