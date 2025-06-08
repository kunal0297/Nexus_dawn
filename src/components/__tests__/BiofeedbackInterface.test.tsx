import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BiofeedbackInterface } from '../BiofeedbackInterface';
import { useBiofeedback } from '../../hooks/useBiofeedback';

// Mock the useBiofeedback hook
jest.mock('../../hooks/useBiofeedback');

describe('BiofeedbackInterface', () => {
  const mockBiofeedbackState = {
    timestamp: Date.now(),
    voice: {
      transcription: {
        text: 'Test transcription',
        confidence: 0.9,
        language: 'en',
        duration: 1.5
      },
      emotion: {
        valence: 0.5,
        arousal: 0.7,
        dominance: 0.3,
        confidence: 0.8
      },
      timestamp: Date.now()
    },
    facial: {
      neutral: 0.1,
      happy: 0.8,
      sad: 0.1,
      angry: 0.1,
      fearful: 0.1,
      disgusted: 0.1,
      surprised: 0.1,
      confidence: 0.9
    }
  };

  beforeEach(() => {
    (useBiofeedback as jest.Mock).mockReturnValue({
      biofeedbackState: mockBiofeedbackState,
      isRecording: false,
      isFacialDetectionActive: true,
      error: null,
      startVoiceRecording: jest.fn(),
      stopVoiceRecording: jest.fn(),
      startFacialDetection: jest.fn(),
      stopFacialDetection: jest.fn()
    });
  });

  it('renders without error', () => {
    render(<BiofeedbackInterface />);
    expect(screen.getByRole('button', { name: /start recording/i })).toBeInTheDocument();
  });

  it('displays error message when error occurs', () => {
    (useBiofeedback as jest.Mock).mockReturnValue({
      biofeedbackState: mockBiofeedbackState,
      isRecording: false,
      isFacialDetectionActive: true,
      error: 'Test error',
      startVoiceRecording: jest.fn(),
      stopVoiceRecording: jest.fn(),
      startFacialDetection: jest.fn(),
      stopFacialDetection: jest.fn()
    });

    render(<BiofeedbackInterface />);
    expect(screen.getByRole('alert')).toHaveTextContent('Test error');
  });

  it('toggles recording state when button is clicked', () => {
    const mockStartRecording = jest.fn();
    const mockStopRecording = jest.fn();

    (useBiofeedback as jest.Mock).mockReturnValue({
      biofeedbackState: mockBiofeedbackState,
      isRecording: false,
      isFacialDetectionActive: true,
      error: null,
      startVoiceRecording: mockStartRecording,
      stopVoiceRecording: mockStopRecording,
      startFacialDetection: jest.fn(),
      stopFacialDetection: jest.fn()
    });

    render(<BiofeedbackInterface />);
    
    const startButton = screen.getByRole('button', { name: /start recording/i });
    expect(startButton).toBeInTheDocument();
    
    fireEvent.click(startButton);
    expect(mockStartRecording).toHaveBeenCalled();

    // Update mock to simulate recording state
    (useBiofeedback as jest.Mock).mockReturnValue({
      biofeedbackState: mockBiofeedbackState,
      isRecording: true,
      isFacialDetectionActive: true,
      error: null,
      startVoiceRecording: mockStartRecording,
      stopVoiceRecording: mockStopRecording,
      startFacialDetection: jest.fn(),
      stopFacialDetection: jest.fn()
    });

    // Re-render with updated state
    render(<BiofeedbackInterface />);
    
    const stopButton = screen.getByRole('button', { name: /stop recording/i });
    expect(stopButton).toBeInTheDocument();
    
    fireEvent.click(stopButton);
    expect(mockStopRecording).toHaveBeenCalled();
  });

  it('displays voice analysis results when available', () => {
    render(<BiofeedbackInterface />);
    
    expect(screen.getByText('Voice Analysis')).toBeInTheDocument();
    expect(screen.getByText(/Transcription: Test transcription/)).toBeInTheDocument();
    expect(screen.getByText(/Valence: 0.50/)).toBeInTheDocument();
    expect(screen.getByText(/Arousal: 0.70/)).toBeInTheDocument();
    expect(screen.getByText(/Dominance: 0.30/)).toBeInTheDocument();
  });

  it('displays facial emotion results when available', () => {
    render(<BiofeedbackInterface />);
    
    expect(screen.getByText('Detected Emotion')).toBeInTheDocument();
    expect(screen.getByText(/Primary: happy/)).toBeInTheDocument();
    expect(screen.getByText(/Score: 80%/)).toBeInTheDocument();
    expect(screen.getByText(/Confidence: 90%/)).toBeInTheDocument();
  });

  it('handles video element initialization', () => {
    const mockStartFacialDetection = jest.fn();
    const mockStopFacialDetection = jest.fn();

    (useBiofeedback as jest.Mock).mockReturnValue({
      biofeedbackState: mockBiofeedbackState,
      isRecording: false,
      isFacialDetectionActive: true,
      error: null,
      startVoiceRecording: jest.fn(),
      stopVoiceRecording: jest.fn(),
      startFacialDetection: mockStartFacialDetection,
      stopFacialDetection: mockStopFacialDetection
    });

    render(<BiofeedbackInterface />);
    
    const video = screen.getByTestId('video-feed');
    expect(video).toBeInTheDocument();
    expect(mockStartFacialDetection).toHaveBeenCalled();
  });

  it('calls onStateChange when biofeedback state changes', () => {
    const mockOnStateChange = jest.fn();
    
    // Mock the hook to call onStateChange with the initial state
    (useBiofeedback as jest.Mock).mockImplementation(({ onStateChange }) => {
      if (onStateChange) {
        onStateChange(mockBiofeedbackState);
      }
      return {
        biofeedbackState: mockBiofeedbackState,
        isRecording: false,
        isFacialDetectionActive: true,
        error: null,
        startVoiceRecording: jest.fn(),
        stopVoiceRecording: jest.fn(),
        startFacialDetection: jest.fn(),
        stopFacialDetection: jest.fn()
      };
    });
    
    render(<BiofeedbackInterface onStateChange={mockOnStateChange} />);
    expect(mockOnStateChange).toHaveBeenCalledWith(mockBiofeedbackState);
  });
}); 