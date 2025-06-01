import { EmotionData } from '../types/emotions';

interface EmpatheticResponse {
  text: string;
  emotion: string;
  intensity: number;
  suggestions?: string[];
}

export class EmpatheticAIService {
  private static instance: EmpatheticAIService;
  private readonly emotionResponses: Record<string, string[]> = {
    Joy: [
      "Your joy is contagious! I can feel the positive energy radiating from your words.",
      "It's wonderful to see you experiencing such happiness. Let's explore what brings you this joy.",
      "Your happiness is well-deserved. Would you like to share more about what's bringing you this joy?"
    ],
    Sadness: [
      "I sense your sadness, and I'm here to listen and support you through this.",
      "It's okay to feel sad. Would you like to talk about what's weighing on your heart?",
      "I understand this is a difficult time. Let's work through these feelings together."
    ],
    Anger: [
      "I notice your anger, and it's valid. Would you like to explore what's causing these feelings?",
      "Your frustration is understandable. Let's find a way to channel this energy constructively.",
      "I'm here to help you process these strong emotions. What triggered this anger?"
    ],
    Fear: [
      "I sense your fear, and it's natural to feel this way. Let's address what's causing your anxiety.",
      "Your concerns are valid. Would you like to explore ways to feel more secure?",
      "I'm here to help you navigate through these fears. What's making you feel this way?"
    ],
    Trust: [
      "Your trust means a lot. I'm here to support you in your journey.",
      "I appreciate the trust you're showing. Let's build on this foundation together.",
      "Your willingness to share is valued. How can I help you further?"
    ],
    Surprise: [
      "I can feel your surprise! Would you like to explore this unexpected turn of events?",
      "This is quite unexpected! Let's process this together.",
      "Your reaction shows this was quite a surprise. Shall we discuss what happened?"
    ],
    Anticipation: [
      "Your excitement is palpable! What are you looking forward to?",
      "I can feel your anticipation. Let's explore what's coming next.",
      "Your eagerness is contagious! Would you like to share what you're anticipating?"
    ],
    Disgust: [
      "I understand your strong reaction. Would you like to talk about what's causing this feeling?",
      "Your response is valid. Let's address what's triggering this reaction.",
      "I sense your discomfort. Shall we explore what's causing this feeling?"
    ]
  };

  private constructor() {}

  public static getInstance(): EmpatheticAIService {
    if (!EmpatheticAIService.instance) {
      EmpatheticAIService.instance = new EmpatheticAIService();
    }
    return EmpatheticAIService.instance;
  }

  public async generateResponse(
    input: string,
    emotions: EmotionData[]
  ): Promise<EmpatheticResponse> {
    // Find the dominant emotion
    const dominantEmotion = emotions.reduce((prev, current) => 
      (current.value > prev.value) ? current : prev
    );

    // Get random response for the dominant emotion
    const responses = this.emotionResponses[dominantEmotion.emotion];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    // Generate suggestions based on the emotional context
    const suggestions = this.generateSuggestions(dominantEmotion, input);

    return {
      text: randomResponse,
      emotion: dominantEmotion.emotion,
      intensity: dominantEmotion.value,
      suggestions
    };
  }

  private generateSuggestions(emotion: EmotionData, input: string): string[] {
    const suggestions: string[] = [];
    
    // Add emotion-specific suggestions
    switch (emotion.emotion) {
      case 'Joy':
        suggestions.push(
          "Would you like to explore what brings you this happiness?",
          "Shall we discuss how to maintain this positive state?"
        );
        break;
      case 'Sadness':
        suggestions.push(
          "Would you like to talk about what's causing this sadness?",
          "Shall we explore ways to process these feelings?"
        );
        break;
      case 'Anger':
        suggestions.push(
          "Would you like to discuss what triggered this anger?",
          "Shall we explore healthy ways to express these feelings?"
        );
        break;
      case 'Fear':
        suggestions.push(
          "Would you like to talk about what's causing this fear?",
          "Shall we explore ways to feel more secure?"
        );
        break;
      // Add more cases for other emotions
    }

    // Add general suggestions based on input content
    if (input.toLowerCase().includes('help')) {
      suggestions.push("I'm here to help. What specific support do you need?");
    }
    if (input.toLowerCase().includes('why')) {
      suggestions.push("Let's explore the reasons behind this together.");
    }

    return suggestions;
  }
} 