import { Agent } from '../agent/Agent';
import { MemoryManager } from '../memory/MemoryManager';
import { EmotionalState, MemoryContext } from '../memory/types';

interface PromptTemplate {
  template: string;
  weight: number;
  conditions: (state: EmotionalState) => boolean;
}

export class MoodAdaptivePrompting {
  private agent: Agent;
  private memoryManager: MemoryManager;
  private promptTemplates: PromptTemplate[];
  private readonly MAX_MEMORIES = 5;
  private readonly SIMILARITY_THRESHOLD = 0.3;

  constructor(agent: Agent, memoryManager: MemoryManager) {
    this.agent = agent;
    this.memoryManager = memoryManager;
    this.promptTemplates = this.initializePromptTemplates();
  }

  private initializePromptTemplates(): PromptTemplate[] {
    return [
      {
        template: 'With high emotional intensity ({emotionalState}), engage with: {input}',
        weight: 1.0,
        conditions: (state) => state.arousal > 0.7
      },
      {
        template: 'Given the emotional context of {emotionalState}, respond to: {input}',
        weight: 1.0,
        conditions: (state) => state.valence > 0.5 && state.arousal > 0.5
      },
      {
        template: 'Considering the calm state ({emotionalState}), address: {input}',
        weight: 1.0,
        conditions: (state) => state.arousal < 0.3
      },
      {
        template: 'In a balanced emotional state ({emotionalState}), respond to: {input}',
        weight: 0.5,
        conditions: () => true // Default template with lower weight
      }
    ];
  }

  public async generatePrompt(
    input: string,
    emotionalState: EmotionalState,
    context: MemoryContext
  ): Promise<string> {
    try {
      // Retrieve similar memories to influence the prompt
      const similarMemories = await this.retrieveRelevantMemories(emotionalState);

      // Calculate emotional influence from memories
      const emotionalInfluence = this.calculateEmotionalInfluence(similarMemories);

      // Select appropriate prompt template
      const template = this.selectPromptTemplate(emotionalState);

      // Generate context-aware prompt
      const prompt = await this.buildPrompt(
        input,
        emotionalState,
        context,
        emotionalInfluence,
        template,
        similarMemories
      );

      return prompt;
    } catch (error) {
      console.error('Error generating prompt:', error);
      return this.generateFallbackPrompt(input, emotionalState);
    }
  }

  private async retrieveRelevantMemories(emotionalState: EmotionalState) {
    try {
      const memories = await this.memoryManager.retrieveSimilarMemories(
        emotionalState,
        this.MAX_MEMORIES
      );
      
      // Filter memories based on similarity threshold
      const filteredMemories = memories.filter(memory => {
        const similarity = this.calculateSimilarity(memory.emotionalState, emotionalState);
        return similarity > this.SIMILARITY_THRESHOLD;
      });

      return filteredMemories;
    } catch (error) {
      console.error('Error retrieving memories:', error);
      return [];
    }
  }

  private calculateEmotionalInfluence(memories: any[]): number {
    if (memories.length === 0) return 0;

    const totalInfluence = memories.reduce((sum, memory) => {
      const similarity = this.calculateSimilarity(
        memory.emotionalState,
        this.agent.getContext().currentEmotionalState
      );
      return sum + similarity;
    }, 0);

    return totalInfluence / memories.length;
  }

  private calculateSimilarity(state1: EmotionalState, state2: EmotionalState): number {
    const valenceDiff = Math.abs(state1.valence - state2.valence);
    const arousalDiff = Math.abs(state1.arousal - state2.arousal);
    const dominanceDiff = Math.abs(state1.dominance - state2.dominance);

    // Calculate similarity as 1 - average difference
    const similarity = 1 - (valenceDiff + arousalDiff + dominanceDiff) / 3;
    return Math.max(0, Math.min(1, similarity)); // Ensure result is between 0 and 1
  }

  private selectPromptTemplate(emotionalState: EmotionalState): PromptTemplate {
    // First, get all templates that match the conditions
    const matchingTemplates = this.promptTemplates.filter(t => t.conditions(emotionalState));
    
    // If no templates match, return the default template
    if (matchingTemplates.length === 0) {
      return this.promptTemplates[this.promptTemplates.length - 1];
    }

    // If only one template matches, return it
    if (matchingTemplates.length === 1) {
      return matchingTemplates[0];
    }

    // If multiple templates match, prioritize non-default templates
    const nonDefaultTemplates = matchingTemplates.filter(t => t.weight > 0.5);
    if (nonDefaultTemplates.length > 0) {
      return nonDefaultTemplates.sort((a, b) => b.weight - a.weight)[0];
    }

    // If only default template matches, return it
    return matchingTemplates[0];
  }

  private async buildPrompt(
    input: string,
    emotionalState: EmotionalState,
    context: MemoryContext,
    emotionalInfluence: number,
    template: PromptTemplate,
    memories: any[]
  ): Promise<string> {
    const emotionalContext = this.formatEmotionalContext(emotionalState, emotionalInfluence);
    const memoryContext = this.formatMemoryContext(memories);
    
    let prompt = template.template
      .replace('{emotionalState}', emotionalContext)
      .replace('{input}', input);

    // Add context and memory influence only if not in error state
    if (!prompt.includes('Error occurred')) {
      prompt += `\n\nContext: ${context.description}`;
      prompt += `\nMemory Influence: ${memoryContext}`;
    }

    return prompt;
  }

  private formatEmotionalContext(state: EmotionalState, influence: number): string {
    return `valence: ${state.valence.toFixed(2)}, arousal: ${state.arousal.toFixed(2)}, dominance: ${state.dominance.toFixed(2)} (influence: ${influence.toFixed(2)})`;
  }

  private formatMemoryContext(memories: any[]): string {
    if (memories.length === 0) return 'No relevant memories';
    return `Based on ${memories.length} similar experiences`;
  }

  private generateFallbackPrompt(input: string, emotionalState: EmotionalState): string {
    return `Error occurred while generating prompt.\nEmotional State: ${JSON.stringify(emotionalState)}\nInput: ${input}`;
  }
} 