import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ElevenLabsService } from '../services/elevenlabs';
import { TavusService } from '../services/tavus';
import { useEmotionalState } from '../hooks/useEmotionalState';

interface DialoguesWithSelfProps {
  onSessionStart?: () => void;
  onSessionEnd?: () => void;
}

export const DialoguesWithSelf: React.FC<DialoguesWithSelfProps> = ({
  onSessionStart,
  onSessionEnd,
}) => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [availableAvatars, setAvailableAvatars] = useState<any[]>([]);
  const [availableVoices, setAvailableVoices] = useState<any[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { emotionalState } = useEmotionalState();

  useEffect(() => {
    const loadResources = async () => {
      try {
        const [avatars, voices] = await Promise.all([
          TavusService.getInstance().getAvatars(),
          ElevenLabsService.getInstance().getVoices(),
        ]);
        setAvailableAvatars(avatars);
        setAvailableVoices(voices);
        if (avatars.length > 0) setSelectedAvatar(avatars[0].id);
        if (voices.length > 0) setSelectedVoice(voices[0].voice_id);
      } catch (err) {
        setError('Failed to load resources');
        console.error(err);
      }
    };
    loadResources();
  }, []);

  const startSession = async () => {
    if (!selectedAvatar || !selectedVoice) {
      setError('Please select both an avatar and a voice');
      return;
    }

    setIsLoading(true);
    setError(null);
    onSessionStart?.();

    try {
      // Generate initial response based on emotional state
      const response = await generateResponse();
      
      // Generate video and audio
      const [videoResponse, audioResponse] = await Promise.all([
        TavusService.getInstance().generateVideo(
          response,
          selectedAvatar,
          emotionalState
        ),
        ElevenLabsService.getInstance().synthesizeVoice(
          response,
          selectedVoice,
          0.5,
          0.75
        ),
      ]);

      // Play video and audio
      if (videoRef.current && audioRef.current) {
        videoRef.current.src = videoResponse.videoUrl;
        const audioBlob = new Blob([audioResponse.audio], { type: 'audio/mpeg' });
        audioRef.current.src = URL.createObjectURL(audioBlob);
        
        await Promise.all([
          videoRef.current.play(),
          audioRef.current.play(),
        ]);
      }

      setIsSessionActive(true);
    } catch (err) {
      setError('Failed to start session');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const endSession = () => {
    if (videoRef.current) videoRef.current.pause();
    if (audioRef.current) audioRef.current.pause();
    setIsSessionActive(false);
    onSessionEnd?.();
  };

  const generateResponse = async (): Promise<string> => {
    // TODO: Implement response generation based on emotional state
    return "I understand how you're feeling. Let's explore this together.";
  };

  return (
    <div className="dialogues-with-self">
      <div className="controls">
        <select
          value={selectedAvatar || ''}
          onChange={(e) => setSelectedAvatar(e.target.value)}
          className="avatar-select"
          aria-label="Select Avatar"
        >
          {availableAvatars.map((avatar) => (
            <option key={avatar.id} value={avatar.id}>
              {avatar.name}
            </option>
          ))}
        </select>

        <select
          value={selectedVoice || ''}
          onChange={(e) => setSelectedVoice(e.target.value)}
          className="voice-select"
          aria-label="Select Voice"
        >
          {availableVoices.map((voice) => (
            <option key={voice.voice_id} value={voice.voice_id}>
              {voice.name}
            </option>
          ))}
        </select>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isSessionActive ? endSession : startSession}
          disabled={isLoading}
          className={`session-button ${isSessionActive ? 'active' : ''}`}
        >
          {isLoading ? 'Loading...' : isSessionActive ? 'End Session' : 'Start Session'}
        </motion.button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="error-message"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="media-container">
        <video
          ref={videoRef}
          className="avatar-video"
          playsInline
          muted
          style={{ display: isSessionActive ? 'block' : 'none' }}
        />
        <audio ref={audioRef} className="avatar-audio" />
      </div>

      <style>
        {`
          .dialogues-with-self {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            padding: 2rem;
            background: rgba(0, 0, 0, 0.8);
            border-radius: 1rem;
            backdrop-filter: blur(10px);
          }

          .controls {
            display: flex;
            gap: 1rem;
            align-items: center;
          }

          .avatar-select,
          .voice-select {
            padding: 0.5rem;
            border-radius: 0.5rem;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .session-button {
            padding: 0.75rem 1.5rem;
            border-radius: 2rem;
            background: #4a90e2;
            color: white;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .session-button.active {
            background: #e24a4a;
          }

          .session-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .error-message {
            padding: 1rem;
            background: rgba(255, 68, 68, 0.1);
            border-radius: 0.5rem;
            color: #ff4444;
          }

          .media-container {
            position: relative;
            width: 100%;
            max-width: 640px;
            margin: 0 auto;
            aspect-ratio: 16/9;
            background: #000;
            border-radius: 0.5rem;
            overflow: hidden;
          }

          .avatar-video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .avatar-audio {
            display: none;
          }
        `}
      </style>
    </div>
  );
}; 