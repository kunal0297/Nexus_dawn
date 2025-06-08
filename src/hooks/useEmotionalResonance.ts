import { useState, useCallback, useEffect } from 'react';
import { EmotionalResonanceService } from '../services/EmotionalResonanceService';
import { EmotionalService } from '../services/EmotionalService';
import { MemoryManager } from '../core/memory/MemoryManager';
import { VectorStore } from '../core/memory/VectorStore';
import { EmotionalState, EmotionalResponse, ResonanceResult } from '../types/emotional';

interface UseEmotionalResonanceProps {
  initialConfig?: {
    resonanceThreshold?: number;
    adaptationRate?: number;
    coherenceWindow?: number;
    maxHistoryLength?: number;
  };
  onResonanceChange?: (result: ResonanceResult) => void;
}

export function useEmotionalResonance({
  initialConfig,
  onResonanceChange
}: UseEmotionalResonanceProps = {}) {
  const [resonanceService] = useState(() => {
    const vectorStore = new VectorStore();
    const memoryManager = new MemoryManager(vectorStore);
    const emotionalService = new EmotionalService();
    return new EmotionalResonanceService(emotionalService, memoryManager, initialConfig);
  });

  const [currentState, setCurrentState] = useState<EmotionalState | null>(null);
  const [resonanceResult, setResonanceResult] = useState<ResonanceResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const processEmotionalState = useCallback(async (
    state: EmotionalState,
    context: string = ''
  ) => {
    try {
      setIsProcessing(true);
      setError(null);
      setCurrentState(state);

      const result = await resonanceService.processEmotionalResonance(state, context);
      setResonanceResult(result);
      onResonanceChange?.(result);

      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to process emotional state');
      setError(error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [resonanceService, onResonanceChange]);

  const clearState = useCallback(() => {
    setCurrentState(null);
    setResonanceResult(null);
    setError(null);
  }, []);

  return {
    currentState,
    resonanceResult,
    isProcessing,
    error,
    processEmotionalState,
    clearState
  };
} 