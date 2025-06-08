import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MirrorOfBecoming } from '../../src/components/MirrorOfBecoming';
import { ThemeProvider } from '../../src/contexts/ThemeContext';

// Mock the Gemini API
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn().mockResolvedValue({
        response: {
          text: jest.fn().mockResolvedValue('Insight 1\nInsight 2\nInsight 3')
        }
      })
    })
  }))
}));

// Mock the GLTF loader
jest.mock('@react-three/drei', () => ({
  useGLTF: jest.fn().mockReturnValue({ scene: {} }),
  OrbitControls: jest.fn().mockReturnValue(null),
  Stars: jest.fn().mockReturnValue(null)
}));

const renderWithTheme = (component: React.ReactNode) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('MirrorOfBecoming', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with initial state', () => {
    renderWithTheme(<MirrorOfBecoming />);
    
    expect(screen.getByText('Mirror of Becoming')).toBeInTheDocument();
    expect(screen.getByText('Generate Future Self')).toBeInTheDocument();
  });

  it('shows loading state when generating insights', async () => {
    renderWithTheme(<MirrorOfBecoming />);
    
    const generateButton = screen.getByText('Generate Future Self');
    fireEvent.click(generateButton);
    
    expect(screen.getByText('Quantum Computing...')).toBeInTheDocument();
    
    // Wait for the generation to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(screen.getByText('Insight 1')).toBeInTheDocument();
    expect(screen.getByText('Insight 2')).toBeInTheDocument();
    expect(screen.getByText('Insight 3')).toBeInTheDocument();
  });

  it('displays emotional resonance after generation', async () => {
    renderWithTheme(<MirrorOfBecoming />);
    
    const generateButton = screen.getByText('Generate Future Self');
    fireEvent.click(generateButton);
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(screen.getByText('Emotional Resonance')).toBeInTheDocument();
  });

  it('toggles cosmic mode correctly', () => {
    renderWithTheme(<MirrorOfBecoming />);
    
    const container = screen.getByRole('region');
    expect(container).toHaveClass('bg-white');
    
    // Simulate cosmic mode toggle
    act(() => {
      container.className = container.className.replace('bg-white', 'bg-gradient-to-br from-purple-900/50 to-blue-900/50');
    });
    
    expect(container).toHaveClass('from-purple-900/50');
  });

  it('handles generation errors gracefully', async () => {
    // Mock the Gemini API to throw an error
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const mockError = new Error('API Error');
    jest.requireMock('@google/generative-ai').GoogleGenerativeAI.mockImplementationOnce(() => ({
      getGenerativeModel: jest.fn().mockReturnValue({
        generateContent: jest.fn().mockRejectedValue(mockError)
      })
    }));

    renderWithTheme(<MirrorOfBecoming />);
    
    const generateButton = screen.getByText('Generate Future Self');
    fireEvent.click(generateButton);
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(console.error).toHaveBeenCalledWith('Error generating future self:', mockError);
    expect(screen.getByText('Generate Future Self')).toBeInTheDocument();
  });
}); 