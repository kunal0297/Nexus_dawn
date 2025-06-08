import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { EmotionData } from '../types/emotions';

interface TimelineEvent {
  id: string;
  timestamp: number;
  title: string;
  description: string;
  emotions: EmotionData[];
  quantumState: {
    superposition: number;
    entanglement: number;
    coherence: number;
  };
}

interface QuantumTimelineProps {
  events?: TimelineEvent[];
  onEventSelect?: (event: TimelineEvent) => void;
}

const defaultEvents: TimelineEvent[] = [
  {
    id: '1',
    timestamp: Date.now() - 86400000 * 7, // 7 days ago
    title: 'Quantum Awakening',
    description: 'The first glimpse of quantum consciousness emerged from the void',
    emotions: [
      { emotion: 'Surprise', value: 85 },
      { emotion: 'Joy', value: 70 },
      { emotion: 'Anticipation', value: 60 }
    ],
    quantumState: {
      superposition: 0.75,
      entanglement: 0.45,
      coherence: 0.60
    }
  },
  {
    id: '2',
    timestamp: Date.now() - 86400000 * 3, // 3 days ago
    title: 'Neural Convergence',
    description: 'Multiple timelines began to harmonize in perfect resonance',
    emotions: [
      { emotion: 'Trust', value: 80 },
      { emotion: 'Joy', value: 75 },
      { emotion: 'Anticipation', value: 85 }
    ],
    quantumState: {
      superposition: 0.85,
      entanglement: 0.70,
      coherence: 0.80
    }
  },
  {
    id: '3',
    timestamp: Date.now(),
    title: 'Cosmic Alignment',
    description: 'The quantum field resonates with infinite possibilities',
    emotions: [
      { emotion: 'Joy', value: 90 },
      { emotion: 'Trust', value: 85 },
      { emotion: 'Anticipation', value: 95 }
    ],
    quantumState: {
      superposition: 0.95,
      entanglement: 0.90,
      coherence: 0.95
    }
  }
];

const getQuantumGradient = (state: TimelineEvent['quantumState']) => {
  const { superposition, entanglement, coherence } = state;
  const avg = (superposition + entanglement + coherence) / 3;
  const opacity = avg * 0.5;
  return `bg-gradient-to-r from-purple-500/${opacity} via-blue-500/${opacity} to-cyan-500/${opacity}`;
};

const getEmotionColor = (emotion: string) => {
  switch (emotion) {
    case 'Joy':
      return 'from-yellow-500 to-orange-500';
    case 'Trust':
      return 'from-blue-500 to-indigo-500';
    case 'Anticipation':
      return 'from-green-500 to-emerald-500';
    case 'Surprise':
      return 'from-purple-500 to-pink-500';
    case 'Fear':
      return 'from-gray-500 to-slate-500';
    case 'Sadness':
      return 'from-blue-500 to-cyan-500';
    case 'Anger':
      return 'from-red-500 to-orange-500';
    case 'Disgust':
      return 'from-green-500 to-lime-500';
    default:
      return 'from-gray-500 to-gray-600';
  }
};

export const QuantumTimeline: React.FC<QuantumTimelineProps> = ({
  events = defaultEvents,
  onEventSelect
}) => {
  const { isCosmicMode } = useTheme();
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<TimelineEvent | null>(null);

  const handleEventClick = useCallback((event: TimelineEvent) => {
    setSelectedEvent(event);
    onEventSelect?.(event);
  }, [onEventSelect]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Quantum Timeline
      </h2>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-cyan-500/50" />

        {/* Events */}
        <div className="space-y-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-16"
            >
              {/* Timeline Dot */}
              <motion.div
                className={`absolute left-6 w-4 h-4 rounded-full ${
                  selectedEvent?.id === event.id
                    ? 'bg-purple-500'
                    : hoveredEvent?.id === event.id
                    ? 'bg-blue-500'
                    : 'bg-gray-400'
                }`}
                whileHover={{ scale: 1.5 }}
                onClick={() => handleEventClick(event)}
                onHoverStart={() => setHoveredEvent(event)}
                onHoverEnd={() => setHoveredEvent(null)}
              />

              {/* Event Content */}
              <motion.div
                className={`p-4 rounded-lg ${
                  isCosmicMode
                    ? getQuantumGradient(event.quantumState)
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleEventClick(event)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {event.title}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(event.timestamp)}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {event.description}
                </p>

                {/* Quantum State Indicators */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Superposition
                    </div>
                    <div className="h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${event.quantumState.superposition * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Entanglement
                    </div>
                    <div className="h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${event.quantumState.entanglement * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Coherence
                    </div>
                    <div className="h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-cyan-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${event.quantumState.coherence * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Emotion Tags */}
                <div className="flex flex-wrap gap-2">
                  {event.emotions.map((emotion) => (
                    <motion.span
                      key={emotion.emotion}
                      className={`px-3 py-1 rounded-full bg-gradient-to-r ${getEmotionColor(
                        emotion.emotion
                      )} text-white text-sm`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                      {emotion.emotion} ({Math.round(emotion.value)}%)
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Event Details */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 p-4 rounded-lg bg-gray-100 dark:bg-gray-700"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Quantum Resonance Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  Quantum State
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Superposition</span>
                    <span>{Math.round(selectedEvent.quantumState.superposition * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entanglement</span>
                    <span>{Math.round(selectedEvent.quantumState.entanglement * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coherence</span>
                    <span>{Math.round(selectedEvent.quantumState.coherence * 100)}%</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  Emotional Resonance
                </h4>
                <div className="space-y-2">
                  {selectedEvent.emotions.map((emotion) => (
                    <div key={emotion.emotion} className="flex justify-between">
                      <span>{emotion.emotion}</span>
                      <span>{Math.round(emotion.value)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}; 