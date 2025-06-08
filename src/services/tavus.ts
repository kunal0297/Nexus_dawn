import { env } from '../config/env.validation';

interface VideoResponse {
  videoUrl: string;
  metadata: {
    duration: number;
    text: string;
    emotions: {
      valence: number;
      arousal: number;
      dominance: number;
    };
  };
}

export class TavusService {
  private static instance: TavusService;
  private apiKey: string;
  private baseUrl = 'https://api.tavus.io/v1';

  private constructor() {
    this.apiKey = env.VITE_TAVUS_API_KEY;
  }

  public static getInstance(): TavusService {
    if (!TavusService.instance) {
      TavusService.instance = new TavusService();
    }
    return TavusService.instance;
  }

  public async generateVideo(
    text: string,
    avatarId: string,
    emotions: {
      valence: number;
      arousal: number;
      dominance: number;
    }
  ): Promise<VideoResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/videos/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          text,
          avatar_id: avatarId,
          emotion_settings: {
            valence: emotions.valence,
            arousal: emotions.arousal,
            dominance: emotions.dominance,
          },
          style: 'natural',
          background: 'transparent',
        }),
      });

      if (!response.ok) {
        throw new Error(`Tavus API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        videoUrl: data.video_url,
        metadata: {
          duration: data.duration,
          text,
          emotions,
        },
      };
    } catch (error) {
      console.error('Error generating video:', error);
      throw error;
    }
  }

  public async getAvatars(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/avatars`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Tavus API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.avatars;
    } catch (error) {
      console.error('Error fetching avatars:', error);
      throw error;
    }
  }
} 