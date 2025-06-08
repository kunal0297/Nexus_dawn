import { useState, useEffect, useCallback } from 'react';
import { useStore } from '../store';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

export const useWallet = () => {
  const [state, setState] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
    error: null,
  });

  const connect = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isConnecting: true, error: null }));

      // Check if AlgoSigner is available
      if (typeof window.AlgoSigner !== 'undefined') {
        const accounts = await window.AlgoSigner.connect();
        if (accounts && accounts.length > 0) {
          setState({
            address: accounts[0].address,
            isConnected: true,
            isConnecting: false,
            error: null,
          });
          return;
        }
      }

      // Check if MyAlgo is available
      if (typeof window.MyAlgoConnect !== 'undefined') {
        const myAlgo = new window.MyAlgoConnect();
        const accounts = await myAlgo.connect();
        if (accounts && accounts.length > 0) {
          setState({
            address: accounts[0].address,
            isConnected: true,
            isConnecting: false,
            error: null,
          });
          return;
        }
      }

      throw new Error('No wallet provider found');
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isConnecting: false,
        error: error.message,
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    setState({
      address: null,
      isConnected: false,
      isConnecting: false,
      error: null,
    });
  }, []);

  useEffect(() => {
    // Check for existing connection
    const checkConnection = async () => {
      try {
        if (typeof window.AlgoSigner !== 'undefined') {
          const accounts = await window.AlgoSigner.accounts({
            ledger: 'TestNet',
          });
          if (accounts && accounts.length > 0) {
            setState({
              address: accounts[0].address,
              isConnected: true,
              isConnecting: false,
              error: null,
            });
            return;
          }
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };

    checkConnection();
  }, []);

  return {
    ...state,
    connect,
    disconnect,
  };
}; 