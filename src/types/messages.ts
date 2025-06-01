export enum MessageStatus {
  PENDING = 'PENDING',
  UNLOCKED = 'UNLOCKED',
  EXPIRED = 'EXPIRED'
}

export interface TimeLockedMessage {
  sender: string;
  recipient: string;
  encryptedMessage: string;
  unlockTimestamp: number;
  status: MessageStatus;
  createdAt: number;
}

export interface MessageFormData {
  message: string;
  unlockDate: Date;
  recipient: string;
}

export interface MessageCountdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
} 