import algosdk from 'algosdk';
import { blockchainService } from './BlockchainService';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PersonalityShard } from '../types/personality';
import { NarrativeState, StoryFork, NarrativeChoice } from '../types/narrative';

export class NarrativeService {
  private static instance: NarrativeService;
  private algodClient: algosdk.Algodv2;
  private genAI: GoogleGenerativeAI;
  private model: any;
  private readonly NARRATIVE_APP_ID: number;

  private constructor() {
    this.algodClient = new algosdk.Algodv2(
      process.env.REACT_APP_ALGORAND_TOKEN || '',
      process.env.REACT_APP_ALGORAND_SERVER || '',
      process.env.REACT_APP_ALGORAND_PORT || ''
    );

    this.genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || '');
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

    this.NARRATIVE_APP_ID = Number(process.env.REACT_APP_NARRATIVE_APP_ID) || 0;
  }

  public static getInstance(): NarrativeService {
    if (!NarrativeService.instance) {
      NarrativeService.instance = new NarrativeService();
    }
    return NarrativeService.instance;
  }

  async generateNarrative(shards: PersonalityShard[]): Promise<string> {
    try {
      const prompt = `Generate a narrative based on these personality shards: ${JSON.stringify(shards)}`;
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating narrative:', error);
      throw error;
    }
  }

  async analyzeNarrative(narrative: string): Promise<{
    themes: string[];
    emotionalTone: string;
    complexity: number;
  }> {
    try {
      const prompt = `Analyze this narrative and provide themes, emotional tone, and complexity: ${narrative}`;
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const analysis = JSON.parse(response.text());

      return {
        themes: analysis.themes || [],
        emotionalTone: analysis.emotionalTone || 'neutral',
        complexity: analysis.complexity || 0.5,
      };
    } catch (error) {
      console.error('Error analyzing narrative:', error);
      throw error;
    }
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

      const response = await this.model.generateContent(prompt);
      const result = await response.response;
      const forkData = JSON.parse(result.text());
      
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

      return newFork;
    } catch (error) {
      console.error('Error creating narrative fork:', error);
      throw error;
    }
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

      return initialState;
    } catch (error) {
      console.error('Error initializing narrative:', error);
      throw error;
    }
  }
}

export const narrativeService = NarrativeService.getInstance(); 