const algosdk = {
  Algodv2: jest.fn().mockImplementation(() => ({
    getTransactionParams: jest.fn().mockResolvedValue({
      fee: 1000,
      firstRound: 1,
      lastRound: 1000,
      genesisID: 'testnet-v1.0',
      genesisHash: 'test-hash',
      minFee: 1000
    }),
    sendRawTransaction: jest.fn().mockResolvedValue('test-tx-id'),
    pendingTransactionInformation: jest.fn().mockResolvedValue({
      'confirmed-round': 1,
      'pool-error': '',
      'txn': {
        'txn': {
          'amt': 1000000,
          'fee': 1000,
          'fv': 1,
          'lv': 1000,
          'rcv': 'test-receiver',
          'snd': 'test-sender',
          'type': 'pay'
        }
      }
    })
  })),
  makePaymentTxnWithSuggestedParams: jest.fn().mockReturnValue({
    signTxn: jest.fn().mockReturnValue(new Uint8Array([1, 2, 3])),
    txID: jest.fn().mockReturnValue('test-tx-id')
  }),
  mnemonicToSecretKey: jest.fn().mockReturnValue({
    addr: 'test-address',
    sk: new Uint8Array([1, 2, 3])
  })
};

module.exports = algosdk; 
  Algodv2: jest.fn().mockImplementation(() => ({
    getTransactionParams: jest.fn().mockResolvedValue({
      fee: 1000,
      firstRound: 1,
      lastRound: 1000,
      genesisID: 'testnet-v1.0',
      genesisHash: 'test-hash',
      minFee: 1000
    }),
    sendRawTransaction: jest.fn().mockResolvedValue('test-tx-id'),
    pendingTransactionInformation: jest.fn().mockResolvedValue({
      'confirmed-round': 1,
      'pool-error': '',
      'txn': {
        'txn': {
          'amt': 1000000,
          'fee': 1000,
          'fv': 1,
          'lv': 1000,
          'rcv': 'test-receiver',
          'snd': 'test-sender',
          'type': 'pay'
        }
      }
    })
  })),
  makePaymentTxnWithSuggestedParams: jest.fn().mockReturnValue({
    signTxn: jest.fn().mockReturnValue(new Uint8Array([1, 2, 3])),
    txID: jest.fn().mockReturnValue('test-tx-id')
  }),
  mnemonicToSecretKey: jest.fn().mockReturnValue({
    addr: 'test-address',
    sk: new Uint8Array([1, 2, 3])
  })
};

module.exports = algosdk; 