import { useState, useEffect } from 'react';
import { blockchainService } from '../services/BlockchainService';

interface IdentityState {
  isConnected: boolean;
  balance: number;
  account: string | null;
  identity: string | null;
}

export const useIdentity = () => {
  const [state, setState] = useState<IdentityState>({
    isConnected: false,
    balance: 0,
    account: null,
    identity: null
  });

  useEffect(() => {
    // Initialize state from blockchain service
    const serviceState = blockchainService.getState();
    setState(prev => ({
      ...prev,
      ...serviceState
    }));

    // Subscribe to blockchain state changes
    const unsubscribe = blockchainService.subscribe(({ isConnected, balance }) => {
      setState(prev => ({
        ...prev,
        isConnected,
        balance
      }));
    });

    return () => unsubscribe();
  }, []);

  const connect = async () => {
    const success = await blockchainService.connect();
    if (success) {
      const identity = await blockchainService.createIdentity();
      setState(prev => ({ ...prev, identity }));
    }
    return success;
  };

  const disconnect = () => {
    blockchainService.disconnect();
    setState(prev => ({ ...prev, identity: null }));
  };

  const saveInteraction = async (data: any) => {
    try {
      const txId = await blockchainService.saveInteraction(data);
      return { success: true, txId };
    } catch (error) {
      console.error('Failed to save interaction:', error);
      return { success: false, error };
    }
  };

  const sendPayment = async (recipient: string, amount: number) => {
    try {
      const txId = await blockchainService.transferFunds(recipient, amount);
      return { success: true, txId };
    } catch (error) {
      console.error('Failed to send payment:', error);
      return { success: false, error };
    }
  };

  return {
    ...state,
    connect,
    disconnect,
    saveInteraction,
    sendPayment
  };
}; 