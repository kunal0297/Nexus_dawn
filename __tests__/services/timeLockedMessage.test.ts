import { TimeLockedMessageService } from '../../src/services/timeLockedMessage';
import { EncryptionService } from '../../src/services/encryption';
import { SanitizationService } from '../../src/services/sanitization';

jest.mock('../../src/services/encryption');
jest.mock('../../src/services/sanitization');

describe('TimeLockedMessageService', () => {
  let timeLockedMessageService: TimeLockedMessageService;
  const mockEncryptionService = EncryptionService as jest.Mocked<typeof EncryptionService>;
  const mockSanitizationService = SanitizationService as jest.Mocked<typeof SanitizationService>;

  beforeEach(() => {
    jest.clearAllMocks();
    timeLockedMessageService = new TimeLockedMessageService();
  });

  describe('createMessage', () => {
    it('should create a time-locked message with valid input', async () => {
      const messageData = {
        content: 'Test message content',
        unlockDate: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
        recipient: 'test@example.com',
      };

      mockSanitizationService.sanitizeString.mockReturnValue(messageData.content);
      mockSanitizationService.sanitizeEmail.mockReturnValue(messageData.recipient);
      mockEncryptionService.encrypt.mockResolvedValue('encrypted-content');

      const result = await timeLockedMessageService.createMessage(messageData);

      expect(mockSanitizationService.sanitizeString).toHaveBeenCalledWith(messageData.content);
      expect(mockSanitizationService.sanitizeEmail).toHaveBeenCalledWith(messageData.recipient);
      expect(mockEncryptionService.encrypt).toHaveBeenCalledWith(messageData);
      expect(result).toBeDefined();
      expect(result.content).toBe('encrypted-content');
    });

    it('should throw error for past unlock date', async () => {
      const messageData = {
        content: 'Test message content',
        unlockDate: new Date(Date.now() - 86400000).toISOString(), // 24 hours ago
        recipient: 'test@example.com',
      };

      await expect(timeLockedMessageService.createMessage(messageData)).rejects.toThrow('Unlock date must be in the future');
    });

    it('should throw error for invalid email', async () => {
      const messageData = {
        content: 'Test message content',
        unlockDate: new Date(Date.now() + 86400000).toISOString(),
        recipient: 'invalid-email',
      };

      mockSanitizationService.sanitizeEmail.mockImplementation(() => {
        throw new Error('Invalid email');
      });

      await expect(timeLockedMessageService.createMessage(messageData)).rejects.toThrow('Invalid email');
    });
  });

  describe('getMessages', () => {
    it('should retrieve and decrypt messages', async () => {
      const mockMessages = [
        {
          id: '1',
          content: 'encrypted-content-1',
          unlockDate: new Date(Date.now() + 86400000).toISOString(),
          recipient: 'test1@example.com',
        },
        {
          id: '2',
          content: 'encrypted-content-2',
          unlockDate: new Date(Date.now() + 172800000).toISOString(),
          recipient: 'test2@example.com',
        },
      ];

      mockEncryptionService.decrypt
        .mockResolvedValueOnce({ content: 'decrypted-content-1' })
        .mockResolvedValueOnce({ content: 'decrypted-content-2' });

      const result = await timeLockedMessageService.getMessages();

      expect(mockEncryptionService.decrypt).toHaveBeenCalledTimes(2);
      expect(result).toHaveLength(2);
      expect(result[0].content).toBe('decrypted-content-1');
      expect(result[1].content).toBe('decrypted-content-2');
    });

    it('should handle empty message list', async () => {
      const result = await timeLockedMessageService.getMessages();
      expect(result).toHaveLength(0);
    });

    it('should handle decryption errors', async () => {
      const mockMessages = [
        {
          id: '1',
          content: 'encrypted-content',
          unlockDate: new Date(Date.now() + 86400000).toISOString(),
          recipient: 'test@example.com',
        },
      ];

      mockEncryptionService.decrypt.mockRejectedValue(new Error('Decryption failed'));

      await expect(timeLockedMessageService.getMessages()).rejects.toThrow('Failed to decrypt message');
    });
  });

  describe('updateMessage', () => {
    it('should update message with valid input', async () => {
      const messageId = '1';
      const updateData = {
        content: 'Updated content',
        unlockDate: new Date(Date.now() + 86400000).toISOString(),
      };

      mockSanitizationService.sanitizeString.mockReturnValue(updateData.content);
      mockEncryptionService.encrypt.mockResolvedValue('encrypted-updated-content');

      const result = await timeLockedMessageService.updateMessage(messageId, updateData);

      expect(mockSanitizationService.sanitizeString).toHaveBeenCalledWith(updateData.content);
      expect(mockEncryptionService.encrypt).toHaveBeenCalledWith(updateData);
      expect(result).toBeDefined();
      expect(result.content).toBe('encrypted-updated-content');
    });

    it('should throw error for non-existent message', async () => {
      const messageId = 'non-existent';
      const updateData = {
        content: 'Updated content',
        unlockDate: new Date(Date.now() + 86400000).toISOString(),
      };

      await expect(timeLockedMessageService.updateMessage(messageId, updateData)).rejects.toThrow('Message not found');
    });

    it('should throw error for past unlock date', async () => {
      const messageId = '1';
      const updateData = {
        content: 'Updated content',
        unlockDate: new Date(Date.now() - 86400000).toISOString(),
      };

      await expect(timeLockedMessageService.updateMessage(messageId, updateData)).rejects.toThrow('Unlock date must be in the future');
    });
  });

  describe('deleteMessage', () => {
    it('should delete existing message', async () => {
      const messageId = '1';

      await expect(timeLockedMessageService.deleteMessage(messageId)).resolves.not.toThrow();
    });

    it('should throw error for non-existent message', async () => {
      const messageId = 'non-existent';

      await expect(timeLockedMessageService.deleteMessage(messageId)).rejects.toThrow('Message not found');
    });
  });

  describe('getMessagesByRecipient', () => {
    it('should filter messages by recipient', async () => {
      const recipient = 'test@example.com';
      const mockMessages = [
        {
          id: '1',
          content: 'encrypted-content-1',
          unlockDate: new Date(Date.now() + 86400000).toISOString(),
          recipient: 'test@example.com',
        },
        {
          id: '2',
          content: 'encrypted-content-2',
          unlockDate: new Date(Date.now() + 172800000).toISOString(),
          recipient: 'other@example.com',
        },
      ];

      mockEncryptionService.decrypt.mockResolvedValue({ content: 'decrypted-content' });

      const result = await timeLockedMessageService.getMessagesByRecipient(recipient);

      expect(result).toHaveLength(1);
      expect(result[0].recipient).toBe(recipient);
    });

    it('should return empty array for non-existent recipient', async () => {
      const recipient = 'nonexistent@example.com';

      const result = await timeLockedMessageService.getMessagesByRecipient(recipient);

      expect(result).toHaveLength(0);
    });
  });

  describe('checkUnlockedMessages', () => {
    it('should return unlocked messages', async () => {
      const mockMessages = [
        {
          id: '1',
          content: 'encrypted-content-1',
          unlockDate: new Date(Date.now() - 86400000).toISOString(), // 24 hours ago
          recipient: 'test@example.com',
        },
        {
          id: '2',
          content: 'encrypted-content-2',
          unlockDate: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
          recipient: 'test@example.com',
        },
      ];

      mockEncryptionService.decrypt.mockResolvedValue({ content: 'decrypted-content' });

      const result = await timeLockedMessageService.checkUnlockedMessages();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('should return empty array when no messages are unlocked', async () => {
      const result = await timeLockedMessageService.checkUnlockedMessages();
      expect(result).toHaveLength(0);
    });
  });
}); 