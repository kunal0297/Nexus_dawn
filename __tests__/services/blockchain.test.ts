import { BlockchainService } from '../../src/services/blockchain';
import { algosdk } from 'algosdk';

jest.mock('algosdk');
jest.mock('../../src/config/env.validation', () => ({
  env: {
    REACT_APP_ALGORAND_TOKEN: 'test-algorand-token',
    REACT_APP_ALGORAND_SERVER: 'https://test.algorand.com',
    REACT_APP_ALGORAND_PORT: '443',
    REACT_APP_NARRATIVE_APP_ID: '123',
  },
}));

describe('BlockchainService', () => {
  let blockchainService: BlockchainService;
  const mockAlgodClient = {
    getApplicationByID: jest.fn(),
    getAccountByAddress: jest.fn(),
    sendRawTransaction: jest.fn(),
    pendingTransactionInformation: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (algosdk.Algodv2 as jest.Mock).mockImplementation(() => mockAlgodClient);
    blockchainService = new BlockchainService();
  });

  describe('initialize', () => {
    it('should initialize the blockchain service', async () => {
      await blockchainService.initialize();

      expect(algosdk.Algodv2).toHaveBeenCalledWith(
        'test-algorand-token',
        'https://test.algorand.com',
        '443'
      );
    });

    it('should handle initialization errors', async () => {
      const error = new Error('Initialization failed');
      (algosdk.Algodv2 as jest.Mock).mockImplementationOnce(() => {
        throw error;
      });

      await expect(blockchainService.initialize()).rejects.toThrow('Initialization failed');
    });
  });

  describe('getState', () => {
    it('should get application state', async () => {
      const mockState = {
        'key1': { bytes: 'value1' },
        'key2': { bytes: 'value2' },
      };

      mockAlgodClient.getApplicationByID.mockResolvedValueOnce({
        params: {
          'global-state': Object.entries(mockState).map(([key, value]) => ({
            key: Buffer.from(key).toString('base64'),
            value,
          })),
        },
      });

      const result = await blockchainService.getState();

      expect(mockAlgodClient.getApplicationByID).toHaveBeenCalledWith('123');
      expect(result).toEqual(mockState);
    });

    it('should handle empty state', async () => {
      mockAlgodClient.getApplicationByID.mockResolvedValueOnce({
        params: {
          'global-state': [],
        },
      });

      const result = await blockchainService.getState();

      expect(result).toEqual({});
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      mockAlgodClient.getApplicationByID.mockRejectedValueOnce(error);

      await expect(blockchainService.getState()).rejects.toThrow('API Error');
    });
  });

  describe('saveInteraction', () => {
    it('should save interaction data', async () => {
      const data = {
        type: 'memory',
        content: 'Test memory content',
        timestamp: new Date().toISOString(),
      };

      const mockTxId = 'test-transaction-id';
      mockAlgodClient.sendRawTransaction.mockResolvedValueOnce(mockTxId);
      mockAlgodClient.pendingTransactionInformation.mockResolvedValueOnce({
        'confirmed-round': 123,
      });

      const result = await blockchainService.saveInteraction(data);

      expect(mockAlgodClient.sendRawTransaction).toHaveBeenCalled();
      expect(result).toBe(mockTxId);
    });

    it('should handle transaction errors', async () => {
      const data = {
        type: 'memory',
        content: 'Test memory content',
        timestamp: new Date().toISOString(),
      };

      const error = new Error('Transaction failed');
      mockAlgodClient.sendRawTransaction.mockRejectedValueOnce(error);

      await expect(blockchainService.saveInteraction(data)).rejects.toThrow('Transaction failed');
    });

    it('should handle confirmation timeout', async () => {
      const data = {
        type: 'memory',
        content: 'Test memory content',
        timestamp: new Date().toISOString(),
      };

      const mockTxId = 'test-transaction-id';
      mockAlgodClient.sendRawTransaction.mockResolvedValueOnce(mockTxId);
      mockAlgodClient.pendingTransactionInformation.mockResolvedValueOnce({
        'confirmed-round': null,
      });

      await expect(blockchainService.saveInteraction(data)).rejects.toThrow('Transaction confirmation timeout');
    });
  });

  describe('getAccount', () => {
    it('should get account information', async () => {
      const mockAccount = {
        address: 'test-address',
        amount: 1000000,
        'min-balance': 100000,
      };

      mockAlgodClient.getAccountByAddress.mockResolvedValueOnce(mockAccount);

      const result = await blockchainService.getAccount('test-address');

      expect(mockAlgodClient.getAccountByAddress).toHaveBeenCalledWith('test-address');
      expect(result).toEqual(mockAccount);
    });

    it('should handle non-existent account', async () => {
      const error = new Error('Account not found');
      mockAlgodClient.getAccountByAddress.mockRejectedValueOnce(error);

      await expect(blockchainService.getAccount('non-existent')).rejects.toThrow('Account not found');
    });
  });

  describe('getTransaction', () => {
    it('should get transaction information', async () => {
      const mockTx = {
        id: 'test-transaction-id',
        'confirmed-round': 123,
        'round-time': 1234567890,
      };

      mockAlgodClient.pendingTransactionInformation.mockResolvedValueOnce(mockTx);

      const result = await blockchainService.getTransaction('test-transaction-id');

      expect(mockAlgodClient.pendingTransactionInformation).toHaveBeenCalledWith('test-transaction-id');
      expect(result).toEqual(mockTx);
    });

    it('should handle non-existent transaction', async () => {
      const error = new Error('Transaction not found');
      mockAlgodClient.pendingTransactionInformation.mockRejectedValueOnce(error);

      await expect(blockchainService.getTransaction('non-existent')).rejects.toThrow('Transaction not found');
    });
  });
}); 