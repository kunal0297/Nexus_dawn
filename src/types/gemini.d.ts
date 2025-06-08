declare module '@google/generative-ai' {
  export class GoogleGenerativeAI {
    constructor(apiKey: string);
    getGenerativeModel(params: { model: string }): GenerativeModel;
  }

  export class GenerativeModel {
    generateContent(prompt: string): Promise<GenerateContentResponse>;
    embedContent(text: string): Promise<EmbedContentResponse>;
  }

  export interface GenerateContentResponse {
    response: {
      text(): Promise<string>;
    };
  }

  export interface EmbedContentResponse {
    embedding: {
      values: number[];
    };
  }
} 