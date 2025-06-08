import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { EmotionKnob } from '../components/EmotionKnob';
import { EmotionalResonance } from './EmotionalResonance';
import { useEmotionalState } from '../hooks/useEmotionalState';
import { EmotionalService } from '../services/EmotionalService';
import { EmotionalPreset } from '../types/emotions';
import { ExpandableSection } from './ExpandableSection';

const MOOD_PRESETS: EmotionalPreset[] = [
  EmotionalService.createPreset(
    'quantum-bliss',
    'Quantum Bliss',
    'A state of transcendent joy and cosmic harmony',
    { valence: 0.9, arousal: 0.7, dominance: 0.8 }
  ),
  EmotionalService.createPreset(
    'neural-serenity',
    'Neural Serenity',
    'Deep peace and mental clarity',
    { valence: 0.7, arousal: 0.3, dominance: 0.6 }
  ),
  EmotionalService.createPreset(
    'cyber-focus',
    'Cyber Focus',
    'Enhanced concentration and digital flow',
    { valence: 0.6, arousal: 0.8, dominance: 0.9 }
  ),
  EmotionalService.createPreset(
    'quantum-melancholy',
    'Quantum Melancholy',
    'Profound emotional depth and cosmic awareness',
    { valence: 0.3, arousal: 0.4, dominance: 0.5 }
  ),
  EmotionalService.createPreset(
    'energetic',
    'Energetic',
    'High energy and motivation',
    { valence: 0.8, arousal: 0.9, dominance: 0.7 }
  )
];

export const NeuropunkMoodDesigner: React.FC = () => {
  const { isCosmicMode } = useTheme();
  const [showPresets, setShowPresets] = useState(false);
  
  const {
    emotions,
    resonance,
    handleEmotionChange,
    applyPreset,
    blendWithPreset,
    getEmotionColor
  } = useEmotionalState({
    onEmotionalChange: (state) => {
      console.log('Emotional state changed:', state);
    }
  });

  const handlePresetSelect = useCallback((preset: EmotionalPreset) => {
    applyPreset(preset);
    setShowPresets(false);
  }, [applyPreset]);

  const handleBlend = useCallback(() => {
    const currentPreset = MOOD_PRESETS.find(preset => 
      preset.emotions.valence === emotions.valence &&
      preset.emotions.arousal === emotions.arousal &&
      preset.emotions.dominance === emotions.dominance
    ) || MOOD_PRESETS[0];
    blendWithPreset(currentPreset, 0.5);
  }, [blendWithPreset, emotions]);

  return (
    <div
      data-testid="mood-designer"
      className={`p-6 rounded-lg${isCosmicMode ? ' cosmic-mode bg-gradient-to-br from-purple-900/50 to-blue-900/50' : ' bg-white shadow-lg'}`}
      role="region"
      aria-label="Neuropunk Mood Designer"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${isCosmicMode ? 'text-white' : 'text-gray-900'}`}>
          Neuropunk Mood Designer
        </h2>
        <button
          onClick={() => setShowPresets(!showPresets)}
          className={`px-4 py-2 rounded ${
            isCosmicMode ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-900'
          }`}
          aria-expanded="false"
        >
          {showPresets ? 'Hide Presets' : 'Show Presets'}
        </button>
      </div>

      {showPresets && (
        <div className="mb-6">
          <h3 className="font-bold mb-2">Mood Presets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOOD_PRESETS.map(preset => (
              <motion.button
                key={preset.id}
                onClick={() => handlePresetSelect(preset)}
                className={`p-4 rounded-lg text-left transition-colors ${
                  isCosmicMode
                    ? 'bg-purple-800/50 hover:bg-purple-700/50 text-white'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="font-semibold mb-1">{preset.name}</h3>
                <p className={`text-sm ${isCosmicMode ? 'text-purple-200' : 'text-gray-600'}`}>
                  {preset.description}
                </p>
              </motion.button>
            ))}
          </div>
          <button 
            onClick={handleBlend}
            className="mt-4 px-4 py-2 rounded bg-blue-600 text-white"
          >
            Blend
          </button>
        </div>
      )}

      <div className="space-y-6">
        <EmotionalResonance
          valence={emotions.valence}
          arousal={emotions.arousal}
          dominance={emotions.dominance}
          cosmicMode={isCosmicMode}
        />
        <div className="flex gap-4">
          <div className="flex-1 text-center">
            <span className="block font-bold">Intensity</span>
          </div>
          <div className="flex-1 text-center">
            <span className="block font-bold">Harmony</span>
          </div>
          <div className="flex-1 text-center">
            <span className="block font-bold">Stability</span>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isCosmicMode ? 'text-white' : 'text-gray-700'}`}>
              Valence (Pleasure)
            </label>
            <EmotionKnob
              value={emotions.valence}
              onChange={(value: number) => handleEmotionChange('valence', value)}
              gradient={getEmotionColor('valence')}
              cosmicMode={isCosmicMode}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isCosmicMode ? 'text-white' : 'text-gray-700'}`}>
              Arousal (Energy)
            </label>
            <EmotionKnob
              value={emotions.arousal}
              onChange={(value: number) => handleEmotionChange('arousal', value)}
              gradient={getEmotionColor('arousal')}
              cosmicMode={isCosmicMode}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isCosmicMode ? 'text-white' : 'text-gray-700'}`}>
              Dominance (Control)
            </label>
            <EmotionKnob
              value={emotions.dominance}
              onChange={(value: number) => handleEmotionChange('dominance', value)}
              gradient={getEmotionColor('dominance')}
              cosmicMode={isCosmicMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
