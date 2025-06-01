import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { MemoryFormData, MemoryMood } from '../types/memories';
import { memoryService } from '../services/MemoryService';

const MemoryComposer: React.FC = () => {
  const { isCosmicMode } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<MemoryFormData>({
    content: '',
    mood: MemoryMood.REFLECTIVE,
    tags: [],
    metadata: {
      intensity: 50
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await memoryService.storeMemory(formData);
      setFormData({
        content: '',
        mood: MemoryMood.REFLECTIVE,
        tags: [],
        metadata: {
          intensity: 50
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to store memory');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
        e.currentTarget.value = '';
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <motion.div
      className={`p-6 rounded-lg shadow-lg ${
        isCosmicMode ? 'bg-purple-900/20' : 'bg-white'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Record Memory
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Memory
          </label>
          <textarea
            value={formData.content}
            onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
            className={`w-full p-3 rounded-lg border ${
              isCosmicMode
                ? 'bg-purple-900/10 border-purple-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Mood
          </label>
          <select
            value={formData.mood}
            onChange={e => setFormData(prev => ({ ...prev, mood: e.target.value as MemoryMood }))}
            className={`w-full p-3 rounded-lg border ${
              isCosmicMode
                ? 'bg-purple-900/10 border-purple-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            {Object.values(MemoryMood).map(mood => (
              <option key={mood} value={mood}>
                {mood.charAt(0).toUpperCase() + mood.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags
          </label>
          <input
            type="text"
            onKeyDown={handleTagInput}
            placeholder="Press Enter to add tags"
            className={`w-full p-3 rounded-lg border ${
              isCosmicMode
                ? 'bg-purple-900/10 border-purple-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map(tag => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-sm ${
                  isCosmicMode
                    ? 'bg-purple-800/50 text-purple-200'
                    : 'bg-purple-100 text-purple-800'
                }`}
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 hover:text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Intensity
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.metadata.intensity}
            onChange={e => setFormData(prev => ({
              ...prev,
              metadata: { ...prev.metadata, intensity: Number(e.target.value) }
            }))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location (optional)
          </label>
          <input
            type="text"
            value={formData.metadata.location || ''}
            onChange={e => setFormData(prev => ({
              ...prev,
              metadata: { ...prev.metadata, location: e.target.value }
            }))}
            className={`w-full p-3 rounded-lg border ${
              isCosmicMode
                ? 'bg-purple-900/10 border-purple-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            placeholder="Where were you?"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-medium ${
            isCosmicMode
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          } disabled:opacity-50`}
        >
          {isSubmitting ? 'Storing...' : 'Store Memory'}
        </button>
      </form>
    </motion.div>
  );
};

export default MemoryComposer; 