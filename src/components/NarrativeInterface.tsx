import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNarrative } from '../contexts/NarrativeContext';
import { useTheme } from '../contexts/ThemeContext';
import NarrativeTimeline from './NarrativeTimeline';
import { CosmicAvatar } from './CosmicAvatar';
import { ThemeToggle } from './ThemeToggle';

const NarrativeInterface: React.FC = () => {
  const { state, loading, error, makeChoice, resetNarrative } = useNarrative();
  const { isCosmicMode } = useTheme();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!state) return null;

  const currentFork = state.forks.find(fork => fork.id === state.currentForkId);
  if (!currentFork) return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <ThemeToggle />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Story Section */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isCosmicMode ? 'Cosmic Journey' : 'Your Story'}
              </h2>
              <button
                onClick={resetNarrative}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Reset Story
              </button>
            </div>

            <div className="mb-8">
              <CosmicAvatar
                message={currentFork.description}
                emotion={currentFork.description.toLowerCase().includes('happy') ? 'happy' : 'neutral'}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentFork.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {currentFork.description}
                </p>

                <div className="space-y-3">
                  {currentFork.choices.map(choice => (
                    <motion.button
                      key={choice.id}
                      onClick={() => makeChoice(choice)}
                      className={`w-full p-4 rounded-lg text-left transition-colors ${
                        isCosmicMode
                          ? 'bg-purple-900/20 hover:bg-purple-900/30'
                          : 'bg-purple-50 hover:bg-purple-100'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="font-medium text-purple-900 dark:text-purple-300">
                        {choice.text}
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">
                        {choice.impact}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Timeline Section */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Timeline
            </h2>
            <div className="h-[600px]">
              <NarrativeTimeline />
            </div>
          </motion.div>
        </div>

        {/* World State Section */}
        <motion.div
          className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Current World State
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(state.worldState).map(([key, value]) => (
              <motion.div
                key={key}
                className={`p-4 rounded-lg ${
                  isCosmicMode
                    ? 'bg-purple-900/20'
                    : 'bg-purple-50'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-sm font-medium text-purple-900 dark:text-purple-300">
                  {key}
                </div>
                <div className="text-lg text-purple-700 dark:text-purple-400">
                  {value}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NarrativeInterface; 