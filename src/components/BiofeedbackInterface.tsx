import React, { useRef, useEffect } from 'react';
import { useBiofeedback } from '../hooks/useBiofeedback';
import { BiofeedbackState, FacialEmotion } from '../types/voice';
import { motion } from 'framer-motion';

interface BiofeedbackInterfaceProps {
  onStateChange?: (state: BiofeedbackState) => void;
  enableVoice?: boolean;
  enableFacial?: boolean;
}

const getPrimaryEmotion = (emotion: FacialEmotion): { emotion: string; score: number } => {
  const emotions = Object.entries(emotion)
    .filter(([key]) => key !== 'confidence')
    .map(([key, value]) => ({ emotion: key, score: value }));
  
  return emotions.reduce((max, current) => 
    current.score > max.score ? current : max
  );
};

export const BiofeedbackInterface: React.FC<BiofeedbackInterfaceProps> = ({
  onStateChange,
  enableVoice = true,
  enableFacial = true
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    biofeedbackState,
    isRecording,
    isFacialDetectionActive,
    error,
    startVoiceRecording,
    stopVoiceRecording,
    startFacialDetection,
    stopFacialDetection
  } = useBiofeedback({
    enableVoice,
    enableFacial,
    onStateChange
  });

  useEffect(() => {
    if (videoRef.current && enableFacial) {
      startFacialDetection(videoRef.current);
    }
    return () => {
      stopFacialDetection();
    };
  }, [enableFacial, startFacialDetection, stopFacialDetection]);

  return (
    <div className="biofeedback-interface">
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      {enableFacial && (
        <div className="facial-detection">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="video-feed"
            data-testid="video-feed"
            style={{ display: isFacialDetectionActive ? 'block' : 'none' }}
          />
          {biofeedbackState?.facial && (
            <div className="facial-emotion">
              <h3>Detected Emotion</h3>
              {(() => {
                const primary = getPrimaryEmotion(biofeedbackState.facial!);
                return (
                  <>
                    <p>Primary: {primary.emotion}</p>
                    <p>Score: {Math.round(primary.score * 100)}%</p>
                    <p>Confidence: {Math.round(biofeedbackState.facial.confidence * 100)}%</p>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {enableVoice && (
        <div className="voice-controls">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
            className={`record-button ${isRecording ? 'recording' : ''}`}
            aria-label={isRecording ? 'Stop recording' : 'Start recording'}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </motion.button>

          {biofeedbackState?.voice && (
            <div className="voice-results">
              <h3>Voice Analysis</h3>
              <p>Transcription: {biofeedbackState.voice.transcription.text}</p>
              <div className="emotion-metrics">
                <p>Valence: {biofeedbackState.voice.emotion.valence.toFixed(2)}</p>
                <p>Arousal: {biofeedbackState.voice.emotion.arousal.toFixed(2)}</p>
                <p>Dominance: {biofeedbackState.voice.emotion.dominance.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      )}

      <style>
        {`
          .biofeedback-interface {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding: 1.5rem;
            background: rgba(0, 0, 0, 0.8);
            border-radius: 1rem;
            backdrop-filter: blur(10px);
          }

          .error-message {
            color: #ff4444;
            padding: 1rem;
            border-radius: 0.5rem;
            background: rgba(255, 68, 68, 0.1);
          }

          .facial-detection {
            position: relative;
            width: 100%;
            max-width: 640px;
            margin: 0 auto;
          }

          .video-feed {
            width: 100%;
            border-radius: 0.5rem;
            background: #000;
          }

          .facial-emotion {
            position: absolute;
            bottom: 1rem;
            left: 1rem;
            padding: 1rem;
            background: rgba(0, 0, 0, 0.8);
            border-radius: 0.5rem;
            color: #fff;
          }

          .voice-controls {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }

          .record-button {
            padding: 1rem 2rem;
            border: none;
            border-radius: 2rem;
            background: #4a90e2;
            color: white;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .record-button.recording {
            background: #e24a4a;
            animation: pulse 2s infinite;
          }

          .voice-results {
            width: 100%;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 0.5rem;
            color: #fff;
          }

          .emotion-metrics {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            margin-top: 1rem;
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
}; 