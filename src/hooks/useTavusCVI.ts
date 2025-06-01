import { useEffect, useRef } from 'react';
import { TavusCVI } from '@tavus/cvi-sdk';
import { Room } from 'livekit-client';

interface UseTavusCVIOptions {
  room: Room | null;
  apiKey: string;
  modelId: string;
}

export const useTavusCVI = ({ room, apiKey, modelId }: UseTavusCVIOptions) => {
  const cviRef = useRef<TavusCVI | null>(null);

  useEffect(() => {
    if (!room || !apiKey || !modelId) return;

    const initializeCVI = async () => {
      try {
        const cvi = new TavusCVI({
          apiKey,
          modelId,
        });

        // Configure CVI settings
        await cvi.configure({
          videoQuality: 'high',
          audioQuality: 'high',
          enableLipSync: true,
          enableEmotionDetection: true,
        });

        // Set up event handlers
        cvi.on('response', (response) => {
          // Handle AI responses
          console.log('AI Response:', response);
        });

        cvi.on('error', (error) => {
          console.error('CVI Error:', error);
        });

        cviRef.current = cvi;
      } catch (error) {
        console.error('Failed to initialize Tavus CVI:', error);
      }
    };

    initializeCVI();

    return () => {
      if (cviRef.current) {
        cviRef.current.disconnect();
      }
    };
  }, [room, apiKey, modelId]);

  const sendMessage = async (message: string) => {
    if (!cviRef.current) return;

    try {
      await cviRef.current.sendMessage(message);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return {
    sendMessage,
  };
}; 