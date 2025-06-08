import { renderHook, act } from '@testing-library/react-hooks';
import { useBiofeedback } from '../useBiofeedback';
import { VoiceProcessingService } from '../../services/VoiceProcessingService';
import { FacialEmotionService } from '../../services/FacialEmotionService';

// Mock the services
jest.mock('../../services/VoiceProcessingService');
jest.mock('../../services/FacialEmotionService');

describe('useBiofeedback', () => {
  const mockVoiceService = {
    startRecording: jest.fn(),
    stopRecording: jest.fn()
  };

  const mockFacialService = {
    initialize: jest.fn(),
    startDetection: jest.fn(),
    stopDetection: jest.fn(),
    requestCameraPermission: jest.fn()
  };

  beforeEach(() => {
    (VoiceProcessingService as jest.Mock).mockImplementation(() => mockVoiceService);
    (FacialEmotionService as jest.Mock).mockImplementation(() => mockFacialService);
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useBiofeedback());
    
    expect(result.current.biofeedbackState).toEqual({
      timestamp: expect.any(Number)
    });
    expect(result.current.isRecording).toBe(false);
    expect(result.current.isFacialDetectionActive).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('handles voice recording start and stop', async () => {
    const { result } = renderHook(() => useBiofeedback({ enableVoice: true }));
    
    await act(async () => {
      await result.current.startVoiceRecording();
    });
    
    expect(mockVoiceService.startRecording).toHaveBeenCalled();
    expect(result.current.isRecording).toBe(true);
    
    const mockResult = {
      transcription: {
        text: 'Test',
        confidence: 0.9,
        language: 'en',
        duration: 1
      },
      emotion: {
        valence: 0.5,
        arousal: 0.7,
        dominance: 0.3,
        confidence: 0.8
      },
      timestamp: Date.now()
    };
    
    mockVoiceService.stopRecording.mockResolvedValueOnce(mockResult);
    
    await act(async () => {
      await result.current.stopVoiceRecording();
    });
    
    expect(mockVoiceService.stopRecording).toHaveBeenCalled();
    expect(result.current.isRecording).toBe(false);
    expect(result.current.biofeedbackState.voice).toEqual(mockResult);
  });

  it('handles facial detection start and stop', async () => {
    const { result } = renderHook(() => useBiofeedback({ enableFacial: true }));
    const mockVideoElement = document.createElement('video');
    
    mockFacialService.requestCameraPermission.mockResolvedValueOnce(true);
    
    await act(async () => {
      await result.current.startFacialDetection(mockVideoElement);
    });
    
    expect(mockFacialService.requestCameraPermission).toHaveBeenCalled();
    expect(mockFacialService.initialize).toHaveBeenCalled();
    expect(mockFacialService.startDetection).toHaveBeenCalledWith(mockVideoElement);
    expect(result.current.isFacialDetectionActive).toBe(true);
    
    act(() => {
      result.current.stopFacialDetection();
    });
    
    expect(mockFacialService.stopDetection).toHaveBeenCalled();
    expect(result.current.isFacialDetectionActive).toBe(false);
  });

  it('handles errors during voice recording', async () => {
    const { result } = renderHook(() => useBiofeedback({ enableVoice: true }));
    
    mockVoiceService.startRecording.mockRejectedValueOnce(new Error('Test error'));
    
    await act(async () => {
      await result.current.startVoiceRecording();
    });
    
    expect(result.current.error).toBe('Failed to start voice recording');
  });

  it('handles errors during facial detection', async () => {
    const { result } = renderHook(() => useBiofeedback({ enableFacial: true }));
    const mockVideoElement = document.createElement('video');
    
    mockFacialService.requestCameraPermission.mockResolvedValueOnce(false);
    
    await act(async () => {
      await result.current.startFacialDetection(mockVideoElement);
    });
    
    expect(result.current.error).toBe('Failed to start facial detection');
  });

  it('calls onStateChange when biofeedback state changes', async () => {
    const mockOnStateChange = jest.fn();
    const { result } = renderHook(() => 
      useBiofeedback({ 
        enableVoice: true,
        onStateChange: mockOnStateChange 
      })
    );
    
    const mockResult = {
      transcription: {
        text: 'Test',
        confidence: 0.9,
        language: 'en',
        duration: 1
      },
      emotion: {
        valence: 0.5,
        arousal: 0.7,
        dominance: 0.3,
        confidence: 0.8
      },
      timestamp: Date.now()
    };
    
    mockVoiceService.stopRecording.mockResolvedValueOnce(mockResult);
    
    await act(async () => {
      await result.current.startVoiceRecording();
      await result.current.stopVoiceRecording();
    });
    
    expect(mockOnStateChange).toHaveBeenCalledWith({
      voice: mockResult,
      timestamp: expect.any(Number)
    });
  });
}); 