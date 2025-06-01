import algosdk from 'algosdk';
import { blockchainService } from './BlockchainService';
import { Configuration, OpenAIApi } from 'openai';
import { TavusCVI } from '@tavus/cvi-sdk';
import { NarrativeState, StoryFork, NarrativeChoice } from '../types/narrative';

class NarrativeService {
  private static instance: NarrativeService;
  private algodClient: algosdk.Algodv2;
  private openai: OpenAIApi;
  private tavus: TavusCVI;
  private readonly NARRATIVE_APP_ID: number;

  private constructor() {
    this.algodClient = new algosdk.Algodv2(
      process.env.REACT_APP_ALGORAND_TOKEN || '',
      process.env.REACT_APP_ALGORAND_SERVER || '',
      process.env.REACT_APP_ALGORAND_PORT || ''
    );

    const openaiConfig = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(openaiConfig);

    this.tavus = new TavusCVI({
      apiKey: process.env.REACT_APP_TAVUS_API_KEY || '',
      modelId: process.env.REACT_APP_TAVUS_MODEL_ID || ''
    });

    this.NARRATIVE_APP_ID = Number(process.env.REACT_APP_NARRATIVE_APP_ID) || 0;
  }

  public static getInstance(): NarrativeService {
    if (!NarrativeService.instance) {
      NarrativeService.instance = new NarrativeService();
    }
    return NarrativeService.instance;
  }

  private async generateStoryFork(
    currentState: NarrativeState,
    choice: NarrativeChoice
  ): Promise<StoryFork> {
    try {
      const prompt = `
        Current story state:
        ${JSON.stringify(currentState, null, 2)}
        
        User choice:
        ${JSON.stringify(choice, null, 2)}
        
        Generate a new story branch that follows from this choice. Include:
        1. A narrative description of what happens next
        2. 2-3 new choices for the user
        3. The emotional impact of this decision
        4. Any changes to the world state
        
        Format the response as a JSON object with:
        {
          "description": "narrative text",
          "choices": [
            {
              "id": "unique_id",
              "text": "choice text",
              "impact": "emotional impact"
            }
          ],
          "worldState": {
            "key": "value"
          }
        }
      `;

      const response = await this.openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 500,
        temperature: 0.7
      });

      const forkData = JSON.parse(response.data.choices[0].text || '{}');
      
      return {
        id: Date.now().toString(),
        parentId: currentState.currentForkId,
        description: forkData.description,
        choices: forkData.choices,
        worldState: forkData.worldState,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error generating story fork:', error);
      throw error;
    }
  }

  public async createNarrativeFork(
    currentState: NarrativeState,
    choice: NarrativeChoice
  ): Promise<StoryFork> {
    try {
      // Generate new story branch
      const newFork = await this.generateStoryFork(currentState, choice);
      
      // Update narrative state
      const updatedState: NarrativeState = {
        ...currentState,
        currentForkId: newFork.id,
        forks: [...currentState.forks, newFork],
        worldState: {
          ...currentState.worldState,
          ...newFork.worldState
        }
      };

      // Store on Algorand
      const params = await this.algodClient.getTransactionParams().do();
      const note = new TextEncoder().encode(JSON.stringify(updatedState));

      const txn = algosdk.makeApplicationCallTxn(
        blockchainService.getState().account!,
        params,
        this.NARRATIVE_APP_ID,
        [new Uint8Array(Buffer.from('update_narrative'))],
        undefined,
        undefined,
        undefined,
        note
      );

      const signedTxn = await blockchainService.signTransaction(txn);
      const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();
      
      await algosdk.waitForConfirmation(this.algodClient, txId, 3);

      // Generate avatar narration
      await this.tavus.speak(newFork.description, {
        emotion: this.determineEmotion(newFork),
        style: 'narrative'
      });

      return newFork;
    } catch (error) {
      console.error('Error creating narrative fork:', error);
      throw error;
    }
  }

  private determineEmotion(fork: StoryFork): string {
    // Simple emotion detection based on keywords
    const text = fork.description.toLowerCase();
    if (text.includes('happy') || text.includes('joy')) return 'happy';
    if (text.includes('sad') || text.includes('grief')) return 'sad';
    if (text.includes('angry') || text.includes('rage')) return 'angry';
    if (text.includes('fear') || text.includes('scared')) return 'fearful';
    return 'neutral';
  }

  public async getNarrativeState(userId: string): Promise<NarrativeState | null> {
    try {
      const accountInfo = await this.algodClient.accountInformation(
        blockchainService.getState().account!
      ).do();

      const stateData = accountInfo['app-local-state']?.[this.NARRATIVE_APP_ID]?.key;
      if (!stateData) return null;

      return JSON.parse(new TextDecoder().decode(stateData));
    } catch (error) {
      console.error('Error retrieving narrative state:', error);
      throw error;
    }
  }

  public async initializeNarrative(userId: string): Promise<NarrativeState> {
    try {
      const initialFork: StoryFork = {
        id: 'root',
        parentId: null,
        description: 'You find yourself at the beginning of your journey...',
        choices: [
          {
            id: 'choice1',
            text: 'Take the path through the forest',
            impact: 'A sense of adventure fills you'
          },
          {
            id: 'choice2',
            text: 'Follow the river downstream',
            impact: 'The sound of flowing water calms you'
          }
        ],
        worldState: {
          location: 'crossroads',
          time: 'dawn'
        },
        timestamp: Date.now()
      };

      const initialState: NarrativeState = {
        userId,
        currentForkId: 'root',
        forks: [initialFork],
        worldState: initialFork.worldState,
        createdAt: Date.now(),
        lastUpdated: Date.now()
      };

      // Store on Algorand
      const params = await this.algodClient.getTransactionParams().do();
      const note = new TextEncoder().encode(JSON.stringify(initialState));

      const txn = algosdk.makeApplicationCallTxn(
        blockchainService.getState().account!,
        params,
        this.NARRATIVE_APP_ID,
        [new Uint8Array(Buffer.from('initialize_narrative'))],
        undefined,
        undefined,
        undefined,
        note
      );

      const signedTxn = await blockchainService.signTransaction(txn);
      const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();
      
      await algosdk.waitForConfirmation(this.algodClient, txId, 3);

      // Generate initial avatar narration
      await this.tavus.speak(initialFork.description, {
        emotion: 'neutral',
        style: 'narrative'
      });

      return initialState;
    } catch (error) {
      console.error('Error initializing narrative:', error);
      throw error;
    }
  }
}

export const narrativeService = NarrativeService.getInstance(); 