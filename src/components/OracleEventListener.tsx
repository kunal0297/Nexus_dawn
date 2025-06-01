import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOracleEvent } from '../contexts/OracleEventContext';
import useSound from 'use-sound';

interface EventEffect {
  type: string;
  color: string;
  sound: string;
  message: string;
}

const EVENT_EFFECTS: Record<string, EventEffect> = {
  'cosmic_collapse': {
    type: 'collapse',
    color: 'bg-purple-900',
    sound: '/sounds/cosmic-collapse.mp3',
    message: 'Cosmic Collapse Detected'
  },
  'solar_shift': {
    type: 'shift',
    color: 'bg-orange-900',
    sound: '/sounds/solar-shift.mp3',
    message: 'Solar Shift in Progress'
  },
  'quantum_ripple': {
    type: 'ripple',
    color: 'bg-blue-900',
    sound: '/sounds/quantum-ripple.mp3',
    message: 'Quantum Ripple Detected'
  }
};

export const OracleEventListener: React.FC = () => {
  const { latestEvent } = useOracleEvent();
  const [visible, setVisible] = useState(false);
  const [effect, setEffect] = useState<EventEffect | null>(null);

  // Load sound effects
  const [playCosmicCollapse] = useSound('/sounds/cosmic-collapse.mp3');
  const [playSolarShift] = useSound('/sounds/solar-shift.mp3');
  const [playQuantumRipple] = useSound('/sounds/quantum-ripple.mp3');

  useEffect(() => {
    if (latestEvent) {
      const eventEffect = EVENT_EFFECTS[latestEvent.type] || {
        type: 'default',
        color: 'bg-purple-900',
        sound: '/sounds/default-event.mp3',
        message: 'Cosmic Event Detected'
      };

      setEffect(eventEffect);
      setVisible(true);

      // Play appropriate sound effect
      switch (eventEffect.type) {
        case 'collapse':
          playCosmicCollapse();
          break;
        case 'shift':
          playSolarShift();
          break;
        case 'ripple':
          playQuantumRipple();
          break;
      }

      // Hide after animation
      const timer = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [latestEvent, playCosmicCollapse, playSolarShift, playQuantumRipple]);

  return (
    <AnimatePresence>
      {visible && effect && (
        <>
          {/* Background overlay */}
          <motion.div
            className={`fixed inset-0 z-50 ${effect.color}/70 pointer-events-none`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Ripple effect */}
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className={`absolute inset-0 ${effect.color}/30 rounded-full`} />
          </motion.div>

          {/* Event message */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white text-4xl font-bold text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {effect.message}
              </motion.div>
              {latestEvent.payload?.description && (
                <motion.div
                  className="text-xl mt-4 text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {latestEvent.payload.description}
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OracleEventListener; 