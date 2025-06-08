import { VoiceSynthesisService } from '../../src/services/voiceSynthesis';
import { EmotionType, EmotionIntensity } from '../../src/types/emotions';

jest.mock('../../src/config/env.validation', () => ({
  env: {
    REACT_APP_ELEVENLABS_API_KEY: 'test-elevenlabs-key',
  },
}));

describe('VoiceSynthesisService', () => {
  let voiceSynthesisService: VoiceSynthesisService;
  const mockAudioContext = {
    createBuffer: jest.fn(),
    createBufferSource: jest.fn(),
    destination: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
    global.AudioContext = jest.fn().mockImplementation(() => mockAudioContext);
    voiceSynthesisService = new VoiceSynthesisService();
  });

  describe('synthesizeSpeech', () => {
    it('should synthesize speech with default voice', async () => {
      const text = 'Hello, how are you feeling today?';
      const mockAudioBuffer = {
        duration: 2.5,
        numberOfChannels: 1,
        sampleRate: 44100,
      };

      mockAudioContext.createBuffer.mockReturnValueOnce(mockAudioBuffer);
      mockAudioContext.createBufferSource.mockReturnValueOnce({
        connect: jest.fn(),
        start: jest.fn(),
      });

      const result = await voiceSynthesisService.synthesizeSpeech(text);

      expect(result).toBeDefined();
      expect(result.duration).toBe(2.5);
      expect(result.numberOfChannels).toBe(1);
      expect(result.sampleRate).toBe(44100);
    });

    it('should synthesize speech with specific voice', async () => {
      const text = 'Hello, how are you feeling today?';
      const voiceId = 'test-voice-id';
      const mockAudioBuffer = {
        duration: 2.5,
        numberOfChannels: 1,
        sampleRate: 44100,
      };

      mockAudioContext.createBuffer.mockReturnValueOnce(mockAudioBuffer);
      mockAudioContext.createBufferSource.mockReturnValueOnce({
        connect: jest.fn(),
        start: jest.fn(),
      });

      const result = await voiceSynthesisService.synthesizeSpeech(text, voiceId);

      expect(result).toBeDefined();
      expect(result.duration).toBe(2.5);
    });

    it('should handle empty text', async () => {
      const text = '';

      await expect(voiceSynthesisService.synthesizeSpeech(text)).rejects.toThrow('Text cannot be empty');
    });

    it('should handle API errors', async () => {
      const text = 'Hello, how are you feeling today?';
      const error = new Error('API Error');

      mockAudioContext.createBuffer.mockImplementationOnce(() => {
        throw error;
      });

      await expect(voiceSynthesisService.synthesizeSpeech(text)).rejects.toThrow('API Error');
    });
  });

  describe('synthesizeEmotionalSpeech', () => {
    it('should synthesize speech with emotional context', async () => {
      const text = 'I am glad to hear that you are feeling happy!';
      const emotion = {
        type: EmotionType.JOY,
        intensity: EmotionIntensity.HIGH,
        confidence: 0.95,
      };

      const mockAudioBuffer = {
        duration: 2.5,
        numberOfChannels: 1,
        sampleRate: 44100,
      };

      mockAudioContext.createBuffer.mockReturnValueOnce(mockAudioBuffer);
      mockAudioContext.createBufferSource.mockReturnValueOnce({
        connect: jest.fn(),
        start: jest.fn(),
      });

      const result = await voiceSynthesisService.synthesizeEmotionalSpeech(text, emotion);

      expect(result).toBeDefined();
      expect(result.duration).toBe(2.5);
    });

    it('should handle mixed emotions', async () => {
      const text = 'I notice you are feeling both excited and anxious.';
      const emotion = {
        type: EmotionType.MIXED,
        intensity: EmotionIntensity.MEDIUM,
        confidence: 0.85,
        subEmotions: [
          { type: EmotionType.JOY, intensity: EmotionIntensity.MEDIUM },
          { type: EmotionType.ANXIETY, intensity: EmotionIntensity.MEDIUM },
        ],
      };

      const mockAudioBuffer = {
        duration: 2.5,
        numberOfChannels: 1,
        sampleRate: 44100,
      };

      mockAudioContext.createBuffer.mockReturnValueOnce(mockAudioBuffer);
      mockAudioContext.createBufferSource.mockReturnValueOnce({
        connect: jest.fn(),
        start: jest.fn(),
      });

      const result = await voiceSynthesisService.synthesizeEmotionalSpeech(text, emotion);

      expect(result).toBeDefined();
      expect(result.duration).toBe(2.5);
    });

    it('should handle API errors', async () => {
      const text = 'I am glad to hear that you are feeling happy!';
      const emotion = {
        type: EmotionType.JOY,
        intensity: EmotionIntensity.HIGH,
        confidence: 0.95,
      };

      const error = new Error('API Error');

      mockAudioContext.createBuffer.mockImplementationOnce(() => {
        throw error;
      });

      await expect(voiceSynthesisService.synthesizeEmotionalSpeech(text, emotion)).rejects.toThrow('API Error');
    });
  });

  describe('getAvailableVoices', () => {
    it('should return list of available voices', async () => {
      const mockVoices = [
        { id: 'voice1', name: 'Voice 1', gender: 'female' },
        { id: 'voice2', name: 'Voice 2', gender: 'male' },
      ];

      const result = await voiceSynthesisService.getAvailableVoices();

      expect(result).toEqual(mockVoices);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');

      await expect(voiceSynthesisService.getAvailableVoices()).rejects.toThrow('API Error');
    });
  });

  describe('playAudio', () => {
    it('should play audio buffer', async () => {
      const mockAudioBuffer = {
        duration: 2.5,
        numberOfChannels: 1,
        sampleRate: 44100,
      };

      const mockSource = {
        connect: jest.fn(),
        start: jest.fn(),
      };

      mockAudioContext.createBufferSource.mockReturnValueOnce(mockSource);

      await voiceSynthesisService.playAudio(mockAudioBuffer);

      expect(mockSource.connect).toHaveBeenCalledWith(mockAudioContext.destination);
      expect(mockSource.start).toHaveBeenCalled();
    });

    it('should handle playback errors', async () => {
      const mockAudioBuffer = {
        duration: 2.5,
        numberOfChannels: 1,
        sampleRate: 44100,
      };

      const error = new Error('Playback failed');
      mockAudioContext.createBufferSource.mockImplementationOnce(() => {
        throw error;
      });

      await expect(voiceSynthesisService.playAudio(mockAudioBuffer)).rejects.toThrow('Playback failed');
    });
  });
}); 