import { GeminiClient } from '../utils/geminiClient';
import { UserActivity } from '../types/personality';

export interface EmotionalState {
  emotion: string;
  intensity: number;
  timestamp: number;
  trigger: string;
  context: string;
}

export interface EmotionalPattern {
  pattern: string;
  frequency: number;
  impact: number;
  recommendations: string[];
}

export interface EmotionalTimeline {
  states: EmotionalState[];
  patterns: EmotionalPattern[];
  summary: {
    dominantEmotions: string[];
    averageIntensity: number;
    volatility: number;
    trends: string[];
  };
}

export class EmotionalAnalysisService {
  private static instance: EmotionalAnalysisService;
  private geminiClient: GeminiClient;
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 1000;

  private constructor() {
    this.geminiClient = GeminiClient.getInstance();
  }

  public static getInstance(): EmotionalAnalysisService {
    if (!EmotionalAnalysisService.instance) {
      EmotionalAnalysisService.instance = new EmotionalAnalysisService();
    }
    return EmotionalAnalysisService.instance;
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
      if (retryCount < this.MAX_RETRIES) {
        await this.sleep(this.RETRY_DELAY * Math.pow(2, retryCount));
        return this.retry(operation, retryCount + 1);
      }
      throw error;
    }
  }

  async analyzeEmotionalState(activity: UserActivity): Promise<EmotionalState> {
    return this.retry(async () => {
      try {
        const prompt = `Analyze this activity and provide emotional state details: ${JSON.stringify(activity)}`;
        return await this.geminiClient.generateStructuredContent<EmotionalState>(prompt);
      } catch (error) {
        console.error('Error analyzing emotional state:', error);
        throw error;
      }
    });
  }

  async generateEmotionalTimeline(activities: UserActivity[]): Promise<EmotionalTimeline> {
    return this.retry(async () => {
      try {
        const states = await Promise.all(
          activities.map(activity => this.analyzeEmotionalState(activity))
        );

        const prompt = `Analyze these emotional states and provide patterns and summary: ${JSON.stringify(states)}`;
        const analysis = await this.geminiClient.generateStructuredContent<{
          patterns: EmotionalPattern[];
          summary: EmotionalTimeline['summary'];
        }>(prompt);

        return {
          states,
          patterns: analysis.patterns,
          summary: analysis.summary,
        };
      } catch (error) {
        console.error('Error generating emotional timeline:', error);
        throw error;
      }
    });
  }

  async identifyEmotionalTriggers(activities: UserActivity[]): Promise<{
    triggers: Array<{
      trigger: string;
      frequency: number;
      associatedEmotions: string[];
      impact: number;
    }>;
    recommendations: string[];
  }> {
    return this.retry(async () => {
      try {
        const prompt = `Analyze these activities and identify emotional triggers: ${JSON.stringify(activities)}`;
        return await this.geminiClient.generateStructuredContent(prompt);
      } catch (error) {
        console.error('Error identifying emotional triggers:', error);
        throw error;
      }
    });
  }

  async generateEmotionalInsights(timeline: EmotionalTimeline): Promise<{
    insights: string[];
    growthAreas: string[];
    copingStrategies: string[];
    recommendations: string[];
  }> {
    return this.retry(async () => {
      try {
        const prompt = `Generate emotional insights from this timeline: ${JSON.stringify(timeline)}`;
        return await this.geminiClient.generateStructuredContent(prompt);
      } catch (error) {
        console.error('Error generating emotional insights:', error);
        throw error;
      }
    });
  }

  async predictEmotionalTrends(timeline: EmotionalTimeline): Promise<{
    predictedStates: Array<{
      emotion: string;
      probability: number;
      confidence: number;
    }>;
    recommendations: string[];
  }> {
    return this.retry(async () => {
      try {
        const prompt = `Predict future emotional trends based on this timeline: ${JSON.stringify(timeline)}`;
        return await this.geminiClient.generateStructuredContent(prompt);
      } catch (error) {
        console.error('Error predicting emotional trends:', error);
        throw error;
      }
    });
  }
} 