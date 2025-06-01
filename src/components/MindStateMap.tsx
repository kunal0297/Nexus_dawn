import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface EmotionData {
  emotion: string;
  value: number;
}

interface MindStateMapProps {
  initialData?: EmotionData[];
  onEmotionChange?: (emotion: string, value: number) => void;
}

const defaultEmotions: EmotionData[] = [
  { emotion: 'Joy', value: 50 },
  { emotion: 'Sadness', value: 30 },
  { emotion: 'Anger', value: 20 },
  { emotion: 'Fear', value: 40 },
  { emotion: 'Trust', value: 60 },
  { emotion: 'Surprise', value: 25 },
  { emotion: 'Anticipation', value: 45 },
  { emotion: 'Disgust', value: 15 }
];

export const MindStateMap: React.FC<MindStateMapProps> = ({ 
  initialData = defaultEmotions,
  onEmotionChange 
}) => {
  const { isCosmicMode } = useTheme();
  const [emotionData, setEmotionData] = useState<EmotionData[]>(initialData);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const handleEmotionClick = (emotion: string) => {
    setSelectedEmotion(emotion);
  };

  const handleValueChange = (emotion: string, newValue: number) => {
    const updatedData = emotionData.map(item => 
      item.emotion === emotion ? { ...item, value: newValue } : item
    );
    setEmotionData(updatedData);
    onEmotionChange?.(emotion, newValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-6 rounded-xl ${
        isCosmicMode 
          ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50' 
          : 'bg-white dark:bg-gray-800'
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Mind State Map
      </h2>
      
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius={150} data={emotionData}>
            <PolarGrid 
              stroke={isCosmicMode ? '#6366f1' : '#e5e7eb'} 
              strokeDasharray="3 3"
            />
            <PolarAngleAxis 
              dataKey="emotion" 
              tick={{ fill: isCosmicMode ? '#a5b4fc' : '#4b5563' }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: isCosmicMode ? '#a5b4fc' : '#4b5563' }}
            />
            <Radar
              name="Emotions"
              dataKey="value"
              stroke={isCosmicMode ? '#818cf8' : '#6366f1'}
              fill={isCosmicMode ? '#818cf8' : '#6366f1'}
              fillOpacity={0.6}
              onClick={(data: any) => handleEmotionClick(data.emotion)}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {selectedEmotion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
        >
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
            {selectedEmotion}
          </h3>
          <input
            type="range"
            min="0"
            max="100"
            value={emotionData.find(e => e.emotion === selectedEmotion)?.value || 0}
            onChange={(e) => handleValueChange(selectedEmotion, parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            aria-label={`Adjust ${selectedEmotion} value`}
            title={`Adjust ${selectedEmotion} value`}
          />
        </motion.div>
      )}
    </motion.div>
  );
}; 