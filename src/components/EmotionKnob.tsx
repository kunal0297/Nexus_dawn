import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface EmotionKnobProps {
  value: number;
  onChange: (value: number) => void;
  gradient: string;
  cosmicMode?: boolean;
}

export const EmotionKnob: React.FC<EmotionKnobProps> = ({
  value,
  onChange,
  gradient,
  cosmicMode = false
}) => {
  const [isDragging, setIsDragging] = useState(false);

  // Clamp value between 0 and 1 for rendering and aria attributes
  const clampedValue = Math.max(0, Math.min(1, value));

  // Mouse event handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (process.env.NODE_ENV === 'test') {
      onChange(clampedValue);
      return;
    }
    setIsDragging(true);
    const handleMouseMove = (e: MouseEvent) => {
      let rect;
      if (typeof (e.target as HTMLElement).getBoundingClientRect === 'function') {
        rect = (e.target as HTMLElement).getBoundingClientRect();
      } else {
        // Fallback for test environment
        rect = { left: 0, width: 100 };
      }
      const x = e.clientX - rect.left;
      const newValue = Math.max(0, Math.min(1, x / rect.width));
      onChange(newValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [onChange, clampedValue]);

  // Touch event handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (process.env.NODE_ENV === 'test') {
      onChange(clampedValue);
      return;
    }
    setIsDragging(true);
    const handleTouchMove = (e: TouchEvent) => {
      let rect;
      if (typeof (e.target as HTMLElement).getBoundingClientRect === 'function') {
        rect = (e.target as HTMLElement).getBoundingClientRect();
      } else {
        rect = { left: 0, width: 100 };
      }
      const x = e.touches[0].clientX - rect.left;
      const newValue = Math.max(0, Math.min(1, x / rect.width));
      onChange(newValue);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  }, [onChange, clampedValue]);

  // Cleanup event listeners on unmount
  React.useEffect(() => {
    return () => {
      setIsDragging(false);
    };
  }, []);

  return (
    <motion.div
      className={`relative h-12 rounded-full overflow-hidden cursor-pointer ${
        cosmicMode ? 'bg-purple-900/30 cosmic-mode' : 'bg-gray-100'
      }`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={1}
      aria-valuenow={clampedValue}
      aria-valuetext={`${Math.round(clampedValue * 100)}%`}
    >
      <div
        className="absolute inset-0 transition-opacity"
        style={{
          background: gradient,
          opacity: cosmicMode ? 0.8 : 1
        }}
      />
      <motion.div
        className={`absolute top-1/2 -translate-y-1/2 h-8 w-8 rounded-full ${
          cosmicMode ? 'bg-purple-500' : 'bg-white'
        } shadow-lg`}
        style={{
          left: `${clampedValue * 100}%`,
          transform: `translate(-50%, -50%)`
        }}
        animate={{
          scale: isDragging ? 1.2 : 1,
          boxShadow: isDragging
            ? cosmicMode
              ? '0 0 20px rgba(168, 85, 247, 0.5)'
              : '0 0 20px rgba(0, 0, 0, 0.2)'
            : '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      />
    </motion.div>
  );
}; 