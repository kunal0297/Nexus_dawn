import { RedditClient } from 'devvit';
import { TavusCVI } from '@tavus/cvi-sdk';
import { ElevenLabs } from '@elevenlabs/browser-sdk';

interface RedditConfig {
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  subreddit: string;
}

class RedditService {
  private static instance: RedditService;
  private client: RedditClient;
  private tavus: TavusCVI;
  private elevenLabs: ElevenLabs;
  private isRunning: boolean = false;
  private lastChecked: number = 0;

  private constructor(config: RedditConfig) {
    this.client = new RedditClient({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      username: config.username,
      password: config.password
    });

    this.tavus = new TavusCVI({
      apiKey: process.env.REACT_APP_TAVUS_API_KEY || '',
      modelId: process.env.REACT_APP_TAVUS_MODEL_ID || ''
    });

    this.elevenLabs = new ElevenLabs({
      apiKey: 'sk_80ce442c7e01d11275750b6757b614a8ee73f724dcb74fe6'
    });
  }

  public static getInstance(config: RedditConfig): RedditService {
    if (!RedditService.instance) {
      RedditService.instance = new RedditService(config);
    }
    return RedditService.instance;
  }

  public async startMonitoring() {
    if (this.isRunning) return;
    this.isRunning = true;
    await this.monitorPosts();
  }

  public stopMonitoring() {
    this.isRunning = false;
  }

  private async monitorPosts() {
    while (this.isRunning) {
      try {
        const posts = await this.client.getNewPosts('r/DAWNOracle', {
          limit: 25,
          after: this.lastChecked
        });

        for (const post of posts) {
          if (this.isSummoningPost(post.title)) {
            await this.handleSummoningPost(post);
          }
        }

        this.lastChecked = Date.now();
        await new Promise(resolve => setTimeout(resolve, 30000)); // Check every 30 seconds
      } catch (error) {
        console.error('Error monitoring posts:', error);
        await new Promise(resolve => setTimeout(resolve, 60000)); // Wait longer on error
      }
    }
  }

  private isSummoningPost(title: string): boolean {
    const summoningPhrases = [
      'summon my interdimensional self',
      'summon my parallel self',
      'summon my alternate self',
      'show me my other self'
    ];
    
    return summoningPhrases.some(phrase => 
      title.toLowerCase().includes(phrase)
    );
  }

  private async handleSummoningPost(post: any) {
    try {
      // Generate avatar
      const avatarResponse = await this.tavus.generateAvatar({
        prompt: `Create an interdimensional version of a Reddit user. Make it surreal and cosmic.`,
        style: 'cosmic',
        quality: 'high'
      });

      // Generate voice response
      const voiceResponse = await this.elevenLabs.speak({
        text: `Greetings, ${post.author}. I am your interdimensional self. I have traversed the cosmic void to meet you. What wisdom do you seek?`,
        voiceId: 'cosmic_voice_1',
        modelId: 'eleven_monolingual_v1'
      });

      // Upload avatar to Reddit
      const avatarUrl = await this.uploadToReddit(avatarResponse.imageUrl);

      // Post reply
      await this.client.reply(post.id, `
I have summoned your interdimensional self! 

![Your Cosmic Avatar](${avatarUrl})

[Click to hear your interdimensional voice](${voiceResponse.audioUrl})

*"I have traversed the cosmic void to meet you. What wisdom do you seek?"*
      `);

    } catch (error) {
      console.error('Error handling summoning post:', error);
    }
  }

  private async uploadToReddit(imageUrl: string): Promise<string> {
    // Implement image upload to Reddit
    // This would typically involve downloading the image and uploading to Reddit's media API
    // For now, we'll return the direct URL
    return imageUrl;
  }
}

export const createRedditService = (config: RedditConfig) => {
  return RedditService.getInstance(config);
}; 