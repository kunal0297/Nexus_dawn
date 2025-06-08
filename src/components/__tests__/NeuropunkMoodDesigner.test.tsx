import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { NeuropunkMoodDesigner } from '../NeuropunkMoodDesigner';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import { useEmotionalState } from '../../hooks/useEmotionalState';

// Mock the useEmotionalState hook
jest.mock('../../hooks/useEmotionalState');

describe('NeuropunkMoodDesigner', () => {
  const mockEmotionalState = {
    emotions: {
      valence: 0.5,
      arousal: 0.5,
      dominance: 0.5
    },
    handleEmotionChange: jest.fn(),
    applyPreset: jest.fn(),
    blendWithPreset: jest.fn(),
    getEmotionColor: jest.fn(),
    resonance: {
      intensity: 0.5,
      harmony: 0.5,
      stability: 0.5
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useEmotionalState as jest.Mock).mockReturnValue(mockEmotionalState);
  });

  it('renders with default state', () => {
    render(
      <ThemeProvider>
        <NeuropunkMoodDesigner />
      </ThemeProvider>
    );

    expect(screen.getByText('Neuropunk Mood Designer')).toBeInTheDocument();
    expect(screen.getByText('Emotional Resonance')).toBeInTheDocument();
  });

  it('toggles presets visibility', () => {
    render(
      <ThemeProvider>
        <NeuropunkMoodDesigner />
      </ThemeProvider>
    );

    const toggleButton = screen.getByRole('button', { name: /show presets/i });
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.getByText('Mood Presets')).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.queryByText('Mood Presets')).not.toBeInTheDocument();
  });

  it('renders emotion knobs', () => {
    render(
      <ThemeProvider>
        <NeuropunkMoodDesigner />
      </ThemeProvider>
    );

    const knobs = screen.getAllByRole('slider');
    expect(knobs).toHaveLength(3); // Valence, Arousal, Dominance
  });

  it('visualizes emotional resonance', () => {
    render(
      <ThemeProvider>
        <NeuropunkMoodDesigner />
      </ThemeProvider>
    );

    expect(screen.getByText('Intensity')).toBeInTheDocument();
    expect(screen.getByText('Harmony')).toBeInTheDocument();
    expect(screen.getByText('Stability')).toBeInTheDocument();
  });

  it('applies cosmic mode styles', () => {
    // Mock useTheme to return isCosmicMode: true
    jest.spyOn(require('../../contexts/ThemeContext'), 'useTheme').mockReturnValue({ isCosmicMode: true });
    render(
      <ThemeProvider>
        <NeuropunkMoodDesigner />
      </ThemeProvider>
    );
    const container = screen.getByTestId('mood-designer');
    expect(container).toHaveClass('cosmic-mode');
  });

  it('handles emotion changes', () => {
    render(
      <ThemeProvider>
        <NeuropunkMoodDesigner />
      </ThemeProvider>
    );

    const knobs = screen.getAllByRole('slider');
    fireEvent.mouseDown(knobs[0], { clientX: 100 });
    fireEvent.mouseMove(document, { clientX: 150 });
    fireEvent.mouseUp(document);

    expect(mockEmotionalState.handleEmotionChange).toHaveBeenCalled();
  });

  it('applies presets', () => {
    render(
      <ThemeProvider>
        <NeuropunkMoodDesigner />
      </ThemeProvider>
    );

    // Show presets
    const toggleButton = screen.getByRole('button', { name: /show presets/i });
    fireEvent.click(toggleButton);

    // Click a preset
    const presetButton = screen.getByText('Energetic');
    fireEvent.click(presetButton);

    expect(mockEmotionalState.applyPreset).toHaveBeenCalled();
  });

  it('blends with presets', () => {
    render(
      <ThemeProvider>
        <NeuropunkMoodDesigner />
      </ThemeProvider>
    );

    // Show presets
    const toggleButton = screen.getByRole('button', { name: /show presets/i });
    fireEvent.click(toggleButton);

    // Click blend button
    const blendButton = screen.getByText('Blend');
    fireEvent.click(blendButton);

    expect(mockEmotionalState.blendWithPreset).toHaveBeenCalled();
  });
}); 