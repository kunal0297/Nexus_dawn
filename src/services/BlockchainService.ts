import algosdk from 'algosdk';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import CryptoJS from 'crypto-js';

class BlockchainService {
  private static instance: BlockchainService;
  private algodClient: algosdk.Algodv2;
  private myAlgoConnect: MyAlgoConnect;
  private account: string | null = null;
  private balance: number = 0;
  private isConnected: boolean = false;
  private listeners: Set<(state: { isConnected: boolean; balance: number }) => void> = new Set();

  private constructor() {
    this.algodClient = new algosdk.Algodv2(
      process.env.REACT_APP_ALGORAND_TOKEN || '',
      process.env.REACT_APP_ALGORAND_SERVER || '',
      process.env.REACT_APP_ALGORAND_PORT || ''
    );
    this.myAlgoConnect = new MyAlgoConnect();
    this.initializeFromStorage();
  }

  public static getInstance(): BlockchainService {
    if (!BlockchainService.instance) {
      BlockchainService.instance = new BlockchainService();
    }
    return BlockchainService.instance;
  }

  private initializeFromStorage() {
    const storedAccount = localStorage.getItem('algorand_account');
    if (storedAccount) {
      this.account = storedAccount;
      this.isConnected = true;
      this.fetchBalance(storedAccount);
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => 
      listener({ isConnected: this.isConnected, balance: this.balance })
    );
  }

  public subscribe(listener: (state: { isConnected: boolean; balance: number }) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private async fetchBalance(address: string) {
    try {
      const accountInfo = await this.algodClient.accountInformation(address).do();
      this.balance = accountInfo.amount / 1e6;
      this.notifyListeners();
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  }

  public async connect() {
    try {
      const accounts = await this.myAlgoConnect.connect();
      this.account = accounts[0].address;
      this.isConnected = true;
      localStorage.setItem('algorand_account', this.account);
      await this.fetchBalance(this.account);
      return true;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      return false;
    }
  }

  public disconnect() {
    this.account = null;
    this.isConnected = false;
    this.balance = 0;
    localStorage.removeItem('algorand_account');
    this.notifyListeners();
  }

  public getState() {
    return {
      account: this.account,
      balance: this.balance,
      isConnected: this.isConnected
    };
  }

  public async createIdentity() {
    if (!this.account) throw new Error('Wallet not connected');
    const timestamp = Date.now();
    const didString = `${this.account}-${timestamp}`;
    return CryptoJS.SHA256(didString).toString();
  }

  public async saveInteraction(data: any) {
    if (!this.account) throw new Error('Wallet not connected');

    try {
      const note = new TextEncoder().encode(JSON.stringify(data));
      const params = await this.algodClient.getTransactionParams().do();
      
      const txn = algosdk.makePaymentTxnWithSuggestedParams(
        this.account,
        this.account,
        0,
        note,
        params
      );

      const signedTxn = await this.myAlgoConnect.signTransaction(txn.toByte());
      const { txId } = await this.algodClient.sendRawTransaction(signedTxn.blob).do();
      
      await algosdk.waitForConfirmation(this.algodClient, txId, 3);
      return txId;
    } catch (error) {
      console.error('Failed to save interaction:', error);
      throw error;
    }
  }

  public async transferFunds(recipient: string, amount: number) {
    if (!this.account) throw new Error('Wallet not connected');

    try {
      const params = await this.algodClient.getTransactionParams().do();
      const txn = algosdk.makePaymentTxnWithSuggestedParams(
        this.account,
        recipient,
        amount * 1e6,
        undefined,
        params
      );

      const signedTxn = await this.myAlgoConnect.signTransaction(txn.toByte());
      const { txId } = await this.algodClient.sendRawTransaction(signedTxn.blob).do();
      
      await algosdk.waitForConfirmation(this.algodClient, txId, 3);
      await this.fetchBalance(this.account);
      
      return txId;
    } catch (error) {
      console.error('Failed to transfer funds:', error);
      throw error;
    }
  }
}

export const blockchainService = BlockchainService.getInstance(); 