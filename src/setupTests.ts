import '@testing-library/jest-dom';
import { configure, render } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';

// Configure testing-library
configure({
  testIdAttribute: 'data-testid',
});

// Create a theme instance for tests
const theme = createTheme();

// Create a test wrapper component that properly handles the Material-UI theme context
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return React.createElement(ThemeProvider, { theme }, children);
};

// Add the wrapper to the render function
const customRender = (ui: React.ReactElement) => {
  return render(ui, { wrapper: TestWrapper });
};

// Export the custom render function
export { customRender as render };

// Mock environment variables
process.env.REACT_APP_GEMINI_API_KEY = 'test_gemini_key';
process.env.REACT_APP_OPENAI_API_KEY = 'test_openai_key';
process.env.REACT_APP_ELEVENLABS_API_KEY = 'test_elevenlabs_key';
process.env.REACT_APP_LIVEKIT_API_KEY = 'test_livekit_key';
process.env.REACT_APP_LIVEKIT_API_SECRET = 'test_livekit_secret';
process.env.REACT_APP_LIVEKIT_URL = 'test_livekit_url';
process.env.REACT_APP_ALGORAND_TOKEN = 'test_algrand_token';
process.env.REACT_APP_ALGORAND_SERVER = 'test_algrand_server';
process.env.REACT_APP_ALGORAND_PORT = 'test_algrand_port';
process.env.REACT_APP_NARRATIVE_APP_ID = 'test_narrative_app_id';
process.env.REACT_APP_SUPABASE_URL = 'test_supabase_url';
process.env.REACT_APP_SUPABASE_ANON_KEY = 'test_supabase_anon_key';
process.env.REACT_APP_REDDIT_CLIENT_ID = 'test_reddit_client_id';
process.env.REACT_APP_REDDIT_CLIENT_SECRET = 'test_reddit_client_secret';
process.env.REACT_APP_ENCRYPTION_KEY = 'test_encryption_key';
process.env.REACT_APP_JWT_SECRET = 'test_jwt_secret';

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
class ResizeObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}
global.ResizeObserver = ResizeObserverMock as any;

// Mock IntersectionObserver
class IntersectionObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}
global.IntersectionObserver = IntersectionObserverMock as any;

// Mock AudioContext
class AudioContextMock {
  createMediaElementSource = jest.fn().mockReturnValue({ connect: jest.fn() });
  createGain = jest.fn().mockReturnValue({ connect: jest.fn(), gain: { value: 1 } });
}
global.AudioContext = AudioContextMock as any;
(window as any).AudioContext = global.AudioContext;

// Mock Canvas
const mockGetContext = jest.fn().mockReturnValue({
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  getImageData: jest.fn(),
  putImageData: jest.fn(),
  createImageData: jest.fn(),
  setTransform: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
  fillText: jest.fn(),
  restore: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  stroke: jest.fn(),
  translate: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  measureText: jest.fn().mockReturnValue({ width: 0 }),
  transform: jest.fn(),
  rect: jest.fn(),
  clip: jest.fn(),
});

HTMLCanvasElement.prototype.getContext = mockGetContext;

// Mock MediaRecorder
class MediaRecorderMock {
  start = jest.fn();
  stop = jest.fn();
  addEventListener = jest.fn();
  removeEventListener = jest.fn();
  dispatchEvent = jest.fn();
  state = 'inactive';
  ondataavailable = null;
  onstop = null;
}
global.MediaRecorder = MediaRecorderMock as any;

// Mock face-api.js
interface FaceApiMock {
  nets: {
    ssdMobilenetv1: { load: jest.Mock };
    faceLandmark68Net: { load: jest.Mock };
    faceRecognitionNet: { load: jest.Mock };
    faceExpressionNet: { load: jest.Mock };
  };
  detectSingleFace: jest.Mock;
  SsdMobilenetv1Options: jest.Mock;
  FaceLandmark68Net: jest.Mock;
  FaceRecognitionNet: jest.Mock;
  FaceExpressionNet: jest.Mock;
}

const faceapi: FaceApiMock = {
  nets: {
    ssdMobilenetv1: {
      load: jest.fn().mockResolvedValue({}),
    },
    faceLandmark68Net: {
      load: jest.fn().mockResolvedValue({}),
    },
    faceRecognitionNet: {
      load: jest.fn().mockResolvedValue({}),
    },
    faceExpressionNet: {
      load: jest.fn().mockResolvedValue({}),
    },
  },
  detectSingleFace: jest.fn().mockResolvedValue({
    expressions: {
      neutral: 0.1,
      happy: 0.8,
      sad: 0.1,
      angry: 0.1,
      fearful: 0.1,
      disgusted: 0.1,
      surprised: 0.1,
    },
  }),
  SsdMobilenetv1Options: jest.fn(),
  FaceLandmark68Net: jest.fn(),
  FaceRecognitionNet: jest.fn(),
  FaceExpressionNet: jest.fn(),
};

(global as any).faceapi = faceapi; 