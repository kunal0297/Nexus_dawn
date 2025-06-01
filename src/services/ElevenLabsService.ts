import axios from 'axios';

// TODO: Remove this temporary API key before pushing to git
const ELEVENLABS_API_KEY = process.env.REACT_APP_ELEVENLABS_API_KEY;
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';

export interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style: number;
  use_speaker_boost: boolean;
}

export interface TextToSpeechOptions {
  text: string;
  voiceId: string;
  modelId?: string;
  voiceSettings?: VoiceSettings;
}

class ElevenLabsService {
  private static instance: ElevenLabsService;
  private apiKey: string;

  private constructor() {
    if (!ELEVENLABS_API_KEY) {
      throw new Error('ElevenLabs API key is not configured');
    }
    this.apiKey = ELEVENLABS_API_KEY;
  }

  public static getInstance(): ElevenLabsService {
    if (!ElevenLabsService.instance) {
      ElevenLabsService.instance = new ElevenLabsService();
    }
    return ElevenLabsService.instance;
  }

  public async textToSpeech(options: TextToSpeechOptions): Promise<ArrayBuffer> {
    try {
      const response = await axios.post(
        `${ELEVENLABS_API_URL}/text-to-speech/${options.voiceId}`,
        {
          text: options.text,
          model_id: options.modelId || 'eleven_monolingual_v1',
          voice_settings: options.voiceSettings || {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.0,
            use_speaker_boost: true
          }
        },
        {
          headers: {
            'Accept': 'audio/mpeg',
            'xi-api-key': this.apiKey,
            'Content-Type': 'application/json'
          },
          responseType: 'arraybuffer'
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error in text-to-speech conversion:', error);
      throw error;
    }
  }

  public async getVoices(): Promise<any> {
    try {
      const response = await axios.get(`${ELEVENLABS_API_URL}/voices`, {
        headers: {
          'xi-api-key': this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching voices:', error);
      throw error;
    }
  }
}

export default ElevenLabsService; 