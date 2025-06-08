import { 
  VoiceProcessingResult, 
  VoiceProcessingConfig, 
  VoiceEmotion,
  TranscriptionResult 
} from '../types/voice';
import { EmotionalService } from './EmotionalService';

export class VoiceProcessingService {
  private config: VoiceProcessingConfig;
  private emotionalService: EmotionalService;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  constructor(config: Partial<VoiceProcessingConfig>) {
    this.config = {
      model: 'whisper',
      language: 'en',
      sampleRate: 16000,
      emotionThreshold: 0.5,
      ...config
    };
    this.emotionalService = new EmotionalService();
  }

  async startRecording(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start();
    } catch (error) {
      console.error('Error starting recording:', error);
      throw new Error('Failed to start voice recording');
    }
  }

  async stopRecording(): Promise<VoiceProcessingResult> {
    if (!this.mediaRecorder) {
      throw new Error('No active recording');
    }

    return new Promise((resolve, reject) => {
      this.mediaRecorder!.onstop = async () => {
        try {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          const result = await this.processAudio(audioBlob);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      this.mediaRecorder!.stop();
    });
  }

  private async processAudio(audioBlob: Blob): Promise<VoiceProcessingResult> {
    try {
      // 1. Transcribe audio using Whisper
      const transcription = await this.transcribeAudio(audioBlob);

      // 2. Extract emotion from audio
      const emotion = await this.extractEmotion(audioBlob);

      return {
        transcription,
        emotion,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error processing audio:', error);
      throw new Error('Failed to process audio');
    }
  }

  private async transcribeAudio(audioBlob: Blob): Promise<TranscriptionResult> {
    // TODO: Implement Whisper API integration
    // For now, return mock data
    return {
      text: "Sample transcription",
      confidence: 0.95,
      language: this.config.language || 'en',
      duration: 0
    };
  }

  private async extractEmotion(audioBlob: Blob): Promise<VoiceEmotion> {
    // TODO: Implement openSMILE or other emotion detection
    // For now, return mock data
    return {
      valence: 0.5,
      arousal: 0.5,
      dominance: 0.5,
      confidence: 0.8
    };
  }

  async analyzeEmotionalResponse(text: string, emotion: VoiceEmotion): Promise<string> {
    // Use the emotional service to generate a response based on both text and voice emotion
    return this.emotionalService.generateResponse(text, {
      emotions: {
        valence: emotion.valence,
        arousal: emotion.arousal,
        dominance: emotion.dominance
      }
    });
  }
} 