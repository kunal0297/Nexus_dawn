// Mock environment variables
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

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock AudioContext
global.AudioContext = jest.fn().mockImplementation(() => ({
  createMediaElementSource: jest.fn().mockReturnValue({
    connect: jest.fn(),
  }),
  createGain: jest.fn().mockReturnValue({
    connect: jest.fn(),
    gain: {
      value: 1,
    },
  }),
}));

// Mock window.AudioContext
(window as any).AudioContext = global.AudioContext; 
// Mock window.AudioContext
(window as any).AudioContext = global.AudioContext; 