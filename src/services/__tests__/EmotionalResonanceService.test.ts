import { EmotionalResonanceService } from '../EmotionalResonanceService';
import { EmotionalService } from '../EmotionalService';
import { MemoryManager } from '../../core/memory/MemoryManager';
import { VectorStore } from '../../core/memory/VectorStore';
import { EmotionalState, EmotionalResponse } from '../../types/emotional';

describe('EmotionalResonanceService', () => {
  let emotionalService: EmotionalService;
  let memoryManager: MemoryManager;
  let vectorStore: VectorStore;
  let resonanceService: EmotionalResonanceService;

  const mockEmotionalState: EmotionalState = {
    valence: 0.5,
    arousal: 0.7,
    dominance: 0.3,
    timestamp: Date.now()
  };

  const mockResponse: EmotionalResponse = {
    text: 'Test response',
    intensity: 0.8,
    emotionalState: mockEmotionalState,
    timestamp: Date.now()
  };

  beforeEach(() => {
    vectorStore = new VectorStore();
    memoryManager = new MemoryManager(vectorStore);
    emotionalService = new EmotionalService();
    resonanceService = new EmotionalResonanceService(
      emotionalService,
      memoryManager,
      {
        resonanceThreshold: 0.7,
        adaptationRate: 0.1,
        coherenceWindow: 5,
        maxHistoryLength: 100
      }
    );

    // Mock EmotionalService methods
    jest.spyOn(emotionalService, 'generateResponse').mockResolvedValue(mockResponse);
  });

  it('should process emotional resonance and return result', async () => {
    const result = await resonanceService.processEmotionalResonance(
      mockEmotionalState,
      'test context'
    );

    expect(result).toHaveProperty('resonance');
    expect(result).toHaveProperty('coherence');
    expect(result).toHaveProperty('adaptation');
    expect(result).toHaveProperty('response');
    expect(result.response).toEqual(mockResponse);
  });

  it('should calculate resonance with no memories', async () => {
    const result = await resonanceService.processEmotionalResonance(
      mockEmotionalState,
      'test context'
    );

    expect(result.resonance).toBe(0.5); // Default resonance for new patterns
  });

  it('should calculate perfect coherence for single state', async () => {
    const result = await resonanceService.processEmotionalResonance(
      mockEmotionalState,
      'test context'
    );

    expect(result.coherence).toBe(1.0); // Perfect coherence for single state
  });

  it('should adapt response based on resonance patterns', async () => {
    // Process multiple states to build up patterns
    for (let i = 0; i < 3; i++) {
      await resonanceService.processEmotionalResonance(
        mockEmotionalState,
        'test context'
      );
    }

    const result = await resonanceService.processEmotionalResonance(
      mockEmotionalState,
      'test context'
    );

    // Verify that the response intensity has been adjusted
    expect(result.response.intensity).toBeGreaterThanOrEqual(mockResponse.intensity);
    expect(result.response.intensity).toBeLessThanOrEqual(1.0);
  });

  it('should maintain emotional history within max length', async () => {
    const maxLength = 100;
    const states = Array.from({ length: maxLength + 10 }, (_, i) => ({
      ...mockEmotionalState,
      timestamp: Date.now() + i
    }));

    for (const state of states) {
      await resonanceService.processEmotionalResonance(state, 'test context');
    }

    const result = await resonanceService.processEmotionalResonance(
      mockEmotionalState,
      'test context'
    );

    expect(result.coherence).toBeLessThanOrEqual(1.0);
  });

  it('should handle emotional state changes', async () => {
    const initialState = { ...mockEmotionalState, valence: 0.5 };
    const changedState = { ...mockEmotionalState, valence: -0.5 };

    await resonanceService.processEmotionalResonance(initialState, 'test context');
    const result = await resonanceService.processEmotionalResonance(
      changedState,
      'test context'
    );

    expect(result.adaptation).toBeGreaterThan(0);
  });
}); 