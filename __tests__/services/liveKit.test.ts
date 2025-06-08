import { LiveKitService } from '../../src/services/liveKit';
import { Room } from 'livekit-client';

jest.mock('livekit-client');
jest.mock('../../src/config/env.validation', () => ({
  env: {
    REACT_APP_LIVEKIT_API_KEY: 'test-livekit-key',
    REACT_APP_LIVEKIT_API_SECRET: 'test-livekit-secret',
    REACT_APP_LIVEKIT_URL: 'https://test.livekit.com',
  },
}));

describe('LiveKitService', () => {
  let liveKitService: LiveKitService;
  const mockRoom = {
    connect: jest.fn(),
    disconnect: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    ((Room as unknown) as jest.Mock).mockImplementation(() => mockRoom);
    liveKitService = new LiveKitService();
  });

  describe('connect', () => {
    it('should connect to room', async () => {
      const roomName = 'test-room';
      const token = 'test-token';

      await liveKitService.connect(roomName, token);

      expect(Room).toHaveBeenCalled();
      expect(mockRoom.connect).toHaveBeenCalledWith('https://test.livekit.com', token);
    });

    it('should handle connection errors', async () => {
      const roomName = 'test-room';
      const token = 'test-token';
      const error = new Error('Connection failed');

      mockRoom.connect.mockRejectedValueOnce(error);

      await expect(liveKitService.connect(roomName, token)).rejects.toThrow('Connection failed');
    });
  });

  describe('disconnect', () => {
    it('should disconnect from room', async () => {
      await liveKitService.connect('test-room', 'test-token');
      await liveKitService.disconnect();
      expect(mockRoom.disconnect).toHaveBeenCalled();
    });
  });

  describe('publishTrack', () => {
    it('should throw not implemented error', async () => {
      await expect(liveKitService.publishTrack({})).rejects.toThrow('publishTrack not implemented in current Room type');
    });
  });

  describe('unpublishTrack', () => {
    it('should throw not implemented error', async () => {
      await expect(liveKitService.unpublishTrack({})).rejects.toThrow('unpublishTrack not implemented in current Room type');
    });
  });

  describe('onParticipantConnected', () => {
    it('should handle participant connection', async () => {
      await liveKitService.connect('test-room', 'test-token');
      const mockParticipant = { identity: 'test-participant', metadata: 'test-metadata' };
      const callback = jest.fn();
      liveKitService.onParticipantConnected(callback);
      expect(mockRoom.on).toHaveBeenCalledWith('participantConnected', callback);
    });
  });

  describe('onParticipantDisconnected', () => {
    it('should handle participant disconnection', async () => {
      await liveKitService.connect('test-room', 'test-token');
      const mockParticipant = { identity: 'test-participant', metadata: 'test-metadata' };
      const callback = jest.fn();
      liveKitService.onParticipantDisconnected(callback);
      expect(mockRoom.on).toHaveBeenCalledWith('participantDisconnected', callback);
    });
  });

  describe('onTrackSubscribed', () => {
    it('should handle track subscription', async () => {
      await liveKitService.connect('test-room', 'test-token');
      const callback = jest.fn();
      liveKitService.onTrackSubscribed(callback);
      expect(mockRoom.on).toHaveBeenCalledWith('trackSubscribed', expect.any(Function));
      // Simulate event
      const handler = mockRoom.on.mock.calls.find(call => call[0] === 'trackSubscribed')[1];
      handler({ track: 'audio', participant: { identity: 'test' } });
      expect(callback).toHaveBeenCalledWith('audio', { identity: 'test' });
    });
  });

  describe('onTrackUnsubscribed', () => {
    it('should handle track unsubscription', async () => {
      await liveKitService.connect('test-room', 'test-token');
      const callback = jest.fn();
      liveKitService.onTrackUnsubscribed(callback);
      expect(mockRoom.on).toHaveBeenCalledWith('trackUnsubscribed', expect.any(Function));
      // Simulate event
      const handler = mockRoom.on.mock.calls.find(call => call[0] === 'trackUnsubscribed')[1];
      handler({ track: 'audio', participant: { identity: 'test' } });
      expect(callback).toHaveBeenCalledWith('audio', { identity: 'test' });
    });
  });

  describe('getParticipants', () => {
    it('should return empty array', () => {
      const result = liveKitService.getParticipants();
      expect(result).toEqual([]);
    });
  });
}); 