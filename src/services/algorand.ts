import algosdk from 'algosdk';
import { env } from '../config/env.validation';

interface EmotionalNFT {
  id: string;
  title: string;
  description: string;
  timestamp: number;
  emotions: {
    valence: number;
    arousal: number;
    dominance: number;
  };
  journalEntry?: string;
  imageUrl?: string;
}

export class AlgorandService {
  private static instance: AlgorandService;
  private algodClient: algosdk.Algodv2;
  private indexerClient: algosdk.Indexer;
  private creatorAddress: string;
  private creatorMnemonic: string;

  private constructor() {
    this.algodClient = new algosdk.Algodv2(
      env.VITE_ALGORAND_API_KEY,
      env.VITE_ALGORAND_SERVER,
      env.VITE_ALGORAND_PORT
    );
    this.indexerClient = new algosdk.Indexer(
      env.VITE_ALGORAND_INDEXER_API_KEY,
      env.VITE_ALGORAND_INDEXER_SERVER,
      env.VITE_ALGORAND_INDEXER_PORT
    );
    this.creatorAddress = env.VITE_ALGORAND_CREATOR_ADDRESS;
    this.creatorMnemonic = env.VITE_ALGORAND_CREATOR_MNEMONIC;
  }

  public static getInstance(): AlgorandService {
    if (!AlgorandService.instance) {
      AlgorandService.instance = new AlgorandService();
    }
    return AlgorandService.instance;
  }

  public async mintEmotionalNFT(
    nft: Omit<EmotionalNFT, 'id'>
  ): Promise<EmotionalNFT> {
    try {
      // Create asset metadata
      const metadata = {
        name: nft.title,
        description: nft.description,
        properties: {
          timestamp: nft.timestamp,
          emotions: nft.emotions,
          journalEntry: nft.journalEntry,
          imageUrl: nft.imageUrl,
        },
      };

      // Create asset
      const suggestedParams = await this.algodClient.getTransactionParams().do();
      const creatorAccount = algosdk.mnemonicToSecretKey(this.creatorMnemonic);

      const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
        this.creatorAddress,
        algosdk.encodeObj(metadata),
        1, // Total supply
        0, // Decimals
        false, // Default frozen
        this.creatorAddress,
        suggestedParams
      );

      // Sign and submit transaction
      const signedTxn = txn.signTxn(creatorAccount.sk);
      const txId = await this.algodClient.sendRawTransaction(signedTxn).do();
      await this.algodClient.waitForConfirmation(txId, 5);

      // Get asset ID from transaction
      const ptx = await this.algodClient.pendingTransactionInformation(txId).do();
      const assetId = ptx['asset-index'];

      return {
        ...nft,
        id: assetId.toString(),
      };
    } catch (error) {
      console.error('Error minting Emotional NFT:', error);
      throw error;
    }
  }

  public async getEmotionalNFTs(address: string): Promise<EmotionalNFT[]> {
    try {
      const response = await this.indexerClient
        .lookupAccountAssets(address)
        .do();

      const nfts: EmotionalNFT[] = [];
      for (const asset of response.assets) {
        if (asset.creator === this.creatorAddress) {
          const metadata = algosdk.decodeObj(asset.params.url);
          nfts.push({
            id: asset.index.toString(),
            title: metadata.name,
            description: metadata.description,
            timestamp: metadata.properties.timestamp,
            emotions: metadata.properties.emotions,
            journalEntry: metadata.properties.journalEntry,
            imageUrl: metadata.properties.imageUrl,
          });
        }
      }

      return nfts;
    } catch (error) {
      console.error('Error fetching Emotional NFTs:', error);
      throw error;
    }
  }

  public async transferEmotionalNFT(
    nftId: string,
    fromAddress: string,
    toAddress: string
  ): Promise<void> {
    try {
      const suggestedParams = await this.algodClient.getTransactionParams().do();
      const fromAccount = algosdk.mnemonicToSecretKey(this.creatorMnemonic);

      const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        fromAddress,
        toAddress,
        undefined,
        undefined,
        1,
        undefined,
        parseInt(nftId),
        suggestedParams
      );

      const signedTxn = txn.signTxn(fromAccount.sk);
      const txId = await this.algodClient.sendRawTransaction(signedTxn).do();
      await this.algodClient.waitForConfirmation(txId, 5);
    } catch (error) {
      console.error('Error transferring Emotional NFT:', error);
      throw error;
    }
  }
} 