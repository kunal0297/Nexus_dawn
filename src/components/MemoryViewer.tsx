import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { MemoryEntry, MemoryMood, MemoryFilter } from '../types/memories';
import { memoryService } from '../services/MemoryService';

const MemoryViewer: React.FC = () => {
  const { isCosmicMode } = useTheme();
  const [memories, setMemories] = useState<MemoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<MemoryFilter>({});
  const [selectedMood, setSelectedMood] = useState<MemoryMood | ''>('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadMemories();
  }, [filter]);

  const loadMemories = async () => {
    try {
      setLoading(true);
      const data = await memoryService.getMemories(filter);
      setMemories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load memories');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (memoryId: string) => {
    try {
      await memoryService.deleteMemory(memoryId);
      setMemories(prev => prev.filter(m => m.id !== memoryId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete memory');
    }
  };

  const handleFilterChange = (newFilter: Partial<MemoryFilter>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      className={`p-6 rounded-lg shadow-lg ${
        isCosmicMode ? 'bg-purple-900/20' : 'bg-white'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Memory Archive
        </h2>
        <div className="flex space-x-4">
          <select
            value={selectedMood}
            onChange={e => {
              const mood = e.target.value as MemoryMood | '';
              setSelectedMood(mood);
              handleFilterChange({ mood: mood || undefined });
            }}
            className={`p-2 rounded-lg border ${
              isCosmicMode
                ? 'bg-purple-900/10 border-purple-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            aria-label="Filter by mood"
          >
            <option value="">All Moods</option>
            {Object.values(MemoryMood).map(mood => (
              <option key={mood} value={mood}>
                {mood.charAt(0).toUpperCase() + mood.slice(1)}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              handleFilterChange({ searchQuery: e.target.value });
            }}
            placeholder="Search memories..."
            className={`p-2 rounded-lg border ${
              isCosmicMode
                ? 'bg-purple-900/10 border-purple-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            aria-label="Search memories"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter.mood || 'all'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-4"
        >
          {memories.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              No memories found
            </div>
          ) : (
            memories.map(memory => (
              <motion.div
                key={memory.id}
                className={`p-4 rounded-lg ${
                  isCosmicMode
                    ? 'bg-purple-900/30'
                    : 'bg-purple-50'
                }`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-purple-600 dark:text-purple-400">
                    {new Date(memory.timestamp).toLocaleString()}
                  </div>
                  <button
                    onClick={() => handleDelete(memory.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Delete memory"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-gray-900 dark:text-white mb-2">
                  {memory.encryptedContent}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    isCosmicMode
                      ? 'bg-purple-800/50 text-purple-200'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {memory.mood}
                  </span>
                  {memory.tags.map(tag => (
                    <span
                      key={tag}
                      className={`px-2 py-1 rounded text-xs ${
                        isCosmicMode
                          ? 'bg-purple-800/50 text-purple-200'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {memory.metadata.location && (
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    📍 {memory.metadata.location}
                  </div>
                )}
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  DNA: {memory.dnaSequence}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default MemoryViewer; 