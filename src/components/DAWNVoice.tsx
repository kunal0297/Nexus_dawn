import React, { useEffect, useState, useCallback } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { ElevenLabs } from '@elevenlabs/browser-sdk';

interface DAWNVoiceProps {
  onCommand: (command: string) => void;
  isListening: boolean;
  onListeningChange: (isListening: boolean) => void;
}

const VOICE_COMMANDS = {
  'OPEN ORACLE': 'oracle',
  'SHOW PAYWALL': 'paywall',
  'SCAN IDENTITY': 'scan',
  'HELP': 'help',
} as const;

export const DAWNVoice: React.FC<DAWNVoiceProps> = ({
  onCommand,
  isListening,
  onListeningChange,
}) => {
  const [elevenLabs, setElevenLabs] = useState<ElevenLabs | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    const initElevenLabs = async () => {
      const eleven = new ElevenLabs({
        apiKey: process.env.REACT_APP_ELEVENLABS_API_KEY || '',
      });
      setElevenLabs(eleven);
    };

    initElevenLabs();
  }, []);

  useEffect(() => {
    onListeningChange(listening);
  }, [listening, onListeningChange]);

  const speak = useCallback(async (text: string) => {
    if (!elevenLabs) return;

    try {
      setIsSpeaking(true);
      await elevenLabs.speak({
        text,
        voiceId: process.env.REACT_APP_ELEVENLABS_VOICE_ID || '',
        modelId: 'eleven_monolingual_v1',
      });
    } catch (error) {
      console.error('Error speaking:', error);
    } finally {
      setIsSpeaking(false);
    }
  }, [elevenLabs]);

  const processCommand = useCallback(async (command: string) => {
    const upperCommand = command.toUpperCase();
    const matchedCommand = Object.keys(VOICE_COMMANDS).find(
      key => upperCommand.includes(key)
    );

    if (matchedCommand) {
      const action = VOICE_COMMANDS[matchedCommand as keyof typeof VOICE_COMMANDS];
      onCommand(action);
      
      // Provide voice feedback
      const responses = {
        oracle: "Opening Oracle interface",
        paywall: "Displaying paywall options",
        scan: "Initiating identity scan",
        help: "Here are the available commands: Open Oracle, Show Paywall, Scan Identity"
      };
      
      await speak(responses[action]);
    }
  }, [onCommand, speak]);

  useEffect(() => {
    if (transcript && !isSpeaking) {
      processCommand(transcript);
      resetTranscript();
    }
  }, [transcript, isSpeaking, processCommand, resetTranscript]);

  const toggleListening = useCallback(() => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="text-red-500">
        Your browser doesn't support speech recognition.
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleListening}
        className={`p-4 rounded-full shadow-lg transition-all ${
          listening
            ? 'bg-purple-600 animate-pulse'
            : 'bg-gray-800 hover:bg-gray-700'
        }`}
        disabled={isSpeaking}
      >
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            listening ? 'bg-red-500 animate-pulse' : 'bg-gray-400'
          }`} />
          <span className="text-white">
            {listening ? 'Listening...' : 'DAWN.Voice'}
          </span>
        </div>
      </button>
      
      {listening && (
        <div className="absolute bottom-16 right-0 bg-gray-800 p-4 rounded-lg shadow-xl max-w-sm">
          <div className="text-sm text-gray-300 mb-2">Listening...</div>
          <div className="text-white">{transcript}</div>
        </div>
      )}
    </div>
  );
}; 