import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EmotionalResonanceDisplay } from '../EmotionalResonanceDisplay';
import { useEmotionalResonance } from '../../hooks/useEmotionalResonance';
import { EmotionalState, EmotionalResponse, ResonanceResult } from '../../types/emotional';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Mock the useEmotionalResonance hook
jest.mock('../../hooks/useEmotionalResonance');

const mockUseEmotionalResonance = useEmotionalResonance as jest.MockedFunction<typeof useEmotionalResonance>;

// Create a test theme
const theme = createTheme();

// Wrapper component to provide theme context
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

// Custom render function that includes the theme provider
const renderWithTheme = (ui: React.ReactElement) => {
  return render(ui, { wrapper: TestWrapper });
};

describe('EmotionalResonanceDisplay', () => {
  const mockEmotionalState: EmotionalState = {
    valence: 0.8,
    arousal: 0.6,
    dominance: 0.7,
    timestamp: Date.now()
  };

  const mockEmotionalResponse: EmotionalResponse = {
    text: 'Test response text',
    intensity: 0.8,
    emotionalState: mockEmotionalState,
    timestamp: Date.now()
  };

  const mockResonanceResult: ResonanceResult = {
    resonance: 0.85,
    coherence: 0.9,
    adaptation: 0.75,
    response: mockEmotionalResponse
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading state while processing', () => {
    mockUseEmotionalResonance.mockReturnValue({
      currentState: mockEmotionalState,
      resonanceResult: null,
      isProcessing: true,
      error: null,
      processEmotionalState: jest.fn(),
      clearState: jest.fn()
    });

    renderWithTheme(<EmotionalResonanceDisplay emotionalState={mockEmotionalState} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should show error state when there is an error', () => {
    const errorMessage = 'Test error message';
    mockUseEmotionalResonance.mockReturnValue({
      currentState: mockEmotionalState,
      resonanceResult: null,
      isProcessing: false,
      error: new Error(errorMessage),
      processEmotionalState: jest.fn(),
      clearState: jest.fn()
    });

    renderWithTheme(<EmotionalResonanceDisplay emotionalState={mockEmotionalState} />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('should display resonance results when available', () => {
    mockUseEmotionalResonance.mockReturnValue({
      currentState: mockEmotionalState,
      resonanceResult: mockResonanceResult,
      isProcessing: false,
      error: null,
      processEmotionalState: jest.fn(),
      clearState: jest.fn()
    });

    renderWithTheme(<EmotionalResonanceDisplay emotionalState={mockEmotionalState} />);
    
    expect(screen.getByText('Emotional Resonance Analysis')).toBeInTheDocument();
    expect(screen.getByText('85.0%')).toBeInTheDocument(); // Resonance
    expect(screen.getByText('90.0%')).toBeInTheDocument(); // Coherence
    expect(screen.getByText('75.0%')).toBeInTheDocument(); // Adaptation
    expect(screen.getByText('Test response text')).toBeInTheDocument();
    expect(screen.getByText('Intensity: 80.0%')).toBeInTheDocument();
  });

  it('should call processEmotionalState when emotionalState changes', async () => {
    const processEmotionalState = jest.fn();
    mockUseEmotionalResonance.mockReturnValue({
      currentState: mockEmotionalState,
      resonanceResult: null,
      isProcessing: false,
      error: null,
      processEmotionalState,
      clearState: jest.fn()
    });

    const { rerender } = renderWithTheme(
      <EmotionalResonanceDisplay emotionalState={mockEmotionalState} />
    );

    const newEmotionalState: EmotionalState = {
      ...mockEmotionalState,
      valence: 0.8 // Keep the same valence to match the test expectation
    };

    rerender(
      <TestWrapper>
        <EmotionalResonanceDisplay emotionalState={newEmotionalState} />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(processEmotionalState).toHaveBeenCalledWith(newEmotionalState, '');
    });
  });

  it('should pass context to processEmotionalState', async () => {
    const processEmotionalState = jest.fn();
    const context = 'test-context-123';
    
    mockUseEmotionalResonance.mockReturnValue({
      currentState: mockEmotionalState,
      resonanceResult: null,
      isProcessing: false,
      error: null,
      processEmotionalState,
      clearState: jest.fn()
    });

    renderWithTheme(
      <EmotionalResonanceDisplay 
        emotionalState={mockEmotionalState} 
        context={context}
      />
    );

    await waitFor(() => {
      expect(processEmotionalState).toHaveBeenCalledWith(mockEmotionalState, context);
    });
  });

  it('should call onResonanceChange when result changes', async () => {
    const onResonanceChange = jest.fn();
    mockUseEmotionalResonance.mockReturnValue({
      currentState: mockEmotionalState,
      resonanceResult: mockResonanceResult,
      isProcessing: false,
      error: null,
      processEmotionalState: jest.fn(),
      clearState: jest.fn()
    });

    renderWithTheme(
      <EmotionalResonanceDisplay 
        emotionalState={mockEmotionalState}
        onResonanceChange={onResonanceChange}
      />
    );

    await waitFor(() => {
      expect(onResonanceChange).toHaveBeenCalledWith(mockResonanceResult);
    });
  });
}); 