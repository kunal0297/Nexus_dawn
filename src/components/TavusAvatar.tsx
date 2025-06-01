import React, { useEffect, useState } from 'react';
import { TavusCVI } from '@tavus/cvi-sdk';

interface Props {
  message: string;
  emotion: 'happy' | 'sad' | 'angry' | 'fearful' | 'neutral';
}

export const TavusAvatar: React.FC<Props> = ({ message, emotion }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const tavus = new TavusCVI({
      apiKey: process.env.REACT_APP_TAVUS_API_KEY || '',
      modelId: process.env.REACT_APP_TAVUS_MODEL_ID || ''
    });

    const speak = async () => {
      try {
        setIsSpeaking(true);
        
        // Generate avatar video
        const videoResponse = await tavus.generateVideo({
          prompt: message,
          style: 'narrative',
          emotion
        });

        setAvatarUrl(videoResponse.url);

        // Speak the message
        await tavus.speak(message, {
          emotion,
          style: 'narrative'
        });
      } catch (error) {
        console.error('Error with Tavus avatar:', error);
      } finally {
        setIsSpeaking(false);
      }
    };

    speak();
  }, [message, emotion]);

  return (
    <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
      {isSpeaking && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      )}
      
      {avatarUrl && (
        <video
          src={avatarUrl}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}; 