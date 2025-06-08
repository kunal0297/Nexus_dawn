import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { EncryptionService } from '../services/encryption';
import { SanitizationService } from '../services/sanitization';
import { env } from '../config/env.validation';

interface EmotionalResonanceProps {
  valence: number;
  arousal: number;
  dominance: number;
  onEmotionalChange?: (emotions: { valence: number; arousal: number; dominance: number }) => void;
  cosmicMode?: boolean;
}

export const EmotionalResonance: React.FC<EmotionalResonanceProps> = ({
  valence,
  arousal,
  dominance,
  onEmotionalChange,
  cosmicMode = false
}) => {
  const controls = useAnimation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const dimensionsRef = useRef({ width: 0, height: 0 });

  // Clamp values between 0 and 1
  const clampedValence = Math.max(0, Math.min(1, valence));
  const clampedArousal = Math.max(0, Math.min(1, arousal));
  const clampedDominance = Math.max(0, Math.min(1, dominance));

  // Initialize canvas and handle resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateDimensions = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      dimensionsRef.current = { width, height };
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    const draw = () => {
      if (!canvas || !dimensionsRef.current) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { width, height } = dimensionsRef.current;
      ctx.clearRect(0, 0, width, height);

      // Draw emotional resonance visualization
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.4;

      // Draw base circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = cosmicMode ? '#FF00FF' : '#4ECDC4';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw emotional resonance waves
      const time = Date.now() * 0.001;
      const waveCount = 3;
      const waveAmplitude = radius * 0.2;

      for (let i = 0; i < waveCount; i++) {
        const waveOffset = (i / waveCount) * Math.PI * 2;
        const waveRadius = radius + Math.sin(time + waveOffset) * waveAmplitude;

        ctx.beginPath();
        ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
        ctx.strokeStyle = cosmicMode ? '#00FFFF' : '#FF6B6B';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw emotional state indicators
      const emotions = ['valence', 'arousal', 'dominance'] as const;
      emotions.forEach((emotion, index) => {
        const angle = (index / emotions.length) * Math.PI * 2;
        const value = emotion === 'valence' ? clampedValence : emotion === 'arousal' ? clampedArousal : clampedDominance;
        const indicatorRadius = radius * value;
        const x = centerX + Math.cos(angle) * indicatorRadius;
        const y = centerY + Math.sin(angle) * indicatorRadius;
        const size = clampedDominance * 20 + 10;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = cosmicMode ? '#FF00FF' : '#4ECDC4';
        ctx.fill();
      });
    };

    const animate = (currentTime: number) => {
      draw();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [clampedValence, clampedArousal, clampedDominance, cosmicMode]);

  // Animate emotional state changes
  useEffect(() => {
    controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.5 }
    });
  }, [clampedValence, clampedArousal, clampedDominance, controls]);

  return (
    <motion.div
      data-testid="emotional-resonance"
      className={`relative w-full h-64 rounded-lg overflow-hidden ${
        cosmicMode
          ? 'cosmic-mode bg-gradient-to-br from-purple-900/50 to-blue-900/50'
          : 'bg-white shadow-lg'
      }`}
      animate={controls}
    >
      <canvas
        ref={canvasRef}
        data-testid="emotional-canvas"
        className="absolute inset-0 w-full h-full"
        style={{ filter: cosmicMode ? 'blur(0.5px)' : 'none' }}
      />
      <div
        className={`absolute inset-0 flex items-center justify-center ${
          cosmicMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Emotional Resonance</h3>
          <p className="text-sm opacity-75">
            {cosmicMode
              ? 'Quantum emotional patterns detected'
              : 'Current emotional state visualization'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}; 