import { useState, useCallback } from 'react';
import { useBlockchain } from '../contexts/BlockchainContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { EncryptionService } from '../services/encryption';
import { SanitizationService } from '../services/sanitization';
import { env } from '../config/env.validation';

interface IdentityState {
  isConnected: boolean;
  account: string | null;
  balance: number;
  isCreating: boolean;
  error: string | null;
}

export function useIdentity() {
  const { 
    account,
    balance,
    isConnected,
    connectWallet,
    disconnectWallet,
    generateDID,
    storeInteraction,
    sendPayment
  } = useBlockchain();
  const { currentTier } = useSubscription();
  const [state, setState] = useState<IdentityState>({
    isConnected,
    account,
    balance,
    isCreating: false,
    error: null
  });

  const handleConnect = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, error: null }));
      await connectWallet();
      
      // Encrypt sensitive data
      const encryptedAccount = account ? EncryptionService.encrypt(account) : null;
      
      setState(prev => ({
        ...prev,
        isConnected: true,
        account: encryptedAccount,
        balance
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to connect'
      }));
    }
  }, [connectWallet, account, balance]);

  const handleDisconnect = useCallback(async () => {
    try {
      disconnectWallet();
      setState({
        isConnected: false,
        account: null,
        balance: 0,
        isCreating: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to disconnect'
      }));
    }
  }, [disconnectWallet]);

  const handleCreateIdentity = useCallback(async () => {
    if (currentTier === 'observer') {
      setState(prev => ({
        ...prev,
        error: 'Subscription required to create identity'
      }));
      return;
    }

    try {
      setState(prev => ({ ...prev, isCreating: true, error: null }));
      const did = generateDID();
      
      // Encrypt sensitive data
      const encryptedDid = EncryptionService.encrypt(did);
      
      setState(prev => ({
        ...prev,
        isCreating: false,
        account: encryptedDid
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isCreating: false,
        error: error instanceof Error ? error.message : 'Failed to create identity'
      }));
    }
  }, [generateDID, currentTier]);

  const handleSaveInteraction = useCallback(async (interaction: {
    type: string;
    data: any;
    timestamp: number;
  }) => {
    if (!state.isConnected) {
      setState(prev => ({
        ...prev,
        error: 'Must be connected to save interaction'
      }));
      return;
    }

    try {
      // Sanitize interaction data
      const sanitizedInteraction = {
        ...interaction,
        type: SanitizationService.sanitizeString(interaction.type),
        data: SanitizationService.sanitizeObject(interaction.data)
      };

      await storeInteraction(sanitizedInteraction);
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to save interaction'
      }));
    }
  }, [storeInteraction, state.isConnected]);

  const handleSendPayment = useCallback(async (recipient: string, amount: number) => {
    if (!state.isConnected) {
      setState(prev => ({
        ...prev,
        error: 'Must be connected to send payment'
      }));
      return;
    }

    try {
      // Sanitize payment data
      const sanitizedRecipient = SanitizationService.sanitizeString(recipient);

      await sendPayment(sanitizedRecipient, amount);
      setState(prev => ({ ...prev, balance }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to send payment'
      }));
    }
  }, [sendPayment, state.isConnected, balance]);

  return {
    ...state,
    connect: handleConnect,
    disconnect: handleDisconnect,
    createIdentity: handleCreateIdentity,
    saveInteraction: handleSaveInteraction,
    sendPayment: handleSendPayment
  };
} 