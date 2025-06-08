import { AgentBehavior, BehaviorCondition, BehaviorAction, AgentContext } from '../types';

export class EmotionalResponseBehavior implements AgentBehavior {
  id: string = 'emotional-response';
  name: string = 'Emotional Response';
  description: string = 'Generates emotionally appropriate responses based on current state';
  priority: number = 1;

  conditions: BehaviorCondition[] = [
    {
      type: 'emotional',
      check: (context: AgentContext) => {
        const { valence, arousal } = context.currentEmotionalState;
        return valence > 0.3 && arousal > 0.3;
      }
    }
  ];

  actions: BehaviorAction[] = [
    {
      type: 'state_change',
      execute: async (context: AgentContext) => {
        // Adjust emotional state based on current state
        context.currentEmotionalState.valence *= 1.1;
        context.currentEmotionalState.arousal *= 0.9;
      }
    },
    {
      type: 'response',
      execute: async (context: AgentContext) => {
        // This would be implemented in the actual response generation
        console.log('Generating emotional response...');
      }
    }
  ];
} 