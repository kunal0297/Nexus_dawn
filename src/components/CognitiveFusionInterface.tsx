import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { DAWNVoice } from './DAWNVoice';
import { MindStateMap } from './MindStateMap';
import LoadingSpinner from './ui/LoadingSpinner';
import { EmpatheticAIService } from '../services/EmpatheticAI';
import { EmotionData } from '../types/emotions';

interface FusionResponse {
  text: string;
  emotion: string;
  intensity: number;
  timestamp: Date;
  suggestions?: string[];
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

export const CognitiveFusionInterface: React.FC = () => {
  const { isCosmicMode } = useTheme();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentEmotions, setCurrentEmotions] = useState<EmotionData[]>(defaultEmotions);
  const [voiceInput, setVoiceInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [responses, setResponses] = useState<FusionResponse[]>([]);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const handleEmotionChange = useCallback((emotion: string, value: number) => {
    setCurrentEmotions(prev => 
      prev.map(e => e.emotion === emotion ? { ...e, value } : e)
    );
  }, []);

  const handleVoiceInput = useCallback((text: string) => {
    setVoiceInput(text);
  }, []);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setSelectedSuggestion(suggestion);
    setTextInput(suggestion);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!textInput.trim() && !voiceInput.trim()) return;
    
    setIsProcessing(true);
    
    try {
      // Combine text and voice inputs
      const combinedInput = `${textInput} ${voiceInput}`.trim();
      
      // Generate empathetic response
      const aiService = EmpatheticAIService.getInstance();
      const response = await aiService.generateResponse(combinedInput, currentEmotions);
      
      setResponses(prev => [{
        ...response,
        timestamp: new Date()
      }, ...prev]);
      
      setTextInput('');
      setVoiceInput('');
      setSelectedSuggestion(null);
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [textInput, voiceInput, currentEmotions]);

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
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Cognitive Fusion Interface
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Emotion and Voice Input */}
        <div className="space-y-6">
          <MindStateMap
            initialData={currentEmotions}
            onEmotionChange={handleEmotionChange}
          />
          
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Voice Input
            </h3>
            <DAWNVoice
              onCommand={handleVoiceInput}
              isListening={isVoiceListening}
              onListeningChange={setIsVoiceListening}
            />
            {voiceInput && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-gray-600 dark:text-gray-300"
              >
                {voiceInput}
              </motion.p>
            )}
          </div>
        </div>

        {/* Right Column: Text Input and Responses */}
        <div className="space-y-6">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Text Input
            </h3>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full h-32 p-3 rounded-lg bg-white dark:bg-gray-600 text-gray-800 dark:text-white resize-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Oracle's Response
            </h3>
            <div className="space-y-4">
              <AnimatePresence>
                {responses.map((response) => (
                  <motion.div
                    key={response.timestamp.getTime()}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-4 bg-white dark:bg-gray-600 rounded-lg shadow-sm"
                  >
                    <p className="text-gray-800 dark:text-white">{response.text}</p>
                    <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="mr-2">Emotion: {response.emotion}</span>
                      <span>Intensity: {response.intensity}%</span>
                    </div>
                    {response.suggestions && response.suggestions.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Suggestions:</p>
                        <div className="flex flex-wrap gap-2">
                          {response.suggestions.map((suggestion, index) => (
                            <motion.button
                              key={index}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className={`px-3 py-1 text-sm rounded-full ${
                                selectedSuggestion === suggestion
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-gray-200 dark:bg-gray-500 text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {suggestion}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={isProcessing || (!textInput.trim() && !voiceInput.trim())}
          className={`px-6 py-3 rounded-lg font-semibold ${
            isCosmicMode
              ? 'bg-purple-600 hover:bg-purple-700'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isProcessing ? (
            <div className="flex items-center">
              <LoadingSpinner size="sm" />
              <span className="ml-2">Processing...</span>
            </div>
          ) : (
            'Fuse & Connect'
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}; 