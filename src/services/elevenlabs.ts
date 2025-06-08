import { env } from '../config/env.validation';

interface VoiceResponse {
  audio: ArrayBuffer;
  metadata: {
    duration: number;
    text: string;
  };
}

export class ElevenLabsService {
  private static instance: ElevenLabsService;
  private apiKey: string;
  private baseUrl = 'https://api.elevenlabs.io/v1';

  private constructor() {
    this.apiKey = env.VITE_ELEVENLABS_API_KEY;
  }

  public static getInstance(): ElevenLabsService {
    if (!ElevenLabsService.instance) {
      ElevenLabsService.instance = new ElevenLabsService();
    }
    return ElevenLabsService.instance;
  }

  public async synthesizeVoice(
    text: string,
    voiceId: string,
    stability: number = 0.5,
    similarityBoost: number = 0.75
  ): Promise<VoiceResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/text-to-speech/${voiceId}/stream`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': this.apiKey,
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_monolingual_v1',
            voice_settings: {
              stability,
              similarity_boost: similarityBoost,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.statusText}`);
      }

      const audioBuffer = await response.arrayBuffer();
      const metadata = {
        duration: 0, // Calculate duration based on audio length
        text,
      };

      return { audio: audioBuffer, metadata };
    } catch (error) {
      console.error('Error synthesizing voice:', error);
      throw error;
    }
  }

  public async getVoices(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/voices`, {
        headers: {
          'xi-api-key': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.voices;
    } catch (error) {
      console.error('Error fetching voices:', error);
      throw error;
    }
  }
} 