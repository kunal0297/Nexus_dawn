import React from 'react';
import { useIdentity } from '../hooks/useIdentity';

export const WalletConnect: React.FC = () => {
  const {
    account,
    balance,
    isConnected,
    connect,
    disconnect,
  } = useIdentity();

  return (
    <div className="fixed top-4 right-4 z-50">
      {isConnected ? (
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm text-gray-400">Connected</p>
              <p className="text-sm font-mono">
                {account?.slice(0, 6)}...{account?.slice(-4)}
              </p>
              <p className="text-sm text-green-400">{balance.toFixed(2)} ALGO</p>
            </div>
            <button
              onClick={disconnect}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={connect}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}; 