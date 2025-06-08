import React from 'react';
import { motion } from 'framer-motion';
import { PersonalityEvolution } from '../types/personality';
import { useTheme } from '../contexts/ThemeContext';

interface PersonalityEvolutionChartProps {
  evolution: PersonalityEvolution;
}

export const PersonalityEvolutionChart: React.FC<PersonalityEvolutionChartProps> = ({ evolution }) => {
  const { isCosmicMode } = useTheme();

  const getColorForChange = (change: number) => {
    if (change > 10) return 'text-green-500';
    if (change < -10) return 'text-red-500';
    return 'text-yellow-500';
  };

  const getBarColor = (dimension: string) => {
    const colors = {
      openness: 'bg-blue-500',
      conscientiousness: 'bg-purple-500',
      extraversion: 'bg-green-500',
      agreeableness: 'bg-yellow-500',
      neuroticism: 'bg-red-500',
    };
    return colors[dimension as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl ${
        isCosmicMode
          ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50'
          : 'bg-white dark:bg-gray-800'
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Personality Evolution
      </h2>

      <div className="space-y-6">
        {evolution.changes.map((change, index) => (
          <motion.div
            key={change.dimension}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300 capitalize">
                {change.dimension}
              </span>
              <span className={`font-semibold ${getColorForChange(change.percentageChange)}`}>
                {change.percentageChange > 0 ? '+' : ''}
                {change.percentageChange.toFixed(1)}%
              </span>
            </div>

            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="relative h-full">
                <div
                  className={`absolute h-full ${getBarColor(change.dimension)} opacity-50`}
                  style={{ width: `${change.oldValue * 100}%` }}
                />
                <motion.div
                  className={`absolute h-full ${getBarColor(change.dimension)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${change.newValue * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Previous: {(change.oldValue * 100).toFixed(0)}%</span>
              <span>Current: {(change.newValue * 100).toFixed(0)}%</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Key Changes
        </h3>
        <ul className="space-y-2">
          {evolution.changes
            .filter(change => Math.abs(change.percentageChange) > 5)
            .map(change => (
              <li
                key={change.dimension}
                className={`text-sm ${getColorForChange(change.percentageChange)}`}
              >
                {change.dimension}: {change.percentageChange > 0 ? 'Increased' : 'Decreased'} by{' '}
                {Math.abs(change.percentageChange).toFixed(1)}%
              </li>
            ))}
        </ul>
      </div>
    </motion.div>
  );
}; 