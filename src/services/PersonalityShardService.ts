import { PersonalityShard, UserActivity, PersonalityWeights, PersonalityEvolution } from '../types/personality';
import { GeminiClient } from '../utils/geminiClient';

export class PersonalityShardService {
  private static instance: PersonalityShardService;
  private geminiClient: GeminiClient;
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 1000;

  private constructor() {
    this.geminiClient = GeminiClient.getInstance();
  }

  public static getInstance(): PersonalityShardService {
    if (!PersonalityShardService.instance) {
      PersonalityShardService.instance = new PersonalityShardService();
    }
    return PersonalityShardService.instance;
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

  async generateShard(prompt: string): Promise<PersonalityShard> {
    return this.retry(async () => {
      try {
        const shardData = await this.geminiClient.generateStructuredContent<{
          content: string;
          traits: string[];
          emotionalWeight: number;
        }>(prompt);

        return {
          id: Date.now().toString(),
          content: shardData.content,
          traits: shardData.traits || [],
          emotionalWeight: shardData.emotionalWeight || 0.5,
          timestamp: Date.now(),
        };
      } catch (error) {
        console.error('Error generating personality shard:', error);
        throw error;
      }
    });
  }

  async analyzeShard(shard: PersonalityShard): Promise<{
    dominantTraits: string[];
    emotionalImpact: number;
    compatibility: number;
    insights: string[];
  }> {
    return this.retry(async () => {
      try {
        const prompt = `Analyze this personality shard and provide detailed insights: ${JSON.stringify(shard)}`;
        return await this.geminiClient.generateStructuredContent(prompt);
      } catch (error) {
        console.error('Error analyzing personality shard:', error);
        throw error;
      }
    });
  }

  async processUserActivity(activity: UserActivity): Promise<PersonalityShard> {
    return this.retry(async () => {
      try {
        const prompt = `Analyze this user activity and generate a personality shard: ${JSON.stringify(activity)}`;
        return await this.generateShard(prompt);
      } catch (error) {
        console.error('Error processing user activity:', error);
        throw error;
      }
    });
  }

  async generatePersonalityWeights(activities: UserActivity[]): Promise<PersonalityWeights> {
    return this.retry(async () => {
      try {
        const prompt = `Based on these user activities, generate personality weights using the Big Five model: ${JSON.stringify(activities)}`;
        return await this.geminiClient.generateStructuredContent<PersonalityWeights>(prompt);
      } catch (error) {
        console.error('Error generating personality weights:', error);
        throw error;
      }
    });
  }

  async evolvePersonality(
    previousShard: PersonalityShard,
    newActivity: UserActivity
  ): Promise<PersonalityEvolution> {
    return this.retry(async () => {
      try {
        const newShard = await this.processUserActivity(newActivity);
        const previousWeights = await this.geminiClient.generateStructuredContent<PersonalityWeights>(
          `Analyze this personality shard and generate Big Five weights: ${JSON.stringify(previousShard)}`
        );
        const newWeights = await this.geminiClient.generateStructuredContent<PersonalityWeights>(
          `Analyze this personality shard and generate Big Five weights: ${JSON.stringify(newShard)}`
        );

        const changes = Object.keys(previousWeights).map(dimension => {
          const oldValue = previousWeights[dimension as keyof PersonalityWeights];
          const newValue = newWeights[dimension as keyof PersonalityWeights];
          const percentageChange = ((newValue - oldValue) / oldValue) * 100;

          return {
            dimension: dimension as keyof PersonalityWeights,
            oldValue,
            newValue,
            percentageChange,
          };
        });

        return {
          previousShard,
          newShard,
          changes,
        };
      } catch (error) {
        console.error('Error evolving personality:', error);
        throw error;
      }
    });
  }

  async analyzeEmotionalPatterns(activities: UserActivity[]): Promise<{
    dominantEmotions: string[];
    emotionalTrends: string[];
    recommendations: string[];
    timeline: Array<{
      timestamp: number;
      emotion: string;
      intensity: number;
    }>;
  }> {
    return this.retry(async () => {
      try {
        const prompt = `Analyze these user activities and provide emotional patterns, trends, recommendations, and a timeline: ${JSON.stringify(activities)}`;
        return await this.geminiClient.generateStructuredContent(prompt);
      } catch (error) {
        console.error('Error analyzing emotional patterns:', error);
        throw error;
      }
    });
  }

  async generatePersonalityInsights(activities: UserActivity[]): Promise<{
    dominantTraits: string[];
    emotionalPatterns: string[];
    growthAreas: string[];
    recommendations: string[];
    compatibility: {
      withTraits: Array<{ trait: string; score: number }>;
      withActivities: Array<{ activity: string; score: number }>;
    };
  }> {
    return this.retry(async () => {
      try {
        const prompt = `Generate comprehensive personality insights from these activities: ${JSON.stringify(activities)}`;
        return await this.geminiClient.generateStructuredContent(prompt);
      } catch (error) {
        console.error('Error generating personality insights:', error);
        throw error;
      }
    });
  }

  async comparePersonalities(
    shard1: PersonalityShard,
    shard2: PersonalityShard
  ): Promise<{
    similarities: Array<{ trait: string; score: number }>;
    differences: Array<{ trait: string; difference: number }>;
    compatibility: number;
    recommendations: string[];
  }> {
    return this.retry(async () => {
      try {
        const prompt = `Compare these two personality shards and provide detailed analysis: ${JSON.stringify({ shard1, shard2 })}`;
        return await this.geminiClient.generateStructuredContent(prompt);
      } catch (error) {
        console.error('Error comparing personalities:', error);
        throw error;
      }
    });
  }
} 