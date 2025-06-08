import { renderHook, act } from '@testing-library/react';
import { useEmotionalState } from '../useEmotionalState';
import { EmotionalService } from '../../services/EmotionalService';
import { defaultEmotions } from '../../constants/emotions';

describe('useEmotionalState', () => {
  it('initializes with default emotions', () => {
    const { result } = renderHook(() => useEmotionalState());
    
    expect(result.current.emotions).toEqual(defaultEmotions);
    expect(result.current.resonance).toBeDefined();
  });

  it('initializes with custom emotions', () => {
    const initialEmotions = {
      valence: 0.8,
      arousal: 0.6,
      dominance: 0.7,
    };

    const { result } = renderHook(() => 
      useEmotionalState({ initialEmotions })
    );
    
    expect(result.current.emotions).toEqual(initialEmotions);
  });

  it('handles emotion changes', () => {
    const { result } = renderHook(() => useEmotionalState());
    
    act(() => {
      result.current.handleEmotionChange('valence', 0.8);
    });

    expect(result.current.emotions.valence).toBe(0.8);
  });

  it('rejects invalid emotion values', () => {
    const { result } = renderHook(() => useEmotionalState());
    
    act(() => {
      result.current.handleEmotionChange('valence', 1.5);
    });

    expect(result.current.emotions.valence).toBeLessThanOrEqual(1);
  });

  it('applies presets', () => {
    const { result } = renderHook(() => useEmotionalState());
    const preset = EmotionalService.createPreset(
      'test-preset',
      'Test Preset',
      { valence: 0.9, arousal: 0.8, dominance: 0.7 }
    );

    act(() => {
      result.current.applyPreset(preset);
    });

    expect(result.current.emotions).toEqual(preset.emotions);
  });

  it('blends with presets', () => {
    const { result } = renderHook(() => useEmotionalState());
    const preset = EmotionalService.createPreset(
      'test-preset',
      'Test Preset',
      { valence: 0.9, arousal: 0.8, dominance: 0.7 }
    );

    act(() => {
      result.current.blendWithPreset(preset, 0.5);
    });

    expect(result.current.emotions.valence).toBeGreaterThan(0);
    expect(result.current.emotions.valence).toBeLessThan(1);
  });

  it('calls onEmotionalChange callback', () => {
    const onEmotionalChange = jest.fn();
    const { result } = renderHook(() => 
      useEmotionalState({ onEmotionalChange })
    );
    
    act(() => {
      result.current.handleEmotionChange('valence', 0.8);
    });

    expect(onEmotionalChange).toHaveBeenCalledWith(
      expect.objectContaining({
        valence: 0.8,
      })
    );
  });

  it('returns correct emotion color', () => {
    const { result } = renderHook(() => useEmotionalState());
    
    const color = result.current.getEmotionColor('valence');
    expect(color).toContain('linear-gradient');
  });

  it('handles cosmic mode in emotion color', () => {
    const { result } = renderHook(() => useEmotionalState());
    
    const normalColor = result.current.getEmotionColor('valence', false);
    const cosmicColor = result.current.getEmotionColor('valence', true);

    expect(normalColor).not.toEqual(cosmicColor);
  });
}); 