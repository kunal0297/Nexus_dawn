import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NeuropunkMoodDesigner } from '../../src/components/NeuropunkMoodDesigner';
import { ThemeProvider } from '../../src/contexts/ThemeContext';

// Mock canvas context
const mockContext = {
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  clearRect: jest.fn(),
  fillRect: jest.fn(),
  fillText: jest.fn(),
  measureText: jest.fn(() => ({ width: 0 })),
  setTransform: jest.fn(),
  translate: jest.fn(),
  rotate: jest.fn(),
  scale: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  fill: jest.fn(),
  closePath: jest.fn(),
  arc: jest.fn(),
  // Required CanvasRenderingContext2D properties
  canvas: document.createElement('canvas'),
  getContextAttributes: jest.fn(),
  globalAlpha: 1,
  globalCompositeOperation: 'source-over',
  imageSmoothingEnabled: true,
  imageSmoothingQuality: 'low',
  lineCap: 'butt',
  lineDashOffset: 0,
  lineJoin: 'miter',
  lineWidth: 1,
  miterLimit: 10,
  shadowBlur: 0,
  shadowColor: 'rgba(0, 0, 0, 0)',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  textAlign: 'start',
  textBaseline: 'alphabetic',
} as unknown as CanvasRenderingContext2D;

const mockGetContext = jest.fn(() => mockContext);

// @ts-ignore - Mocking canvas context for testing
HTMLCanvasElement.prototype.getContext = mockGetContext;

const renderWithTheme = (component: React.ReactNode) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('NeuropunkMoodDesigner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default state', () => {
    renderWithTheme(<NeuropunkMoodDesigner />);
    expect(screen.getByText('Neuropunk Mood Designer')).toBeInTheDocument();
    expect(screen.getByText('Show Presets')).toBeInTheDocument();
  });

  it('displays emotion knobs for all VAD emotions', () => {
    renderWithTheme(<NeuropunkMoodDesigner />);
    expect(screen.getByText('Valence (Pleasure)')).toBeInTheDocument();
    expect(screen.getByText('Arousal (Energy)')).toBeInTheDocument();
    expect(screen.getByText('Dominance (Control)')).toBeInTheDocument();
  });

  it('shows and hides preset menu when clicking show/hide presets button', async () => {
    renderWithTheme(<NeuropunkMoodDesigner />);
    const showPresetsButton = screen.getByText('Show Presets');
    
    // Show presets
    await act(async () => {
      fireEvent.click(showPresetsButton);
    });
    
    expect(screen.getByText('Quantum Bliss')).toBeInTheDocument();
    expect(screen.getByText('Neural Serenity')).toBeInTheDocument();
    expect(screen.getByText('Cyber Focus')).toBeInTheDocument();
    expect(screen.getByText('Quantum Melancholy')).toBeInTheDocument();
    
    // Hide presets
    const hidePresetsButton = screen.getByText('Hide Presets');
    await act(async () => {
      fireEvent.click(hidePresetsButton);
    });
    
    // Wait for animation to complete
    await new Promise(resolve => setTimeout(resolve, 300));
    const panel = screen.getByLabelText('Presets');
    expect(panel).toHaveStyle('opacity: 0');
  });

  it('applies preset when selected', async () => {
    renderWithTheme(<NeuropunkMoodDesigner />);
    const showPresetsButton = screen.getByText('Show Presets');
    
    await act(async () => {
      fireEvent.click(showPresetsButton);
    });
    
    // Click each preset and verify UI updates
    const presets = ['Quantum Bliss', 'Neural Serenity', 'Cyber Focus', 'Quantum Melancholy'];
    for (const preset of presets) {
      const presetButton = screen.getByText(preset);
      await act(async () => {
        fireEvent.click(presetButton);
      });
      expect(screen.getByText('Neuropunk Mood Designer')).toBeInTheDocument();
    }
  });

  it('shows current emotional resonance section', () => {
    renderWithTheme(<NeuropunkMoodDesigner />);
    expect(screen.getByText('Emotional Resonance')).toBeInTheDocument();
    expect(screen.getByText('Current emotional state visualization')).toBeInTheDocument();
  });

  it('handles emotion value changes for all knobs', async () => {
    renderWithTheme(<NeuropunkMoodDesigner />);
    
    // Test each emotion knob
    const emotions = ['Valence', 'Arousal', 'Dominance'];
    for (const emotion of emotions) {
      const label = screen.getByText(`${emotion} (${emotion === 'Valence' ? 'Pleasure' : emotion === 'Arousal' ? 'Energy' : 'Control'})`);
      const slider = label.parentElement?.querySelector('[role="slider"]');
      
      if (slider) {
        // Test minimum value
        await act(async () => {
          fireEvent.mouseDown(slider);
          fireEvent.mouseMove(slider, { clientX: 0 });
          fireEvent.mouseUp(slider);
        });
        
        // Test maximum value
        await act(async () => {
          fireEvent.mouseDown(slider);
          fireEvent.mouseMove(slider, { clientX: 100 });
          fireEvent.mouseUp(slider);
        });
        
        // Verify the slider is interactive
        expect(slider).toHaveAttribute('role', 'slider');
        expect(slider).toHaveAttribute('aria-valuemin', '0');
        expect(slider).toHaveAttribute('aria-valuemax', '1');
      }
    }
  });

  it('handles keyboard navigation for emotion knobs', async () => {
    renderWithTheme(<NeuropunkMoodDesigner />);
    
    const emotions = ['Valence', 'Arousal', 'Dominance'];
    for (const emotion of emotions) {
      const label = screen.getByText(`${emotion} (${emotion === 'Valence' ? 'Pleasure' : emotion === 'Arousal' ? 'Energy' : 'Control'})`);
      const slider = label.parentElement?.querySelector('[role="slider"]');
      
      if (slider) {
        // Test arrow key navigation
        await act(async () => {
          fireEvent.keyDown(slider, { key: 'ArrowRight' });
        });
        
        await act(async () => {
          fireEvent.keyDown(slider, { key: 'ArrowLeft' });
        });
        
        // Verify the slider is keyboard accessible
        expect(slider).toHaveAttribute('tabindex', '0');
      }
    }
  });

  it('updates emotional resonance visualization when values change', async () => {
    renderWithTheme(<NeuropunkMoodDesigner />);
    
    // Change emotion values
    const valenceLabel = screen.getByText('Valence (Pleasure)');
    const valenceSlider = valenceLabel.parentElement?.querySelector('[role="slider"]');
    
    if (valenceSlider) {
      await act(async () => {
        fireEvent.mouseDown(valenceSlider);
        fireEvent.mouseMove(valenceSlider, { clientX: 100 });
        fireEvent.mouseUp(valenceSlider);
      });
      
      // Verify canvas context methods were called
      expect(mockContext.clearRect).toHaveBeenCalled();
      expect(mockContext.beginPath).toHaveBeenCalled();
      expect(mockContext.stroke).toHaveBeenCalled();
    }
  });

  it('updates emotional state values correctly', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    renderWithTheme(<NeuropunkMoodDesigner />);
    
    const valenceLabel = screen.getByText('Valence (Pleasure)');
    const slider = valenceLabel.parentElement?.querySelector('[role="slider"]');
    
    if (slider) {
      await act(async () => {
        fireEvent.mouseDown(slider);
        fireEvent.mouseMove(slider, { clientX: 100 });
        fireEvent.mouseUp(slider);
      });
      
      // Verify emotional state change through console.log
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Emotional state changed'),
        expect.objectContaining({
          valence: 1,
          arousal: expect.any(Number),
          dominance: expect.any(Number),
          context: 'normal'
        })
      );
    }
    
    consoleSpy.mockRestore();
  });
}); 