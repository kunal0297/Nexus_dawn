import { Room } from 'livekit-client';
import { env } from '../config/env.validation';

export class LiveKitService {
  private room: Room | null = null;

  async connect(roomName: string, token: string): Promise<void> {
    this.room = new Room();
    await this.room.connect(env.REACT_APP_LIVEKIT_URL, token);
  }

  async disconnect(): Promise<void> {
    if (this.room) {
      this.room.disconnect();
      this.room = null;
    }
  }

  // These are placeholders; actual implementation depends on your SDK usage
  async publishTrack(track: any): Promise<void> {
    // Not implemented: depends on SDK
    throw new Error('publishTrack not implemented in current Room type');
  }

  async unpublishTrack(track: any): Promise<void> {
    // Not implemented: depends on SDK
    throw new Error('unpublishTrack not implemented in current Room type');
  }

  onParticipantConnected(callback: (participant: any) => void): void {
    if (!this.room) throw new Error('Not connected to room');
    this.room.on('participantConnected', callback);
  }

  onParticipantDisconnected(callback: (participant: any) => void): void {
    if (!this.room) throw new Error('Not connected to room');
    this.room.on('participantDisconnected', callback);
  }

  onTrackSubscribed(callback: (track: any, participant: any) => void): void {
    if (!this.room) throw new Error('Not connected to room');
    this.room.on('trackSubscribed', (payload: any) => {
      // You may need to destructure payload depending on SDK
      callback(payload.track, payload.participant);
    });
  }

  onTrackUnsubscribed(callback: (track: any, participant: any) => void): void {
    if (!this.room) throw new Error('Not connected to room');
    this.room.on('trackUnsubscribed', (payload: any) => {
      callback(payload.track, payload.participant);
    });
  }

  getParticipants(): any[] {
    // Not implemented: depends on SDK
    return [];
  }
} 