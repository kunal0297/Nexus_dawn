import { useState, useCallback, useEffect } from 'react';
import { VADEmotions, VADEmotionalState, EmotionalPreset } from '../types/emotions';
import { EmotionalService } from '../services/EmotionalService';
import { useTheme } from '../contexts/ThemeContext';

interface UseEmotionalStateProps {
  initialEmotions?: VADEmotions;
  onEmotionalChange?: (state: { emotions: VADEmotions; context: string; timestamp: Date }) => void;
}

export function useEmotionalState({ 
  initialEmotions,
  onEmotionalChange 
}: UseEmotionalStateProps = {}) {
  const { isCosmicMode } = useTheme();
  const [emotions, setEmotions] = useState<VADEmotions>(
    initialEmotions || {
      valence: 0.5,
      arousal: 0.5,
      dominance: 0.5
    }
  );

  const [resonance, setResonance] = useState(
    EmotionalService.calculateResonance(emotions)
  );

  const handleEmotionChange = useCallback((emotion: keyof VADEmotions, value: number) => {
    if (value < 0 || value > 1) return;
    setEmotions(prev => {
      const newEmotions = { ...prev, [emotion]: value };
      
      // Validate emotions
      if (!EmotionalService.validateEmotions(newEmotions)) {
        return prev;
      }

      if (onEmotionalChange) {
        onEmotionalChange({
          emotions: newEmotions,
          context: 'normal',
          timestamp: new Date()
        });
      }
      return newEmotions;
    });
  }, [onEmotionalChange]);

  const applyPreset = useCallback((preset: EmotionalPreset) => {
    setEmotions(preset.emotions);
    setResonance(preset.resonance || EmotionalService.calculateResonance(preset.emotions));
  }, []);

  const blendWithPreset = useCallback((preset: EmotionalPreset, ratio: number) => {
    const blendedEmotions = EmotionalService.blendEmotions(emotions, preset.emotions, ratio);
    setEmotions(blendedEmotions);
    setResonance(EmotionalService.calculateResonance(blendedEmotions));
  }, [emotions]);

  // Update resonance when cosmic mode changes
  useEffect(() => {
    setResonance(EmotionalService.calculateResonance(emotions));
  }, [isCosmicMode, emotions]);

  const getEmotionColor = useCallback((emotion: keyof VADEmotions, cosmicMode = false) => {
    const value = emotions[emotion];
    const colors = cosmicMode ? {
      valence: ['#FF00FF', '#00FFFF'],
      arousal: ['#00FFFF', '#FF00FF'],
      dominance: ['#FF00FF', '#00FFFF']
    } : {
      valence: ['#FF6B6B', '#4ECDC4'],
      arousal: ['#4ECDC4', '#FF6B6B'],
      dominance: ['#FF6B6B', '#4ECDC4']
    };
    return `linear-gradient(90deg, ${colors[emotion][0]} ${value * 100}%, ${colors[emotion][1]} ${value * 100}%)`;
  }, [emotions]);

  return {
    emotions,
    resonance,
    handleEmotionChange,
    applyPreset,
    blendWithPreset,
    getEmotionColor
  };
} 