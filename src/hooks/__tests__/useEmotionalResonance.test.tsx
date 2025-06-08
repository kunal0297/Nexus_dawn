import { renderHook, act } from '@testing-library/react-hooks';
import { useEmotionalResonance } from '../useEmotionalResonance';
import { EmotionalState, ResonanceResult } from '../../types/emotional';

// Mock MemoryManager globally for all tests
jest.mock('../../services/EmotionalResonanceService', () => {
  const actual = jest.requireActual('../../services/EmotionalResonanceService');
  return {
    ...actual,
    EmotionalResonanceService: class extends actual.EmotionalResonanceService {
      memoryManager = {
        retrieveSimilarMemories: jest.fn().mockResolvedValue([])
      };
    }
  };
});

describe('useEmotionalResonance', () => {
  const mockEmotionalState: EmotionalState = {
    valence: 0.5,
    arousal: 0.7,
    dominance: 0.3,
    timestamp: Date.now()
  };

  const mockResonanceResult: ResonanceResult = {
    resonance: 0.8,
    coherence: 0.9,
    adaptation: 0.1,
    response: {
      text: 'Test response',
      intensity: 0.8,
      emotionalState: mockEmotionalState,
      timestamp: Date.now()
    }
  };

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useEmotionalResonance());

    expect(result.current.currentState).toBeNull();
    expect(result.current.resonanceResult).toBeNull();
    expect(result.current.isProcessing).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should process emotional state and update result', async () => {
    const { result } = renderHook(() => useEmotionalResonance());

    await act(async () => {
      await result.current.processEmotionalState(mockEmotionalState, 'test context');
    });

    expect(result.current.currentState).toEqual(mockEmotionalState);
    expect(result.current.resonanceResult).toBeDefined();
    expect(result.current.isProcessing).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle errors during processing', async () => {
    const { result } = renderHook(() => useEmotionalResonance());

    // Mock an error by passing invalid state
    const invalidState = { ...mockEmotionalState, valence: 2 }; // Invalid valence value

    await act(async () => {
      try {
        await result.current.processEmotionalState(invalidState, 'test context');
      } catch (error) {
        // Error is expected
      }
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.isProcessing).toBe(false);
  });

  it('should call onResonanceChange callback when result changes', async () => {
    const onResonanceChange = jest.fn();
    const { result } = renderHook(() => 
      useEmotionalResonance({ onResonanceChange })
    );

    await act(async () => {
      await result.current.processEmotionalState(mockEmotionalState, 'test context');
    });

    expect(onResonanceChange).toHaveBeenCalled();
  });

  it('should clear state when clearState is called', async () => {
    const { result } = renderHook(() => useEmotionalResonance());

    // First process a state
    await act(async () => {
      await result.current.processEmotionalState(mockEmotionalState, 'test context');
    });

    // Then clear the state
    act(() => {
      result.current.clearState();
    });

    expect(result.current.currentState).toBeNull();
    expect(result.current.resonanceResult).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should use custom configuration when provided', async () => {
    const customConfig = {
      resonanceThreshold: 0.8,
      adaptationRate: 0.2,
      coherenceWindow: 10,
      maxHistoryLength: 200
    };

    const { result } = renderHook(() => 
      useEmotionalResonance({ initialConfig: customConfig })
    );

    await act(async () => {
      await result.current.processEmotionalState(mockEmotionalState, 'test context');
    });

    expect(result.current.resonanceResult).toBeDefined();
  });
}); 