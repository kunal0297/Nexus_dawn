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

interface MindStateMapProps {
  memories: Memory[];
  storyChoices: StoryChoice[];
}

// Psychological traits for the radial chart
const PSYCHOLOGICAL_TRAITS = [
  'Fear',
  'Hope',
  'Curiosity',
  'Trust',
  'Control',
  'Connection'
] as const;

type PsychologicalTrait = typeof PSYCHOLOGICAL_TRAITS[number];

interface TimelineDataPoint {
  timestamp: Date;
  type: 'memory' | 'choice';
  mood?: string;
  intensity?: number;
  content?: string;
  impact?: number;
  description?: string;
}

interface RadarDataPoint {
  [key: string]: number;
}

const MindStateMap: React.FC<MindStateMapProps> = ({ memories = [], storyChoices = [] }) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'radar'>('timeline');
  const [timelineData, setTimelineData] = useState<TimelineDataPoint[]>([]);
  const [radarData, setRadarData] = useState<RadarDataPoint[]>([]);

  useEffect(() => {
    // Process memories and choices into timeline data
    const processedData = processTimelineData(memories, storyChoices);
    setTimelineData(processedData);

    // Process data for radar chart
    const processedRadarData = processRadarData(memories);
    setRadarData(processedRadarData);
  }, [memories, storyChoices]);

  const processTimelineData = (memories: Memory[], choices: StoryChoice[]): TimelineDataPoint[] => {
    const combinedData = [
      ...memories.map(memory => ({
        timestamp: new Date(memory.timestamp),
        type: 'memory' as const,
        mood: memory.mood,
        intensity: memory.intensity,
        content: memory.content
      })),
      ...choices.map(choice => ({
        timestamp: new Date(choice.timestamp),
        type: 'choice' as const,
        impact: choice.impact,
        description: choice.description
      }))
    ].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    return combinedData;
  };

  const processRadarData = (memories: Memory[]): RadarDataPoint[] => {
    // Calculate average values for each psychological trait
    const traitValues = PSYCHOLOGICAL_TRAITS.map(trait => {
      const values = memories.map(memory => {
        // Map mood and intensity to trait values
        const moodMap: Record<string, Record<PsychologicalTrait, number>> = {
          'happy': { Hope: 0.8, Fear: 0.2, Curiosity: 0.6, Trust: 0.7, Control: 0.6, Connection: 0.8 },
          'sad': { Hope: 0.3, Fear: 0.4, Curiosity: 0.5, Trust: 0.4, Control: 0.3, Connection: 0.6 },
          'angry': { Hope: 0.4, Fear: 0.3, Curiosity: 0.7, Trust: 0.2, Control: 0.8, Connection: 0.4 },
          'fearful': { Hope: 0.2, Fear: 0.9, Curiosity: 0.8, Trust: 0.3, Control: 0.2, Connection: 0.5 },
          'neutral': { Hope: 0.5, Fear: 0.5, Curiosity: 0.5, Trust: 0.5, Control: 0.5, Connection: 0.5 }
        };

        const baseValue = moodMap[memory.mood][trait];
        return baseValue * memory.intensity;
      });

      const average = values.reduce((a, b) => a + b, 0) / values.length;
      return { trait, value: average };
    });

    return [{ ...Object.fromEntries(traitValues.map(t => [t.trait, t.value])) }];
  };

  interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
      payload: TimelineDataPoint;
    }>;
    label?: string;
  }

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-bold">{new Date(label || '').toLocaleString()}</p>
          {data.type === 'memory' ? (
            <>
              <p>Mood: {data.mood}</p>
              <p>Intensity: {data.intensity}</p>
              <p className="text-sm text-gray-600">{data.content}</p>
            </>
          ) : (
            <>
              <p>Choice Impact: {data.impact}</p>
              <p className="text-sm text-gray-600">{data.description}</p>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full p-4">
      <div className="flex justify-center mb-4 space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'timeline'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('timeline')}
        >
          Timeline View
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'radar'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('radar')}
        >
          Psychological Profile
        </motion.button>
      </div>

      <div className="h-[500px] w-full">
        {activeTab === 'timeline' ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="intensity"
                stroke="#8884d8"
                name="Emotional Intensity"
              />
              <Line
                type="monotone"
                dataKey="impact"
                stroke="#82ca9d"
                name="Choice Impact"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="trait" />
              <PolarRadiusAxis angle={30} domain={[0, 1]} />
              <Radar
                name="Psychological Profile"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default MindStateMap; 