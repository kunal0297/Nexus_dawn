import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { EmotionData } from '../types/emotions';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import { Room, RoomEvent, RemoteParticipant, LocalParticipant } from 'livekit-client';

interface EmotionalState {
  participantId: string;
  emotions: EmotionData[];
  timestamp: Date;
}

interface EventHorizonProps {
  roomName: string;
  token: string;
  onEmotionalSync?: (states: EmotionalState[]) => void;
}

const EmotionWave: React.FC<{
  emotion: EmotionData;
  intensity: number;
  delay: number;
}> = ({ emotion, intensity, delay }) => {
  const { isCosmicMode } = useTheme();
  
  return (
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{
        background: isCosmicMode
          ? `radial-gradient(circle, rgba(139, 92, 246, ${intensity}) 0%, rgba(59, 130, 246, ${intensity * 0.5}) 100%)`
          : `radial-gradient(circle, rgba(59, 130, 246, ${intensity}) 0%, rgba(37, 99, 235, ${intensity * 0.5}) 100%)`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 2, opacity: 0 }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  );
};

const EmotionVisualizer: React.FC<{
  emotionalStates: EmotionalState[];
}> = ({ emotionalStates }) => {
  const { isCosmicMode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [oscillators, setOscillators] = useState<OscillatorNode[]>([]);

  useEffect(() => {
    if (!audioContext) {
      const context = new AudioContext();
      setAudioContext(context);
    }
  }, [audioContext]);

  useEffect(() => {
    if (!audioContext || !emotionalStates.length) return;

    // Clean up existing oscillators
    oscillators.forEach(osc => {
      osc.stop();
      osc.disconnect();
    });

    // Create new oscillators based on emotional states
    const newOscillators = emotionalStates.flatMap(state => 
      state.emotions.map(emotion => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // Map emotion to frequency (200-2000 Hz)
        const frequency = 200 + (emotion.value / 100) * 1800;
        oscillator.frequency.value = frequency;
        
        // Map emotion value to volume
        gainNode.gain.value = emotion.value / 200; // Reduced volume
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.start();
        
        return oscillator;
      })
    );

    setOscillators(newOscillators);

    return () => {
      newOscillators.forEach(osc => {
        osc.stop();
        osc.disconnect();
      });
    };
  }, [audioContext, emotionalStates]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      emotionalStates.forEach((state, stateIndex) => {
        state.emotions.forEach((emotion, emotionIndex) => {
          const x = (canvas.width / emotionalStates.length) * stateIndex;
          const y = (canvas.height / emotion.value) * emotionIndex;
          const radius = emotion.value * 2;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = isCosmicMode
            ? `rgba(139, 92, 246, ${emotion.value / 100})`
            : `rgba(59, 130, 246, ${emotion.value / 100})`;
          ctx.fill();
        });
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [emotionalStates, isCosmicMode]);

  return (
    <div className="relative w-full h-64 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="w-full h-full"
      />
      {emotionalStates.map((state, stateIndex) =>
        state.emotions.map((emotion, emotionIndex) => (
          <EmotionWave
            key={`${state.participantId}-${emotion.emotion}`}
            emotion={emotion}
            intensity={emotion.value / 100}
            delay={stateIndex * 0.2 + emotionIndex * 0.1}
          />
        ))
      )}
    </div>
  );
};

export const EventHorizonProtocol: React.FC<EventHorizonProps> = ({
  roomName,
  token,
  onEmotionalSync,
}) => {
  const { isCosmicMode } = useTheme();
  const [emotionalStates, setEmotionalStates] = useState<EmotionalState[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const roomRef = useRef<Room | null>(null);

  const handleRoomConnected = useCallback((room: Room) => {
    roomRef.current = room;
    setIsConnected(true);

    // Listen for participant updates
    room.on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
      // Initialize emotional state for new participant
      const newState: EmotionalState = {
        participantId: participant.identity,
        emotions: [
          { emotion: 'Joy', value: 50 },
          { emotion: 'Trust', value: 50 },
          { emotion: 'Anticipation', value: 50 },
          { emotion: 'Fear', value: 50 },
          { emotion: 'Sadness', value: 50 },
          { emotion: 'Anger', value: 50 },
          { emotion: 'Surprise', value: 50 },
          { emotion: 'Disgust', value: 50 },
        ],
        timestamp: new Date(),
      };

      setEmotionalStates(prev => [...prev, newState]);
    });

    room.on(RoomEvent.ParticipantDisconnected, (participant: RemoteParticipant) => {
      setEmotionalStates(prev =>
        prev.filter(state => state.participantId !== participant.identity)
      );
    });
  }, []);

  const handleEmotionalUpdate = useCallback((participantId: string, emotions: EmotionData[]) => {
    setEmotionalStates(prev => {
      const newStates = prev.map(state =>
        state.participantId === participantId
          ? { ...state, emotions, timestamp: new Date() }
          : state
      );
      onEmotionalSync?.(newStates);
      return newStates;
    });
  }, [onEmotionalSync]);

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
          Event Horizon Protocol
        </h2>
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-900">
            <LiveKitRoom
              serverUrl={process.env.REACT_APP_LIVEKIT_URL}
              token={token}
              connect={true}
              onConnected={handleRoomConnected}
              className="h-full"
            >
              <VideoConference />
            </LiveKitRoom>
          </div>
        </div>

        <div className="space-y-4">
          <EmotionVisualizer emotionalStates={emotionalStates} />
          
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
              Emotional Resonance
            </h3>
            <div className="space-y-2">
              {emotionalStates.map(state => (
                <div
                  key={state.participantId}
                  className="flex items-center justify-between"
                >
                  <span className="text-gray-600 dark:text-gray-300">
                    {state.participantId}
                  </span>
                  <div className="flex space-x-2">
                    {state.emotions
                      .filter(e => e.value > 50)
                      .map(emotion => (
                        <span
                          key={emotion.emotion}
                          className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                        >
                          {emotion.emotion}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 