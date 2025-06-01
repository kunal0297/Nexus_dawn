import React, { useEffect, useState, useCallback } from 'react';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import { Room, RoomEvent } from 'livekit-client';
import { useTavusCVI } from './hooks/useTavusCVI';
import { DAWNVoice } from './components/DAWNVoice';
import { Paywall } from './components/Paywall';
import { WalletConnect } from './components/WalletConnect';
import { SubscriptionProvider, useSubscription } from './contexts/SubscriptionContext';
import { PsychologicalStateProvider, usePsychologicalState } from './contexts/PsychologicalStateContext';
import { OracleEventProvider } from './contexts/OracleEventContext';
import { useIdentity } from './hooks/useIdentity';
import MindStateMap from './components/MindStateMap';
import QuantumSaveManager from './components/QuantumSaveManager';
import Navigation from './components/Navigation';
import OracleEventListener from './components/OracleEventListener';
import ThreeDMarqueeDemo from './components/ui/3d-marquee-demo';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorMessage from './components/ui/ErrorMessage';
import '@livekit/components-styles';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'oracle';
  timestamp: Date;
}

const AppContent: React.FC = () => {
  const [room, setRoom] = useState<Room | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [activeView, setActiveView] = useState<'oracle' | 'paywall' | 'scan' | 'mind' | 'quantum' | 'marquee'>('oracle');
  const { currentTier } = useSubscription();
  const { isConnected: isWalletConnected, saveInteraction } = useIdentity();
  const { memories, storyChoices, addMemory, addStoryChoice } = usePsychologicalState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { sendMessage } = useTavusCVI({
    room,
    apiKey: process.env.REACT_APP_TAVUS_API_KEY || '',
    modelId: process.env.REACT_APP_TAVUS_MODEL_ID || '',
  });

  useEffect(() => {
    const initializeRoom = async () => {
      const newRoom = new Room({
        adaptiveStream: true,
        dynacast: true,
      });

      try {
        await newRoom.connect(
          process.env.REACT_APP_LIVEKIT_URL || '',
          process.env.REACT_APP_LIVEKIT_TOKEN || ''
        );
        setRoom(newRoom);
        setIsConnected(true);

        newRoom.on(RoomEvent.DataReceived, (payload: Uint8Array) => {
          const message = new TextDecoder().decode(payload);
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: message,
            sender: 'oracle',
            timestamp: new Date()
          }]);
        });

      } catch (error) {
        console.error('Failed to connect to room:', error);
      }
    };

    initializeRoom();

    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, []);

  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);
    setError(null);

    try {
      await sendMessage(inputMessage);
      
      if (isWalletConnected) {
        await saveInteraction({
          type: 'message',
          content: inputMessage,
          timestamp: new Date().toISOString(),
          tier: currentTier
        });
      }
    } catch (error) {
      setError('Failed to send message. Please try again.');
      console.error('Failed to send message:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [inputMessage, isProcessing, sendMessage, isWalletConnected, saveInteraction, currentTier]);

  const handleVoiceCommand = useCallback((command: string) => {
    switch (command) {
      case 'oracle':
        setActiveView('oracle');
        break;
      case 'paywall':
        setActiveView('paywall');
        break;
      case 'scan':
        if (currentTier === 'observer') {
          setActiveView('paywall');
        } else {
          setActiveView('scan');
        }
        break;
      case 'mind':
        setActiveView('mind');
        break;
      case 'quantum':
        setActiveView('quantum');
        break;
      case 'marquee':
        setActiveView('marquee');
        break;
      default:
        break;
    }
  }, [currentTier]);

  const renderActiveView = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-[600px]">
          <LoadingSpinner size="lg" />
        </div>
      );
    }

    if (error) {
      return (
        <ErrorMessage 
          message={error} 
          onRetry={() => setError(null)} 
          onDismiss={() => setError(null)} 
        />
      );
    }

    switch (activeView) {
      case 'oracle':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
              <h2 className="text-2xl font-semibold mb-4">Video Conference</h2>
              {isConnected && room && (
                <LiveKitRoom 
                  serverUrl={process.env.REACT_APP_LIVEKIT_URL || ''}
                  token={process.env.REACT_APP_LIVEKIT_TOKEN || ''}
                  room={room}
                >
                  <VideoConference />
                </LiveKitRoom>
              )}
            </div>

            <div className="bg-gray-800 rounded-lg p-6 shadow-xl flex flex-col h-[600px]">
              <h2 className="text-2xl font-semibold mb-4">Conversation</h2>
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 ml-4' 
                        : 'bg-purple-600 mr-4'
                    } animate-fade-in`}
                  >
                    <div className="font-semibold mb-1">
                      {message.sender === 'user' ? 'You' : 'DAWN.Oracle'}
                    </div>
                    <div>{message.text}</div>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSendMessage} className="mt-auto">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask DAWN.Oracle about your destiny..."
                    className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={isProcessing}
                  />
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isProcessing ? <LoadingSpinner size="sm" /> : 'Send'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      case 'paywall':
        return <Paywall />;
      case 'scan':
        return (
          <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Identity Scan</h2>
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Scanning...</h3>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'mind':
        return (
          <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Mind State Map</h2>
            <MindStateMap memories={memories} storyChoices={storyChoices} />
          </div>
        );
      case 'quantum':
        return <QuantumSaveManager />;
      case 'marquee':
        return (
          <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Technology Showcase</h2>
            <ThreeDMarqueeDemo />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <WalletConnect />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          DAWN.Oracle
        </h1>
        
        {renderActiveView()}

        <Navigation activeView={activeView} onViewChange={setActiveView} />

        <DAWNVoice
          onCommand={handleVoiceCommand}
          isListening={isVoiceListening}
          onListeningChange={setIsVoiceListening}
        />

        <OracleEventListener />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SubscriptionProvider>
      <PsychologicalStateProvider>
        <OracleEventProvider>
          <AppContent />
        </OracleEventProvider>
      </PsychologicalStateProvider>
    </SubscriptionProvider>
  );
};

export default App; 