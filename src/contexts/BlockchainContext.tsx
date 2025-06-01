import React, { createContext, useContext, useState, useEffect } from 'react';
import algosdk from 'algosdk';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import CryptoJS from 'crypto-js';

interface BlockchainContextType {
  account: string | null;
  balance: number;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  generateDID: () => string;
  storeInteraction: (interaction: any) => Promise<string>;
  sendPayment: (recipient: string, amount: number) => Promise<string>;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

// Algorand configuration
const algodClient = new algosdk.Algodv2(
  process.env.REACT_APP_ALGORAND_TOKEN || '',
  process.env.REACT_APP_ALGORAND_SERVER || '',
  process.env.REACT_APP_ALGORAND_PORT || ''
);

const myAlgoConnect = new MyAlgoConnect();

export const BlockchainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check for existing connection
    const storedAccount = localStorage.getItem('algorand_account');
    if (storedAccount) {
      setAccount(storedAccount);
      setIsConnected(true);
      fetchBalance(storedAccount);
    }
  }, []);

  const fetchBalance = async (address: string) => {
    try {
      const accountInfo = await algodClient.accountInformation(address).do();
      setBalance(accountInfo.amount / 1e6); // Convert microAlgos to Algos
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  const connectWallet = async () => {
    try {
      const accounts = await myAlgoConnect.connect();
      const selectedAccount = accounts[0].address;
      
      setAccount(selectedAccount);
      setIsConnected(true);
      localStorage.setItem('algorand_account', selectedAccount);
      
      await fetchBalance(selectedAccount);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
    setBalance(0);
    localStorage.removeItem('algorand_account');
  };

  const generateDID = () => {
    if (!account) throw new Error('Wallet not connected');
    
    // Generate a unique DID based on the account address and timestamp
    const timestamp = Date.now();
    const didString = `${account}-${timestamp}`;
    return CryptoJS.SHA256(didString).toString();
  };

  const storeInteraction = async (interaction: any) => {
    if (!account) throw new Error('Wallet not connected');

    try {
      // Create a note with the interaction data
      const note = new TextEncoder().encode(JSON.stringify(interaction));
      
      // Get suggested parameters
      const params = await algodClient.getTransactionParams().do();
      
      // Create transaction
      const txn = algosdk.makePaymentTxnWithSuggestedParams(
        account,
        account, // Send to self (for storage)
        0, // 0 Algos
        note,
        params
      );

      // Sign and send transaction
      const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
      const { txId } = await algodClient.sendRawTransaction(signedTxn.blob).do();
      
      // Wait for confirmation
      await algosdk.waitForConfirmation(algodClient, txId, 3);
      
      return txId;
    } catch (error) {
      console.error('Failed to store interaction:', error);
      throw error;
    }
  };

  const sendPayment = async (recipient: string, amount: number) => {
    if (!account) throw new Error('Wallet not connected');

    try {
      // Get suggested parameters
      const params = await algodClient.getTransactionParams().do();
      
      // Create transaction (amount in microAlgos)
      const txn = algosdk.makePaymentTxnWithSuggestedParams(
        account,
        recipient,
        amount * 1e6,
        undefined,
        params
      );

      // Sign and send transaction
      const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
      const { txId } = await algodClient.sendRawTransaction(signedTxn.blob).do();
      
      // Wait for confirmation
      await algosdk.waitForConfirmation(algodClient, txId, 3);
      
      // Update balance
      await fetchBalance(account);
      
      return txId;
    } catch (error) {
      console.error('Failed to send payment:', error);
      throw error;
    }
  };

  return (
    <BlockchainContext.Provider
      value={{
        account,
        balance,
        isConnected,
        connectWallet,
        disconnectWallet,
        generateDID,
        storeInteraction,
        sendPayment,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (context === undefined) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
}; 