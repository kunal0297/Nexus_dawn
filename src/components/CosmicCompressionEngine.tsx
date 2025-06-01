import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { EmotionData } from '../types/emotions';

interface CompressedState {
  id: string;
  timestamp: number;
  dnaSequence: string;
  emotions: EmotionData[];
  metadata: {
    complexity: number;
    intensity: number;
    patterns: string[];
  };
}

export const CosmicCompressionEngine: React.FC = () => {
  const { isCosmicMode } = useTheme();
  const [compressedStates, setCompressedStates] = useState<CompressedState[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);

  const generateDNASequence = useCallback((emotions: EmotionData[]): string => {
    // Convert emotions to a DNA-like sequence
    const bases = ['A', 'T', 'C', 'G'];
    return emotions
      .map(emotion => {
        const value = Math.floor(emotion.value / 25); // Convert 0-100 to 0-3
        return bases[value];
      })
      .join('');
  }, []);

  const compressEmotionalState = useCallback(async (emotions: EmotionData[]) => {
    setIsCompressing(true);
    try {
      const dnaSequence = generateDNASequence(emotions);
      const complexity = emotions.reduce((acc, curr) => acc + curr.value, 0) / emotions.length;
      const intensity = Math.max(...emotions.map(e => e.value));
      const patterns = emotions
        .filter(e => e.value > 70)
        .map(e => e.emotion);

      const newState: CompressedState = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        dnaSequence,
        emotions,
        metadata: {
          complexity,
          intensity,
          patterns,
        },
      };

      setCompressedStates(prev => [...prev, newState]);
      return newState;
    } finally {
      setIsCompressing(false);
    }
  }, [generateDNASequence]);

  const rehydrateState = useCallback((state: CompressedState) => {
    // Convert DNA sequence back to emotions
    const emotions: EmotionData[] = state.emotions.map((emotion, index) => ({
      emotion: emotion.emotion,
      value: emotion.value,
    }));
    return emotions;
  }, []);

  const shareState = useCallback(async (state: CompressedState) => {
    try {
      const shareData = {
        title: 'NEXUS.DAWN Emotional State',
        text: `DNA Sequence: ${state.dnaSequence}\nComplexity: ${state.metadata.complexity}\nIntensity: ${state.metadata.intensity}`,
      };
      await navigator.share(shareData);
    } catch (error) {
      console.error('Error sharing state:', error);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`p-6 rounded-xl ${
        isCosmicMode
          ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50'
          : 'bg-white dark:bg-gray-800'
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Cosmic Compression Engine
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Compressed States
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {compressedStates.map(state => (
                <motion.div
                  key={state.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`p-4 rounded-lg ${
                    isCosmicMode
                      ? 'bg-purple-900/30'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-mono text-sm text-purple-400">
                        {state.dnaSequence}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(state.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => rehydrateState(state)}
                        className="px-3 py-1 text-sm rounded-full bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Rehydrate
                      </button>
                      <button
                        onClick={() => shareState(state)}
                        className="px-3 py-1 text-sm rounded-full bg-green-500 text-white hover:bg-green-600"
                      >
                        Share
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Complexity: {state.metadata.complexity.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Intensity: {state.metadata.intensity.toFixed(2)}
                    </p>
                    {state.metadata.patterns.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {state.metadata.patterns.map(pattern => (
                          <span
                            key={pattern}
                            className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300"
                          >
                            {pattern}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Compression Controls
            </h3>
            <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
              <button
                onClick={() => compressEmotionalState([
                  { emotion: 'Joy', value: 75 },
                  { emotion: 'Trust', value: 60 },
                  { emotion: 'Anticipation', value: 80 },
                ])}
                disabled={isCompressing}
                className={`w-full py-2 rounded-lg ${
                  isCosmicMode
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white transition-colors`}
              >
                {isCompressing ? 'Compressing...' : 'Compress Current State'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 