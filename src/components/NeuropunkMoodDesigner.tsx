import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { EmotionData, EmotionType } from '../types/emotions';

interface MoodPreset {
  id: string;
  name: string;
  emotions: EmotionData[];
  description: string;
}

interface MoodDesignerProps {
  onMoodChange?: (emotions: EmotionData[]) => void;
  initialEmotions?: EmotionData[];
}

const defaultPresets: MoodPreset[] = [
  {
    id: 'euphoria',
    name: 'Cosmic Euphoria',
    description: 'A state of pure joy and wonder',
    emotions: [
      { emotion: 'Joy', value: 90 },
      { emotion: 'Trust', value: 80 },
      { emotion: 'Anticipation', value: 70 },
      { emotion: 'Surprise', value: 60 },
      { emotion: 'Fear', value: 10 },
      { emotion: 'Sadness', value: 5 },
      { emotion: 'Anger', value: 5 },
      { emotion: 'Disgust', value: 5 }
    ]
  },
  {
    id: 'serenity',
    name: 'Quantum Serenity',
    description: 'Deep peace and trust',
    emotions: [
      { emotion: 'Trust', value: 85 },
      { emotion: 'Joy', value: 70 },
      { emotion: 'Anticipation', value: 40 },
      { emotion: 'Fear', value: 20 },
      { emotion: 'Sadness', value: 15 },
      { emotion: 'Anger', value: 10 },
      { emotion: 'Surprise', value: 30 },
      { emotion: 'Disgust', value: 5 }
    ]
  },
  {
    id: 'focus',
    name: 'Neural Focus',
    description: 'Sharp concentration and clarity',
    emotions: [
      { emotion: 'Anticipation', value: 75 },
      { emotion: 'Trust', value: 60 },
      { emotion: 'Joy', value: 40 },
      { emotion: 'Fear', value: 30 },
      { emotion: 'Surprise', value: 20 },
      { emotion: 'Sadness', value: 15 },
      { emotion: 'Anger', value: 10 },
      { emotion: 'Disgust', value: 5 }
    ]
  }
];

const EmotionKnob: React.FC<{
  emotion: EmotionData;
  onChange: (value: number) => void;
  isActive: boolean;
}> = ({ emotion, onChange, isActive }) => {
  const { isCosmicMode } = useTheme();
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const y = e.clientY - rect.top;
    const value = Math.max(0, Math.min(100, 100 - (y / rect.height) * 100));
    onChange(value);
  }, [isDragging, onChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  return (
    <motion.div
      className={`relative w-16 h-32 rounded-lg ${
        isCosmicMode
          ? 'bg-gradient-to-b from-purple-900/50 to-blue-900/50'
          : 'bg-gray-800'
      } p-2`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className="absolute inset-0 cursor-pointer"
        onMouseDown={handleMouseDown}
      />
      <div className="h-full flex flex-col items-center justify-between">
        <span className="text-xs text-gray-400">{emotion.emotion}</span>
        <div className="relative w-8 h-8">
          <div
            className={`absolute inset-0 rounded-full ${
              isActive
                ? isCosmicMode
                  ? 'bg-purple-500'
                  : 'bg-blue-500'
                : 'bg-gray-600'
            }`}
            style={{
              transform: `rotate(${(emotion.value / 100) * 270}deg)`,
            }}
          />
        </div>
        <span className="text-xs text-gray-400">{Math.round(emotion.value)}%</span>
      </div>
    </motion.div>
  );
};

export const NeuropunkMoodDesigner: React.FC<MoodDesignerProps> = ({
  onMoodChange,
  initialEmotions = defaultPresets[0].emotions,
}) => {
  const { isCosmicMode } = useTheme();
  const [emotions, setEmotions] = useState<EmotionData[]>(initialEmotions);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isPresetMenuOpen, setIsPresetMenuOpen] = useState(false);

  useEffect(() => {
    onMoodChange?.(emotions);
  }, [emotions, onMoodChange]);

  const handleEmotionChange = useCallback((emotion: string, value: number) => {
    setEmotions(prev =>
      prev.map(e => (e.emotion === emotion ? { ...e, value } : e))
    );
  }, []);

  const handlePresetSelect = useCallback((preset: MoodPreset) => {
    setEmotions(preset.emotions);
    setSelectedPreset(preset.id);
    setIsPresetMenuOpen(false);
  }, []);

  const handleSavePreset = useCallback(() => {
    const name = prompt('Enter preset name:');
    if (!name) return;

    const newPreset: MoodPreset = {
      id: `preset-${Date.now()}`,
      name,
      description: 'Custom preset',
      emotions: [...emotions],
    };

    defaultPresets.push(newPreset);
    setSelectedPreset(newPreset.id);
  }, [emotions]);

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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Neuropunk Mood Designer
        </h2>
        <div className="relative">
          <button
            onClick={() => setIsPresetMenuOpen(!isPresetMenuOpen)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {selectedPreset
              ? defaultPresets.find(p => p.id === selectedPreset)?.name
              : 'Select Preset'}
          </button>
          <AnimatePresence>
            {isPresetMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-10"
              >
                {defaultPresets.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetSelect(preset)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
                  >
                    {preset.name}
                  </button>
                ))}
                <button
                  onClick={handleSavePreset}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 text-purple-600 dark:text-purple-400 border-t border-gray-200 dark:border-gray-600"
                >
                  Save Current as Preset
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {emotions.map(emotion => (
          <EmotionKnob
            key={emotion.emotion}
            emotion={emotion}
            onChange={(value) => handleEmotionChange(emotion.emotion, value)}
            isActive={emotion.value > 0}
          />
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
          Current Mood State
        </h3>
        <div className="space-y-2">
          {emotions
            .filter(e => e.value > 0)
            .sort((a, b) => b.value - a.value)
            .map(emotion => (
              <div
                key={emotion.emotion}
                className="flex items-center justify-between"
              >
                <span className="text-gray-600 dark:text-gray-300">
                  {emotion.emotion}
                </span>
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${
                      isCosmicMode ? 'bg-purple-500' : 'bg-blue-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${emotion.value}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="text-gray-600 dark:text-gray-300 w-12 text-right">
                  {Math.round(emotion.value)}%
                </span>
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}; 