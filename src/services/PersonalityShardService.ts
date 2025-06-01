import { RedditClient } from 'devvit';
import algosdk from 'algosdk';
import { blockchainService } from './BlockchainService';
import { createEmbedding } from '../utils/embeddings';
import { PersonalityShard, UserActivity, PersonalityWeights } from '../types/personality';

class PersonalityShardService {
  private static instance: PersonalityShardService;
  private redditClient: RedditClient;
  private algodClient: algosdk.Algodv2;
  private readonly SHARD_APP_ID: number;

  private constructor() {
    this.redditClient = new RedditClient({
      clientId: process.env.REACT_APP_REDDIT_CLIENT_ID || '',
      clientSecret: process.env.REACT_APP_REDDIT_CLIENT_SECRET || '',
      username: process.env.REACT_APP_REDDIT_USERNAME || '',
      password: process.env.REACT_APP_REDDIT_PASSWORD || ''
    });

    this.algodClient = new algosdk.Algodv2(
      process.env.REACT_APP_ALGORAND_TOKEN || '',
      process.env.REACT_APP_ALGORAND_SERVER || '',
      process.env.REACT_APP_ALGORAND_PORT || ''
    );

    this.SHARD_APP_ID = Number(process.env.REACT_APP_SHARD_APP_ID) || 0;
  }

  public static getInstance(): PersonalityShardService {
    if (!PersonalityShardService.instance) {
      PersonalityShardService.instance = new PersonalityShardService();
    }
    return PersonalityShardService.instance;
  }

  public async fetchUserActivity(username: string): Promise<UserActivity> {
    try {
      const [posts, comments] = await Promise.all([
        this.redditClient.getUserPosts(username, { limit: 100 }),
        this.redditClient.getUserComments(username, { limit: 100 })
      ]);

      return {
        posts: posts.map(post => ({
          id: post.id,
          title: post.title,
          content: post.selftext,
          timestamp: post.created_utc,
          subreddit: post.subreddit,
          score: post.score
        })),
        comments: comments.map(comment => ({
          id: comment.id,
          content: comment.body,
          timestamp: comment.created_utc,
          subreddit: comment.subreddit,
          score: comment.score
        }))
      };
    } catch (error) {
      console.error('Error fetching user activity:', error);
      throw error;
    }
  }

  public async generatePersonalityEmbedding(activity: UserActivity): Promise<number[]> {
    try {
      // Combine all text content
      const textContent = [
        ...activity.posts.map(post => `${post.title} ${post.content}`),
        ...activity.comments.map(comment => comment.content)
      ].join(' ');

      // Generate embedding using OpenAI or similar
      const embedding = await createEmbedding(textContent);
      return embedding;
    } catch (error) {
      console.error('Error generating personality embedding:', error);
      throw error;
    }
  }

  public async calculatePersonalityWeights(embedding: number[]): Promise<PersonalityWeights> {
    // Define personality dimensions
    const dimensions = {
      creativity: 0,
      analytical: 0,
      emotional: 0,
      social: 0,
      technical: 0,
      philosophical: 0
    };

    // Map embedding values to personality dimensions
    // This is a simplified example - you'd want more sophisticated mapping
    dimensions.creativity = embedding[0] * 0.8 + embedding[1] * 0.2;
    dimensions.analytical = embedding[2] * 0.7 + embedding[3] * 0.3;
    dimensions.emotional = embedding[4] * 0.6 + embedding[5] * 0.4;
    dimensions.social = embedding[6] * 0.9 + embedding[7] * 0.1;
    dimensions.technical = embedding[8] * 0.7 + embedding[9] * 0.3;
    dimensions.philosophical = embedding[10] * 0.8 + embedding[11] * 0.2;

    // Normalize weights
    const total = Object.values(dimensions).reduce((sum, val) => sum + val, 0);
    Object.keys(dimensions).forEach(key => {
      dimensions[key as keyof typeof dimensions] /= total;
    });

    return dimensions;
  }

  public async storePersonalityShard(
    username: string,
    weights: PersonalityWeights,
    embedding: number[]
  ): Promise<string> {
    try {
      const shard: PersonalityShard = {
        username,
        weights,
        embedding,
        timestamp: Date.now(),
        version: 1
      };

      // Create Algorand transaction
      const params = await this.algodClient.getTransactionParams().do();
      const note = new TextEncoder().encode(JSON.stringify(shard));

      const txn = algosdk.makeApplicationCallTxn(
        blockchainService.getState().account!,
        params,
        this.SHARD_APP_ID,
        [new Uint8Array(Buffer.from('store_shard'))],
        undefined,
        undefined,
        undefined,
        note
      );

      // Sign and send transaction
      const signedTxn = await blockchainService.signTransaction(txn);
      const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();
      
      // Wait for confirmation
      await algosdk.waitForConfirmation(this.algodClient, txId, 3);
      
      return txId;
    } catch (error) {
      console.error('Error storing personality shard:', error);
      throw error;
    }
  }

  public async retrievePersonalityShard(username: string): Promise<PersonalityShard | null> {
    try {
      // Query Algorand application for shard data
      const accountInfo = await this.algodClient.accountInformation(
        blockchainService.getState().account!
      ).do();

      // Find the most recent shard for the user
      const shardData = accountInfo['app-local-state']?.[this.SHARD_APP_ID]?.key;
      if (!shardData) return null;

      return JSON.parse(new TextDecoder().decode(shardData));
    } catch (error) {
      console.error('Error retrieving personality shard:', error);
      throw error;
    }
  }

  public async evolvePersonalityShard(
    username: string,
    newActivity: UserActivity
  ): Promise<PersonalityShard> {
    try {
      // Get existing shard
      const existingShard = await this.retrievePersonalityShard(username);
      
      // Generate new embedding
      const newEmbedding = await this.generatePersonalityEmbedding(newActivity);
      
      // Calculate new weights
      const newWeights = await this.calculatePersonalityWeights(newEmbedding);
      
      // Evolve weights by combining old and new
      const evolvedWeights: PersonalityWeights = {
        creativity: (existingShard?.weights.creativity || 0) * 0.7 + newWeights.creativity * 0.3,
        analytical: (existingShard?.weights.analytical || 0) * 0.7 + newWeights.analytical * 0.3,
        emotional: (existingShard?.weights.emotional || 0) * 0.7 + newWeights.emotional * 0.3,
        social: (existingShard?.weights.social || 0) * 0.7 + newWeights.social * 0.3,
        technical: (existingShard?.weights.technical || 0) * 0.7 + newWeights.technical * 0.3,
        philosophical: (existingShard?.weights.philosophical || 0) * 0.7 + newWeights.philosophical * 0.3
      };

      // Store evolved shard
      const txId = await this.storePersonalityShard(username, evolvedWeights, newEmbedding);
      
      return {
        username,
        weights: evolvedWeights,
        embedding: newEmbedding,
        timestamp: Date.now(),
        version: (existingShard?.version || 0) + 1
      };
    } catch (error) {
      console.error('Error evolving personality shard:', error);
      throw error;
    }
  }
}

export const personalityShardService = PersonalityShardService.getInstance(); 