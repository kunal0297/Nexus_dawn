process.env.REACT_APP_GEMINI_API_KEY = 'test-gemini-key';
process.env.REACT_APP_OPENAI_API_KEY = 'test-openai-key';
process.env.REACT_APP_ELEVENLABS_API_KEY = 'test-elevenlabs-key';
process.env.REACT_APP_LIVEKIT_API_KEY = 'test-livekit-key';
process.env.REACT_APP_LIVEKIT_API_SECRET = 'test-livekit-secret';
process.env.REACT_APP_LIVEKIT_URL = 'https://test.livekit.com';
process.env.REACT_APP_ALGORAND_TOKEN = 'test-algorand-token';
process.env.REACT_APP_ALGORAND_SERVER = 'https://test.algorand.com';
process.env.REACT_APP_ALGORAND_PORT = '443';
process.env.REACT_APP_NARRATIVE_APP_ID = '123';
process.env.REACT_APP_SUPABASE_URL = 'https://test.supabase.com';
process.env.REACT_APP_SUPABASE_ANON_KEY = 'test-supabase-key';
process.env.REACT_APP_ENCRYPTION_KEY = 'a'.repeat(32);
process.env.REACT_APP_JWT_SECRET = 'a'.repeat(32);
process.env.REACT_APP_REDDIT_CLIENT_ID = 'test-reddit-client-id';
process.env.REACT_APP_REDDIT_CLIENT_SECRET = 'test-reddit-client-secret';

import { env, isFeatureEnabled, isDevelopment, isProduction, isTest, isDebugMode } from '../../src/config/env.validation';

describe('Environment Validation', () => {
  const originalEnv = process.env;

  beforeAll(() => {
    process.env.REACT_APP_GEMINI_API_KEY = 'test-gemini-key';
    process.env.REACT_APP_OPENAI_API_KEY = 'test-openai-key';
    process.env.REACT_APP_ELEVENLABS_API_KEY = 'test-elevenlabs-key';
    process.env.REACT_APP_LIVEKIT_API_KEY = 'test-livekit-key';
    process.env.REACT_APP_LIVEKIT_API_SECRET = 'test-livekit-secret';
    process.env.REACT_APP_LIVEKIT_URL = 'https://test.livekit.com';
    process.env.REACT_APP_ALGORAND_TOKEN = 'test-algorand-token';
    process.env.REACT_APP_ALGORAND_SERVER = 'https://test.algorand.com';
    process.env.REACT_APP_ALGORAND_PORT = '443';
    process.env.REACT_APP_NARRATIVE_APP_ID = '123';
    process.env.REACT_APP_SUPABASE_URL = 'https://test.supabase.com';
    process.env.REACT_APP_SUPABASE_ANON_KEY = 'test-supabase-key';
    process.env.REACT_APP_ENCRYPTION_KEY = 'a'.repeat(32);
    process.env.REACT_APP_JWT_SECRET = 'a'.repeat(32);
    process.env.REACT_APP_REDDIT_CLIENT_ID = 'test-reddit-client-id';
    process.env.REACT_APP_REDDIT_CLIENT_SECRET = 'test-reddit-client-secret';
  });

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('Required Environment Variables', () => {
    it('should validate all required AI service keys', () => {
      process.env.REACT_APP_GEMINI_API_KEY = 'test-gemini-key';
      process.env.REACT_APP_OPENAI_API_KEY = 'test-openai-key';
      process.env.REACT_APP_ELEVENLABS_API_KEY = 'test-elevenlabs-key';

      expect(() => {
        require('../../src/config/env.validation');
      }).not.toThrow();
    });

    it('should throw error for missing required AI service keys', () => {
      delete process.env.REACT_APP_GEMINI_API_KEY;
      
      expect(() => {
        require('../../src/config/env.validation');
      }).toThrow('Environment validation failed');
    });

    it('should validate LiveKit configuration', () => {
      process.env.REACT_APP_LIVEKIT_API_KEY = 'test-livekit-key';
      process.env.REACT_APP_LIVEKIT_API_SECRET = 'test-livekit-secret';
      process.env.REACT_APP_LIVEKIT_URL = 'https://test.livekit.com';

      expect(() => {
        require('../../src/config/env.validation');
      }).not.toThrow();
    });

    it('should validate blockchain configuration', () => {
      process.env.REACT_APP_ALGORAND_TOKEN = 'test-algorand-token';
      process.env.REACT_APP_ALGORAND_SERVER = 'https://test.algorand.com';
      process.env.REACT_APP_ALGORAND_PORT = '443';
      process.env.REACT_APP_NARRATIVE_APP_ID = '123';

      expect(() => {
        require('../../src/config/env.validation');
      }).not.toThrow();
    });

    it('should validate Supabase configuration', () => {
      process.env.REACT_APP_SUPABASE_URL = 'https://test.supabase.com';
      process.env.REACT_APP_SUPABASE_ANON_KEY = 'test-supabase-key';

      expect(() => {
        require('../../src/config/env.validation');
      }).not.toThrow();
    });
  });

  describe('Feature Flags', () => {
    it('should handle quantum mode feature flag', () => {
      process.env.REACT_APP_ENABLE_QUANTUM_MODE = 'true';
      jest.resetModules();
      const { isFeatureEnabled } = require('../../src/config/env.validation');
      expect(isFeatureEnabled('REACT_APP_ENABLE_QUANTUM_MODE')).toBe(true);

      process.env.REACT_APP_ENABLE_QUANTUM_MODE = 'false';
      jest.resetModules();
      const { isFeatureEnabled: isFeatureEnabledFalse } = require('../../src/config/env.validation');
      expect(isFeatureEnabledFalse('REACT_APP_ENABLE_QUANTUM_MODE')).toBe(false);
    });

    it('should handle voice synthesis feature flag', () => {
      process.env.REACT_APP_ENABLE_VOICE_SYNTHESIS = 'true';
      jest.resetModules();
      const { isFeatureEnabled } = require('../../src/config/env.validation');
      expect(isFeatureEnabled('REACT_APP_ENABLE_VOICE_SYNTHESIS')).toBe(true);

      process.env.REACT_APP_ENABLE_VOICE_SYNTHESIS = 'false';
      jest.resetModules();
      const { isFeatureEnabled: isFeatureEnabledFalse } = require('../../src/config/env.validation');
      expect(isFeatureEnabledFalse('REACT_APP_ENABLE_VOICE_SYNTHESIS')).toBe(false);
    });

    it('should handle emotion engine feature flag', () => {
      process.env.REACT_APP_ENABLE_EMOTION_ENGINE = 'true';
      jest.resetModules();
      const { isFeatureEnabled } = require('../../src/config/env.validation');
      expect(isFeatureEnabled('REACT_APP_ENABLE_EMOTION_ENGINE')).toBe(true);

      process.env.REACT_APP_ENABLE_EMOTION_ENGINE = 'false';
      jest.resetModules();
      const { isFeatureEnabled: isFeatureEnabledFalse } = require('../../src/config/env.validation');
      expect(isFeatureEnabledFalse('REACT_APP_ENABLE_EMOTION_ENGINE')).toBe(false);
    });
  });

  describe('Environment Helpers', () => {
    it('should correctly identify development environment', () => {
      process.env.NODE_ENV = 'development';
      jest.resetModules();
      const { isDevelopment, isProduction, isTest } = require('../../src/config/env.validation');
      expect(isDevelopment).toBe(true);
      expect(isProduction).toBe(false);
      expect(isTest).toBe(false);
    });

    it('should correctly identify production environment', () => {
      process.env.NODE_ENV = 'production';
      jest.resetModules();
      const { isDevelopment, isProduction, isTest } = require('../../src/config/env.validation');
      expect(isDevelopment).toBe(false);
      expect(isProduction).toBe(true);
      expect(isTest).toBe(false);
    });

    it('should correctly identify test environment', () => {
      process.env.NODE_ENV = 'test';
      jest.resetModules();
      const { isDevelopment, isProduction, isTest } = require('../../src/config/env.validation');
      expect(isDevelopment).toBe(false);
      expect(isProduction).toBe(false);
      expect(isTest).toBe(true);
    });

    it('should handle debug mode', () => {
      process.env.REACT_APP_DEBUG_MODE = 'true';
      jest.resetModules();
      const { isDebugMode } = require('../../src/config/env.validation');
      expect(isDebugMode).toBe(true);

      process.env.REACT_APP_DEBUG_MODE = 'false';
      jest.resetModules();
      const { isDebugMode: isDebugModeFalse } = require('../../src/config/env.validation');
      expect(isDebugModeFalse).toBe(false);
    });
  });

  describe('Security Configuration', () => {
    it('should validate encryption key length', () => {
      process.env.REACT_APP_ENCRYPTION_KEY = 'short-key';
      expect(() => {
        require('../../src/config/env.validation');
      }).toThrow('Encryption key must be at least 32 characters');

      process.env.REACT_APP_ENCRYPTION_KEY = 'a'.repeat(32);
      expect(() => {
        require('../../src/config/env.validation');
      }).not.toThrow();
    });

    it('should validate JWT secret length', () => {
      process.env.REACT_APP_JWT_SECRET = 'short-secret';
      expect(() => {
        require('../../src/config/env.validation');
      }).toThrow('JWT secret must be at least 32 characters');

      process.env.REACT_APP_JWT_SECRET = 'a'.repeat(32);
      expect(() => {
        require('../../src/config/env.validation');
      }).not.toThrow();
    });
  });

  describe('Optional Configuration', () => {
    it('should handle optional Sentry DSN', () => {
      process.env.REACT_APP_SENTRY_DSN = 'https://test.sentry.io';
      expect(() => {
        require('../../src/config/env.validation');
      }).not.toThrow();

      delete process.env.REACT_APP_SENTRY_DSN;
      expect(() => {
        require('../../src/config/env.validation');
      }).not.toThrow();
    });

    it('should handle optional analytics ID', () => {
      process.env.REACT_APP_ANALYTICS_ID = 'test-analytics-id';
      expect(() => {
        require('../../src/config/env.validation');
      }).not.toThrow();

      delete process.env.REACT_APP_ANALYTICS_ID;
      expect(() => {
        require('../../src/config/env.validation');
      }).not.toThrow();
    });
  });
}); 