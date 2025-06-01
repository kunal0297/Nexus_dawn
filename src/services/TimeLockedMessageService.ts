import algosdk from 'algosdk';
import { blockchainService } from './BlockchainService';
import CryptoJS from 'crypto-js';
import { TimeLockedMessage, MessageStatus } from '../types/messages';

class TimeLockedMessageService {
  private static instance: TimeLockedMessageService;
  private algodClient: algosdk.Algodv2;
  private readonly MESSAGE_APP_ID: number;
  private readonly ENCRYPTION_KEY: string;

  private constructor() {
    this.algodClient = new algosdk.Algodv2(
      process.env.REACT_APP_ALGORAND_TOKEN || '',
      process.env.REACT_APP_ALGORAND_SERVER || '',
      process.env.REACT_APP_ALGORAND_PORT || ''
    );

    this.MESSAGE_APP_ID = Number(process.env.REACT_APP_MESSAGE_APP_ID) || 0;
    this.ENCRYPTION_KEY = process.env.REACT_APP_MESSAGE_ENCRYPTION_KEY || '';
  }

  public static getInstance(): TimeLockedMessageService {
    if (!TimeLockedMessageService.instance) {
      TimeLockedMessageService.instance = new TimeLockedMessageService();
    }
    return TimeLockedMessageService.instance;
  }

  private encryptMessage(message: string): string {
    return CryptoJS.AES.encrypt(message, this.ENCRYPTION_KEY).toString();
  }

  private decryptMessage(encryptedMessage: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, this.ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  public async scheduleMessage(
    message: string,
    unlockTimestamp: number,
    recipient: string
  ): Promise<string> {
    try {
      const encryptedMessage = this.encryptMessage(message);
      
      const messageData: TimeLockedMessage = {
        sender: blockchainService.getState().account!,
        recipient,
        encryptedMessage,
        unlockTimestamp,
        status: MessageStatus.PENDING,
        createdAt: Date.now()
      };

      // Create Algorand transaction
      const params = await this.algodClient.getTransactionParams().do();
      const note = new TextEncoder().encode(JSON.stringify(messageData));

      const txn = algosdk.makeApplicationCallTxn(
        blockchainService.getState().account!,
        params,
        this.MESSAGE_APP_ID,
        [new Uint8Array(Buffer.from('schedule_message'))],
        undefined,
        undefined,
        undefined,
        note
      );

      // Sign and send transaction
      const signedTxn = await blockchainService.signTransaction(txn);
      const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();
      
      // Wait for confirmation
      await algosdk.waitForConfirmation(this.algodClient, txId, 3);
      
      return txId;
    } catch (error) {
      console.error('Error scheduling message:', error);
      throw error;
    }
  }

  public async getPendingMessages(recipient: string): Promise<TimeLockedMessage[]> {
    try {
      // Query Algorand application for pending messages
      const accountInfo = await this.algodClient.accountInformation(
        blockchainService.getState().account!
      ).do();

      const messages = accountInfo['app-local-state']?.[this.MESSAGE_APP_ID]?.key;
      if (!messages) return [];

      const allMessages: TimeLockedMessage[] = JSON.parse(
        new TextDecoder().decode(messages)
      );

      return allMessages.filter(
        msg => 
          msg.recipient === recipient && 
          msg.status === MessageStatus.PENDING &&
          msg.unlockTimestamp > Date.now()
      );
    } catch (error) {
      console.error('Error retrieving pending messages:', error);
      throw error;
    }
  }

  public async unlockMessage(messageId: string): Promise<string> {
    try {
      const params = await this.algodClient.getTransactionParams().do();
      
      const txn = algosdk.makeApplicationCallTxn(
        blockchainService.getState().account!,
        params,
        this.MESSAGE_APP_ID,
        [new Uint8Array(Buffer.from('unlock_message'))],
        [new Uint8Array(Buffer.from(messageId))]
      );

      const signedTxn = await blockchainService.signTransaction(txn);
      const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();
      
      await algosdk.waitForConfirmation(this.algodClient, txId, 3);
      
      return txId;
    } catch (error) {
      console.error('Error unlocking message:', error);
      throw error;
    }
  }

  public async getMessageContent(message: TimeLockedMessage): Promise<string> {
    if (message.status !== MessageStatus.UNLOCKED) {
      throw new Error('Message is not yet unlocked');
    }
    return this.decryptMessage(message.encryptedMessage);
  }
}

export const timeLockedMessageService = TimeLockedMessageService.getInstance(); 