import { useState, useEffect, useCallback } from 'react';
import { BiofeedbackState, VoiceProcessingResult, FacialEmotion } from '../types/voice';
import { VoiceProcessingService } from '../services/VoiceProcessingService';
import { FacialEmotionService } from '../services/FacialEmotionService';

interface UseBiofeedbackOptions {
  enableVoice?: boolean;
  enableFacial?: boolean;
  onStateChange?: (state: BiofeedbackState) => void;
}

export function useBiofeedback(options: UseBiofeedbackOptions = {}) {
  const [biofeedbackState, setBiofeedbackState] = useState<BiofeedbackState>({
    timestamp: Date.now()
  });
  const [isRecording, setIsRecording] = useState(false);
  const [isFacialDetectionActive, setIsFacialDetectionActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const voiceService = new VoiceProcessingService({ model: 'whisper' });
  const facialService = new FacialEmotionService({ model: 'faceapi' });

  const startVoiceRecording = useCallback(async () => {
    if (!options.enableVoice) return;

    try {
      setError(null);
      await voiceService.startRecording();
      setIsRecording(true);
    } catch (err) {
      setError('Failed to start voice recording');
      console.error(err);
    }
  }, [options.enableVoice]);

  const stopVoiceRecording = useCallback(async () => {
    if (!isRecording) return;

    try {
      const result = await voiceService.stopRecording();
      setBiofeedbackState(prev => ({
        ...prev,
        voice: result,
        timestamp: Date.now()
      }));
      setIsRecording(false);
    } catch (err) {
      setError('Failed to process voice recording');
      console.error(err);
    }
  }, [isRecording]);

  const startFacialDetection = useCallback(async (videoElement: HTMLVideoElement) => {
    if (!options.enableFacial) return;

    try {
      setError(null);
      const hasPermission = await facialService.requestCameraPermission();
      if (!hasPermission) {
        throw new Error('Camera permission denied');
      }

      await facialService.initialize();
      await facialService.startDetection(videoElement);
      setIsFacialDetectionActive(true);
    } catch (err) {
      setError('Failed to start facial detection');
      console.error(err);
    }
  }, [options.enableFacial]);

  const stopFacialDetection = useCallback(() => {
    if (!isFacialDetectionActive) return;

    facialService.stopDetection();
    setIsFacialDetectionActive(false);
  }, [isFacialDetectionActive]);

  useEffect(() => {
    if (options.onStateChange) {
      options.onStateChange(biofeedbackState);
    }
  }, [biofeedbackState, options.onStateChange]);

  return {
    biofeedbackState,
    isRecording,
    isFacialDetectionActive,
    error,
    startVoiceRecording,
    stopVoiceRecording,
    startFacialDetection,
    stopFacialDetection
  };
} 