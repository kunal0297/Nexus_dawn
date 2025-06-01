declare module '@livekit/components-react' {
  export const LiveKitRoom: React.FC<{ room: any; children: React.ReactNode }>;
  export const VideoConference: React.FC;
}

declare module '@livekit/components-styles' {}

declare module 'livekit-client' {
  export class Room {
    constructor(options?: { adaptiveStream?: boolean; dynacast?: boolean });
    connect(url: string, token: string): Promise<void>;
    disconnect(): void;
    on(event: string, callback: (payload: any) => void): void;
  }
  export enum RoomEvent {
    DataReceived = 'dataReceived'
  }
}

declare module '@tavus/cvi-sdk' {
  export class TavusCVI {
    constructor(options: { apiKey: string; modelId: string });
    configure(options: {
      videoQuality: string;
      audioQuality: string;
      enableLipSync: boolean;
      enableEmotionDetection: boolean;
    }): Promise<void>;
    on(event: string, callback: (data: any) => void): void;
    sendMessage(message: string): Promise<void>;
    disconnect(): void;
  }
}

declare module '@elevenlabs/browser-sdk' {
  export class ElevenLabs {
    constructor(options: { apiKey: string });
    speak(options: {
      text: string;
      voiceId: string;
      modelId: string;
    }): Promise<void>;
  }
}

declare module 'react-speech-recognition' {
  export interface SpeechRecognitionOptions {
    continuous?: boolean;
    language?: string;
  }

  export interface UseSpeechRecognitionReturn {
    transcript: string;
    listening: boolean;
    resetTranscript: () => void;
    browserSupportsSpeechRecognition: boolean;
  }

  export function useSpeechRecognition(): UseSpeechRecognitionReturn;

  export const SpeechRecognition: {
    startListening: (options?: SpeechRecognitionOptions) => Promise<void>;
    stopListening: () => void;
  };
}

declare module '@revenuecat/purchases-react-native' {
  export interface CustomerInfo {
    entitlements: {
      active: {
        [key: string]: boolean;
      };
    };
  }

  export default class Purchases {
    static configure(options: {
      apiKey: string;
      appUserID?: string;
    }): Promise<void>;
    static getCustomerInfo(): Promise<CustomerInfo>;
  }
}

declare module '@revenuecat/purchases-ui-react' {
  interface PaywallProps {
    offering: string;
    className?: string;
    children?: React.ReactNode;
  }

  export const Paywall: React.FC<PaywallProps>;
}

interface Memory {
  timestamp: string;
  mood: 'happy' | 'sad' | 'angry' | 'fearful' | 'neutral';
  intensity: number;
  content: string;
}

interface StoryChoice {
  timestamp: string;
  impact: number;
  description: string;
} 