import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { EmotionData } from '../types/emotions';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface IntuitionPulse {
  id: string;
  timestamp: number;
  intensity: number;
  message: string;
  confidence: number;
  relatedPatterns: string[];
}

export const QuantumIntuitionPulse: React.FC = () => {
  const { isCosmicMode } = useTheme();
  const [pulses, setPulses] = useState<IntuitionPulse[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentPulse, setCurrentPulse] = useState<IntuitionPulse | null>(null);

  const analyzeEmotionalPatterns = useCallback(async (emotions: EmotionData[]) => {
    setIsAnalyzing(true);
    try {
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || '');
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `Analyze these emotional patterns and provide intuitive insights: ${JSON.stringify(emotions)}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const insight = response.text();

      const newPulse: IntuitionPulse = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        intensity: Math.random() * 100,
        message: insight,
        confidence: Math.random() * 0.5 + 0.5, // 0.5 to 1.0
        relatedPatterns: ['Emotional Shift', 'Pattern Recognition', 'Intuitive Insight'],
      };

      setPulses(prev => [newPulse, ...prev]);
      setCurrentPulse(newPulse);
    } catch (error) {
      console.error('Error analyzing patterns:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  useEffect(() => {
    // Simulate periodic analysis
    const interval = setInterval(() => {
      analyzeEmotionalPatterns([
        { emotion: 'Joy', value: Math.random() * 100 },
        { emotion: 'Trust', value: Math.random() * 100 },
        { emotion: 'Anticipation', value: Math.random() * 100 },
      ]);
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [analyzeEmotionalPatterns]);

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
        Quantum Intuition Pulse
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <AnimatePresence>
            {currentPulse && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`p-4 rounded-lg ${
                  isCosmicMode
                    ? 'bg-purple-900/30'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Current Pulse
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: `rgba(139, 92, 246, ${currentPulse.intensity / 100})`,
                      }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {currentPulse.intensity.toFixed(0)}%
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  {currentPulse.message}
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentPulse.relatedPatterns.map((pattern, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300"
                    >
                      {pattern}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Pulse History
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {pulses.map(pulse => (
              <motion.div
                key={pulse.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${
                  isCosmicMode
                    ? 'bg-purple-900/30'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(pulse.timestamp).toLocaleString()}
                  </span>
                  <span className="text-sm text-purple-400">
                    {pulse.confidence.toFixed(2)} confidence
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  {pulse.message}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 