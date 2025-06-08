import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stars } from '@react-three/drei';
import { EmotionData } from '../types/emotions';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface FutureSelf {
  id: string;
  timestamp: number;
  visualization: string;
  insights: string[];
  patterns: string[];
  confidence: number;
  emotionalResonance: {
    intensity: number;
    dominantEmotion: string;
    harmony: number;
  };
}

const getEmotionalGradient = (emotion: string, intensity: number) => {
  const opacity = intensity / 100;
  switch (emotion) {
    case 'Joy':
      return `bg-gradient-to-br from-yellow-500/${opacity} to-orange-500/${opacity}`;
    case 'Trust':
      return `bg-gradient-to-br from-blue-500/${opacity} to-indigo-500/${opacity}`;
    case 'Anticipation':
      return `bg-gradient-to-br from-green-500/${opacity} to-emerald-500/${opacity}`;
    case 'Surprise':
      return `bg-gradient-to-br from-purple-500/${opacity} to-pink-500/${opacity}`;
    case 'Fear':
      return `bg-gradient-to-br from-gray-500/${opacity} to-slate-500/${opacity}`;
    case 'Sadness':
      return `bg-gradient-to-br from-blue-500/${opacity} to-cyan-500/${opacity}`;
    case 'Anger':
      return `bg-gradient-to-br from-red-500/${opacity} to-orange-500/${opacity}`;
    case 'Disgust':
      return `bg-gradient-to-br from-green-500/${opacity} to-lime-500/${opacity}`;
    default:
      return `bg-gradient-to-br from-gray-500/${opacity} to-gray-600/${opacity}`;
  }
};

export const MirrorOfBecoming: React.FC = () => {
  const { isCosmicMode } = useTheme();
  const [futureSelf, setFutureSelf] = useState<FutureSelf | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const generateFutureSelf = useCallback(async () => {
    setIsGenerating(true);
    try {
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || '');
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `Generate profound insights about my future self based on my current emotional patterns. Each insight should be poetic and emotionally resonant, focusing on growth, transformation, and potential. Format each insight on a new line.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      const newInsights = text.split('\n').filter(Boolean);

      const newFutureSelf: FutureSelf = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        visualization: 'future-self.glb',
        insights: newInsights,
        patterns: ['Quantum Growth', 'Cosmic Adaptation', 'Neural Resilience'],
        confidence: 0.85,
        emotionalResonance: {
          intensity: 85,
          dominantEmotion: 'Anticipation',
          harmony: 0.92,
        },
      };

      setFutureSelf(newFutureSelf);
      setInsights(newInsights);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (error) {
      console.error('Error generating future self:', error);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const FutureSelfModel = () => {
    const { scene } = useGLTF('/models/future-self.glb');
    return <primitive object={scene} />;
  };

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
        Mirror of Becoming
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-900 relative">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
              <FutureSelfModel />
              <OrbitControls />
            </Canvas>
            {futureSelf && (
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-black/50 backdrop-blur-sm">
                <div className="flex items-center justify-between text-white">
                  <span>Emotional Resonance</span>
                  <span>{futureSelf.emotionalResonance.intensity}%</span>
                </div>
                <div className="w-full h-1 bg-gray-700 rounded-full mt-2">
                  <motion.div
                    className={`h-full ${getEmotionalGradient(futureSelf.emotionalResonance.dominantEmotion, futureSelf.emotionalResonance.intensity)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${futureSelf.emotionalResonance.intensity}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Oracle's Insights
            </h3>
            <div className="space-y-4">
              <AnimatePresence>
                {insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg bg-white dark:bg-gray-600 shadow-sm"
                  >
                    <p className="text-gray-700 dark:text-gray-200">{insight}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Pattern Analysis
            </h3>
            <div className="flex flex-wrap gap-2">
              {futureSelf?.patterns.map((pattern, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300"
                >
                  {pattern}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.button
            onClick={generateFutureSelf}
            disabled={isGenerating}
            className={`w-full py-3 rounded-lg ${
              isCosmicMode
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition-colors relative overflow-hidden`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-white/20"
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">
              {isGenerating ? 'Quantum Computing...' : 'Generate Future Self'}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}; 
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Oracle's Insights
            </h3>
            <div className="space-y-4">
              <AnimatePresence>
                {insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg bg-white dark:bg-gray-600 shadow-sm"
                  >
                    <p className="text-gray-700 dark:text-gray-200">{insight}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Pattern Analysis
            </h3>
            <div className="flex flex-wrap gap-2">
              {futureSelf?.patterns.map((pattern, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300"
                >
                  {pattern}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.button
            onClick={generateFutureSelf}
            disabled={isGenerating}
            className={`w-full py-3 rounded-lg ${
              isCosmicMode
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition-colors relative overflow-hidden`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-white/20"
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">
              {isGenerating ? 'Quantum Computing...' : 'Generate Future Self'}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}; 