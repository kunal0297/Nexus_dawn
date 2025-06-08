import { MemoryService } from '../../src/services/memory';
import { EncryptionService } from '../../src/services/encryption';
import { SanitizationService } from '../../src/services/sanitization';
import { MemoryMood } from '../../src/types/memories';

jest.mock('../../src/services/encryption');
jest.mock('../../src/services/sanitization');
jest.mock('../../src/services/blockchain');

describe('MemoryService', () => {
  let memoryService: MemoryService;
  const mockEncryptionService = EncryptionService as jest.Mocked<typeof EncryptionService>;
  const mockSanitizationService = SanitizationService as jest.Mocked<typeof SanitizationService>;

  beforeEach(() => {
    jest.clearAllMocks();
    memoryService = new MemoryService();
  });

  describe('createMemory', () => {
    it('should create a memory with valid input', async () => {
      const memoryData = {
        content: 'Test memory content',
        mood: MemoryMood.JOY,
        timestamp: new Date().toISOString(),
      };

      mockSanitizationService.sanitizeString.mockReturnValue(memoryData.content);
      mockEncryptionService.encrypt.mockResolvedValue('encrypted-content');

      const result = await memoryService.createMemory(memoryData);

      expect(mockSanitizationService.sanitizeString).toHaveBeenCalledWith(memoryData.content);
      expect(mockEncryptionService.encrypt).toHaveBeenCalledWith(memoryData);
      expect(result).toBeDefined();
      expect(result.content).toBe('encrypted-content');
    });

    it('should throw error for invalid mood', async () => {
      const memoryData = {
        content: 'Test memory content',
        mood: 'INVALID_MOOD' as MemoryMood,
        timestamp: new Date().toISOString(),
      };

      await expect(memoryService.createMemory(memoryData)).rejects.toThrow('Invalid mood');
    });

    it('should handle empty content', async () => {
      const memoryData = {
        content: '',
        mood: MemoryMood.JOY,
        timestamp: new Date().toISOString(),
      };

      mockSanitizationService.sanitizeString.mockReturnValue('');
      mockEncryptionService.encrypt.mockResolvedValue('encrypted-content');

      const result = await memoryService.createMemory(memoryData);

      expect(mockSanitizationService.sanitizeString).toHaveBeenCalledWith('');
      expect(result).toBeDefined();
      expect(result.content).toBe('encrypted-content');
    });
  });

  describe('getMemories', () => {
    it('should retrieve and decrypt memories', async () => {
      const mockMemories = [
        {
          id: '1',
          content: 'encrypted-content-1',
          mood: MemoryMood.JOY,
          timestamp: new Date().toISOString(),
        },
        {
          id: '2',
          content: 'encrypted-content-2',
          mood: MemoryMood.PEACE,
          timestamp: new Date().toISOString(),
        },
      ];

      mockEncryptionService.decrypt
        .mockResolvedValueOnce({ content: 'decrypted-content-1' })
        .mockResolvedValueOnce({ content: 'decrypted-content-2' });

      const result = await memoryService.getMemories();

      expect(mockEncryptionService.decrypt).toHaveBeenCalledTimes(2);
      expect(result).toHaveLength(2);
      expect(result[0].content).toBe('decrypted-content-1');
      expect(result[1].content).toBe('decrypted-content-2');
    });

    it('should handle empty memory list', async () => {
      const result = await memoryService.getMemories();
      expect(result).toHaveLength(0);
    });

    it('should handle decryption errors', async () => {
      const mockMemories = [
        {
          id: '1',
          content: 'encrypted-content',
          mood: MemoryMood.JOY,
          timestamp: new Date().toISOString(),
        },
      ];

      mockEncryptionService.decrypt.mockRejectedValue(new Error('Decryption failed'));

      await expect(memoryService.getMemories()).rejects.toThrow('Failed to decrypt memory');
    });
  });

  describe('updateMemory', () => {
    it('should update memory with valid input', async () => {
      const memoryId = '1';
      const updateData = {
        content: 'Updated content',
        mood: MemoryMood.JOY,
      };

      mockSanitizationService.sanitizeString.mockReturnValue(updateData.content);
      mockEncryptionService.encrypt.mockResolvedValue('encrypted-updated-content');

      const result = await memoryService.updateMemory(memoryId, updateData);

      expect(mockSanitizationService.sanitizeString).toHaveBeenCalledWith(updateData.content);
      expect(mockEncryptionService.encrypt).toHaveBeenCalledWith(updateData);
      expect(result).toBeDefined();
      expect(result.content).toBe('encrypted-updated-content');
    });

    it('should throw error for non-existent memory', async () => {
      const memoryId = 'non-existent';
      const updateData = {
        content: 'Updated content',
        mood: MemoryMood.JOY,
      };

      await expect(memoryService.updateMemory(memoryId, updateData)).rejects.toThrow('Memory not found');
    });
  });

  describe('deleteMemory', () => {
    it('should delete existing memory', async () => {
      const memoryId = '1';

      await expect(memoryService.deleteMemory(memoryId)).resolves.not.toThrow();
    });

    it('should throw error for non-existent memory', async () => {
      const memoryId = 'non-existent';

      await expect(memoryService.deleteMemory(memoryId)).rejects.toThrow('Memory not found');
    });
  });

  describe('getMemoriesByMood', () => {
    it('should filter memories by mood', async () => {
      const mood = MemoryMood.JOY;
      const mockMemories = [
        {
          id: '1',
          content: 'encrypted-content-1',
          mood: MemoryMood.JOY,
          timestamp: new Date().toISOString(),
        },
        {
          id: '2',
          content: 'encrypted-content-2',
          mood: MemoryMood.PEACE,
          timestamp: new Date().toISOString(),
        },
      ];

      mockEncryptionService.decrypt.mockResolvedValue({ content: 'decrypted-content' });

      const result = await memoryService.getMemoriesByMood(mood);

      expect(result).toHaveLength(1);
      expect(result[0].mood).toBe(MemoryMood.JOY);
    });

    it('should return empty array for non-existent mood', async () => {
      const mood = MemoryMood.JOY;

      const result = await memoryService.getMemoriesByMood(mood);

      expect(result).toHaveLength(0);
    });
  });
}); 