import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import MemoryComposer from '../components/MemoryComposer';
import MemoryViewer from '../components/MemoryViewer';

const MemoryJournalPage: React.FC = () => {
  const { isCosmicMode } = useTheme();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={`text-4xl font-bold ${
            isCosmicMode ? 'text-white' : 'text-gray-900'
          }`}>
            DNA Memory Journal
          </h1>
          <p className={`mt-2 text-lg ${
            isCosmicMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Record and preserve your memories in the cosmic blockchain
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MemoryComposer />
          <MemoryViewer />
        </div>
      </div>
    </div>
  );
};

export default MemoryJournalPage; 