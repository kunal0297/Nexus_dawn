import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export const CosmicModeToggle: React.FC = () => {
  const { isCosmicMode, toggleCosmicMode } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleCosmicMode}
      className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 ${
        isCosmicMode ? 'bg-purple-600' : 'bg-gray-300'
      }`}
      aria-label={isCosmicMode ? 'Disable cosmic mode' : 'Enable cosmic mode'}
    >
      <motion.div
        className="w-6 h-6 rounded-full bg-white shadow-lg"
        animate={{
          x: isCosmicMode ? 32 : 0,
          rotate: isCosmicMode ? 360 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {isCosmicMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="text-xs">✨</span>
          </motion.div>
        )}
      </motion.div>
      
      <motion.div
        className="absolute inset-0 flex items-center justify-between px-2 text-xs"
        initial={false}
        animate={{
          opacity: isCosmicMode ? 0 : 1,
        }}
      >
        <span>🌙</span>
        <span>☀️</span>
      </motion.div>
    </motion.button>
  );
}; 