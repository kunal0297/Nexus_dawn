import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TavusCVI } from '@tavus/cvi-sdk';
import { useTheme } from '../contexts/ThemeContext';

interface Props {
  message: string;
  emotion: 'happy' | 'sad' | 'angry' | 'fearful' | 'neutral';
}

const COSMIC_STYLES = {
  normal: {
    style: 'narrative',
    voiceSettings: {
      stability: 0.5,
      similarity_boost: 0.75
    }
  },
  cosmic: {
    style: 'cosmic',
    voiceSettings: {
      stability: 0.3,
      similarity_boost: 0.5,
      style: 0.8,
      use_speaker_boost: true
    }
  }
};

export const CosmicAvatar: React.FC<Props> = ({ message, emotion }) => {
  const { isCosmicMode, cosmicLevel } = useTheme();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number }>>([]);

  useEffect(() => {
    // Generate cosmic particles
    const newParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1
    }));
    setParticles(newParticles);
  }, [isCosmicMode]);

  useEffect(() => {
    const tavus = new TavusCVI({
      apiKey: process.env.REACT_APP_TAVUS_API_KEY || '',
      modelId: process.env.REACT_APP_TAVUS_MODEL_ID || ''
    });

    const speak = async () => {
      try {
        setIsSpeaking(true);
        
        const style = isCosmicMode ? COSMIC_STYLES.cosmic : COSMIC_STYLES.normal;
        
        // Generate avatar video with cosmic effects
        const videoResponse = await tavus.generateVideo({
          prompt: message,
          style: style.style,
          emotion,
          effects: isCosmicMode ? {
            cosmic: true,
            intensity: cosmicLevel / 100,
            particleDensity: 0.5
          } : undefined
        });

        setAvatarUrl(videoResponse.url);

        // Speak with modulated voice
        await tavus.speak(message, {
          emotion,
          style: style.style,
          voiceSettings: style.voiceSettings
        });
      } catch (error) {
        console.error('Error with cosmic avatar:', error);
      } finally {
        setIsSpeaking(false);
      }
    };

    speak();
  }, [message, emotion, isCosmicMode, cosmicLevel]);

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden">
      <AnimatePresence>
        {isCosmicMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/20"
          >
            {particles.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-purple-500/30"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {isSpeaking && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      )}
      
      {avatarUrl && (
        <video
          src={avatarUrl}
          autoPlay
          loop
          muted
          className={`w-full h-full object-cover ${
            isCosmicMode ? 'filter hue-rotate-30 contrast-125' : ''
          }`}
        />
      )}
    </div>
  );
}; 