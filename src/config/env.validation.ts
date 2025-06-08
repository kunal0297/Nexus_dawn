import { z } from 'zod';
import type { ZodError } from 'zod';

const envSchema = z.object({
  // AI Services
  REACT_APP_GEMINI_API_KEY: z.string().min(1, 'Gemini API key is required'),
  REACT_APP_OPENAI_API_KEY: z.string().min(1, 'OpenAI API key is required'),
  REACT_APP_ELEVENLABS_API_KEY: z.string().min(1, 'ElevenLabs API key is required'),
  
  // LiveKit
  REACT_APP_LIVEKIT_API_KEY: z.string().min(1, 'LiveKit API key is required'),
  REACT_APP_LIVEKIT_API_SECRET: z.string().min(1, 'LiveKit API secret is required'),
  REACT_APP_LIVEKIT_URL: z.string().url('Invalid LiveKit URL'),
  
  // Blockchain
  REACT_APP_ALGORAND_TOKEN: z.string().min(1, 'Algorand token is required'),
  REACT_APP_ALGORAND_SERVER: z.string().url('Invalid Algorand server URL'),
  REACT_APP_ALGORAND_PORT: z.string().regex(/^[0-9]+$/, 'Port must be a number'),
  REACT_APP_NARRATIVE_APP_ID: z.string().regex(/^[0-9]+$/, 'App ID must be a number'),
  
  // Supabase
  REACT_APP_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  REACT_APP_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anon key is required'),
  
  // Reddit
  REACT_APP_REDDIT_CLIENT_ID: z.string().min(1, 'Reddit client ID is required'),
  REACT_APP_REDDIT_CLIENT_SECRET: z.string().min(1, 'Reddit client secret is required'),
  
  // Feature Flags
  REACT_APP_ENABLE_QUANTUM_MODE: z.enum(['true', 'false']).default('false'),
  REACT_APP_ENABLE_VOICE_SYNTHESIS: z.enum(['true', 'false']).default('true'),
  REACT_APP_ENABLE_EMOTION_ENGINE: z.enum(['true', 'false']).default('true'),
  
  // Security
  REACT_APP_ENCRYPTION_KEY: z.string().min(32, 'Encryption key must be at least 32 characters'),
  REACT_APP_JWT_SECRET: z.string().min(32, 'JWT secret must be at least 32 characters'),
  
  // Analytics & Monitoring
  REACT_APP_SENTRY_DSN: z.string().url('Invalid Sentry DSN').optional(),
  REACT_APP_ANALYTICS_ID: z.string().optional(),
  
  // Development
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  REACT_APP_DEBUG_MODE: z.enum(['true', 'false']).default('false'),
});

type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  // Only validate in non-test environments
  if (process.env.NODE_ENV === 'test') {
    // Return mock values for all required fields
    return {
      REACT_APP_GEMINI_API_KEY: 'test',
      REACT_APP_OPENAI_API_KEY: 'test',
      REACT_APP_ELEVENLABS_API_KEY: 'test',
      REACT_APP_LIVEKIT_API_KEY: 'test',
      REACT_APP_LIVEKIT_API_SECRET: 'test',
      REACT_APP_LIVEKIT_URL: 'http://localhost',
      REACT_APP_ALGORAND_TOKEN: 'test',
      REACT_APP_ALGORAND_SERVER: 'http://localhost',
      REACT_APP_ALGORAND_PORT: '4001',
      REACT_APP_NARRATIVE_APP_ID: '123',
      REACT_APP_SUPABASE_URL: 'http://localhost',
      REACT_APP_SUPABASE_ANON_KEY: 'test',
      REACT_APP_REDDIT_CLIENT_ID: 'test',
      REACT_APP_REDDIT_CLIENT_SECRET: 'test',
      REACT_APP_ENABLE_QUANTUM_MODE: 'false',
      REACT_APP_ENABLE_VOICE_SYNTHESIS: 'true',
      REACT_APP_ENABLE_EMOTION_ENGINE: 'true',
      REACT_APP_ENCRYPTION_KEY: '123456789012345678901234567890123456',
      REACT_APP_JWT_SECRET: '123456789012345678901234567890123456',
      NODE_ENV: 'test',
      REACT_APP_DEBUG_MODE: 'false',
    };
  }
  try {
    return envSchema.parse(process.env);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .map((err: any) => `${err.path.join('.')}: ${err.message}`)
        .join('\n');
      
      throw new Error(
        `❌ Environment validation failed:\n${missingVars}\n\n` +
        'Please check your .env file and ensure all required variables are set.'
      );
    }
    throw error;
  }
}

// Export validated environment variables
export const env = validateEnv();

// Type-safe environment variable access
export function getEnvVar<K extends keyof Env>(key: K): Env[K] {
  return env[key];
}

// Feature flag helpers
export const isFeatureEnabled = (feature: keyof Pick<Env, 
  'REACT_APP_ENABLE_QUANTUM_MODE' | 
  'REACT_APP_ENABLE_VOICE_SYNTHESIS' | 
  'REACT_APP_ENABLE_EMOTION_ENGINE'
>): boolean => {
  return env[feature] === 'true';
};

// Environment helpers
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';
export const isDebugMode = env.REACT_APP_DEBUG_MODE === 'true'; 