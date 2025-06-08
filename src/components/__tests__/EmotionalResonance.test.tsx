import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { EmotionalResonance } from '../EmotionalResonance';

describe('EmotionalResonance', () => {
  const defaultProps = {
    valence: 0.5,
    arousal: 0.5,
    dominance: 0.5,
  };

  let mockContext: any;
  let rafCallCount = 0;
  let originalRAF: any;

  beforeAll(() => {
    originalRAF = window.requestAnimationFrame;
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      if (rafCallCount < 1) {
        rafCallCount++;
        setTimeout(() => cb(0), 0);
      }
      return 1;
    });
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => clearTimeout(id as unknown as number));
  });
  afterAll(() => {
    (window.requestAnimationFrame as jest.Mock).mockRestore();
    (window.cancelAnimationFrame as jest.Mock).mockRestore();
    window.requestAnimationFrame = originalRAF;
  });

  beforeEach(() => {
    rafCallCount = 0;
    // Reset canvas mock before each test
    mockContext = {
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
    };
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue(mockContext);
    // Mock getBoundingClientRect to return a valid size
    Element.prototype.getBoundingClientRect = jest.fn().mockReturnValue({
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      right: 100,
      bottom: 100,
    });
  });

  it('renders with default props', () => {
    render(<EmotionalResonance {...defaultProps} />);
    expect(screen.getByText('Emotional Resonance')).toBeInTheDocument();
    expect(screen.getByText('Current emotional state visualization')).toBeInTheDocument();
  });

  it('applies cosmic mode styles', () => {
    render(<EmotionalResonance {...defaultProps} cosmicMode={true} />);
    const container = screen.getByTestId('emotional-resonance');
    expect(container).toHaveClass('cosmic-mode');
  });

  it('updates visualization with different values', async () => {
    await act(async () => {
      render(<EmotionalResonance valence={0.8} arousal={0.3} dominance={0.6} />);
      await new Promise(r => setTimeout(r, 10));
    });
    expect(screen.getByText('Emotional Resonance')).toBeInTheDocument();
    // Verify canvas operations
    expect(mockContext.beginPath).toHaveBeenCalled();
    expect(mockContext.arc).toHaveBeenCalled();
    expect(mockContext.fill).toHaveBeenCalled();
  });

  it('clamps values between 0 and 1', async () => {
    await act(async () => {
      render(<EmotionalResonance valence={1.5} arousal={-0.2} dominance={0.8} />);
    });
    expect(screen.getByText('Emotional Resonance')).toBeInTheDocument();
    // Verify that the last arc call uses clamped values
    expect(mockContext.arc).toHaveBeenCalled();
    const lastArcCall = mockContext.arc.mock.calls[mockContext.arc.mock.calls.length - 1];
    expect(lastArcCall).toBeDefined();
    const [x, y, size] = lastArcCall;
    // The size should be between 10 and 30 (clamped dominance * 20 + 10)
    expect(size).toBeGreaterThanOrEqual(10);
    expect(size).toBeLessThanOrEqual(30);
  });

  it('handles cosmic mode color transitions', () => {
    render(<EmotionalResonance {...defaultProps} cosmicMode={true} />);
    const container = screen.getByTestId('emotional-resonance');
    expect(container).toHaveClass('cosmic-mode');
    
    // Verify cosmic mode styles
    const canvas = screen.getByTestId('emotional-canvas');
    expect(canvas).toHaveStyle({ filter: 'blur(0.5px)' });
    
    // Verify cosmic mode text
    expect(screen.getByText('Quantum emotional patterns detected')).toBeInTheDocument();
  });

  it('cleans up animation frame on unmount', () => {
    const { unmount } = render(<EmotionalResonance {...defaultProps} />);
    const cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame');
    unmount();
    expect(cancelAnimationFrameSpy).toHaveBeenCalled();
  });
}); 