import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import CosmicSignalComposer from '../components/CosmicSignalComposer';
import CosmicSignalViewer from '../components/CosmicSignalViewer';

const CosmicSignalsPage: React.FC = () => {
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
            Cosmic Signals
          </h1>
          <p className={`mt-2 text-lg ${
            isCosmicMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Send and receive encrypted messages across the cosmic void
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CosmicSignalComposer />
          <CosmicSignalViewer />
        </div>
      </div>
    </div>
  );
};

export default CosmicSignalsPage; 