import { useState, useCallback } from 'react';
import ElevenLabsService, { TextToSpeechOptions, VoiceSettings } from '../services/ElevenLabsService';

interface UseElevenLabsReturn {
  isSpeaking: boolean;
  error: string | null;
  speak: (text: string, voiceId: string, settings?: VoiceSettings) => Promise<void>;
  stop: () => void;
  voices: any[];
  isLoadingVoices: boolean;
  loadVoices: () => Promise<void>;
}

export const useElevenLabs = (): UseElevenLabsReturn => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voices, setVoices] = useState<any[]>([]);
  const [isLoadingVoices, setIsLoadingVoices] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [currentSource, setCurrentSource] = useState<AudioBufferSourceNode | null>(null);

  const speak = useCallback(async (text: string, voiceId: string, settings?: VoiceSettings) => {
    try {
      setIsSpeaking(true);
      setError(null);

      const elevenLabs = ElevenLabsService.getInstance();
      const audioData = await elevenLabs.textToSpeech({
        text,
        voiceId,
        voiceSettings: settings
      });

      // Create audio context if it doesn't exist
      if (!audioContext) {
        const newAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(newAudioContext);
      }

      // Decode audio data
      const audioBuffer = await audioContext!.decodeAudioData(audioData);

      // Create and play audio source
      const source = audioContext!.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext!.destination);
      source.start(0);
      setCurrentSource(source);

      // Handle audio completion
      source.onended = () => {
        setIsSpeaking(false);
        setCurrentSource(null);
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsSpeaking(false);
    }
  }, [audioContext]);

  const stop = useCallback(() => {
    if (currentSource) {
      currentSource.stop();
      setCurrentSource(null);
    }
    setIsSpeaking(false);
  }, [currentSource]);

  const loadVoices = useCallback(async () => {
    try {
      setIsLoadingVoices(true);
      const elevenLabs = ElevenLabsService.getInstance();
      const voicesData = await elevenLabs.getVoices();
      setVoices(voicesData.voices || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load voices');
    } finally {
      setIsLoadingVoices(false);
    }
  }, []);

  return {
    isSpeaking,
    error,
    speak,
    stop,
    voices,
    isLoadingVoices,
    loadVoices
  };
}; 