import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { EmotionKnob } from '../EmotionKnob';

describe('EmotionKnob', () => {
  const defaultProps = {
    value: 0.5,
    onChange: jest.fn(),
    label: 'Test Knob',
    type: 'valence' as const,
    cosmicMode: false,
    gradient: 'linear-gradient(90deg, #FF6B6B 50%, #4ECDC4 50%)'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<EmotionKnob {...defaultProps} />);
    
    const knob = screen.getByRole('slider');
    expect(knob).toBeInTheDocument();
    expect(knob).toHaveAttribute('aria-valuemin', '0');
    expect(knob).toHaveAttribute('aria-valuemax', '1');
    expect(knob).toHaveAttribute('aria-valuenow', '0.5');
    expect(knob).toHaveAttribute('aria-valuetext', '50%');
  });

  it('handles mouse interactions', () => {
    render(<EmotionKnob {...defaultProps} />);
    
    const knob = screen.getByRole('slider');
    
    // Test mouse down
    fireEvent.mouseDown(knob, { clientX: 100 });
    expect(defaultProps.onChange).toHaveBeenCalled();
    
    // Test mouse move
    fireEvent.mouseMove(document, { clientX: 150 });
    expect(defaultProps.onChange).toHaveBeenCalled();
    
    // Test mouse up
    fireEvent.mouseUp(document);
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('applies cosmic mode styles', () => {
    render(<EmotionKnob {...defaultProps} cosmicMode={true} />);
    
    const knob = screen.getByRole('slider');
    expect(knob).toHaveClass('cosmic-mode');
  });

  it('clamps values between 0 and 1', () => {
    render(<EmotionKnob {...defaultProps} value={1.5} />);
    
    const knob = screen.getByRole('slider');
    expect(knob).toHaveAttribute('aria-valuenow', '1');
    expect(knob).toHaveAttribute('aria-valuetext', '100%');
  });

  it('updates aria-valuetext with percentage', () => {
    const { rerender } = render(<EmotionKnob {...defaultProps} value={0.75} />);
    
    const knob = screen.getByRole('slider');
    expect(knob).toHaveAttribute('aria-valuetext', '75%');
    
    rerender(<EmotionKnob {...defaultProps} value={0.25} />);
    expect(knob).toHaveAttribute('aria-valuetext', '25%');
  });

  it('handles touch events', () => {
    render(<EmotionKnob {...defaultProps} />);
    
    const knob = screen.getByRole('slider');
    
    // Test touch start
    fireEvent.touchStart(knob, { touches: [{ clientX: 100 }] });
    expect(defaultProps.onChange).toHaveBeenCalled();
    
    // Test touch move
    fireEvent.touchMove(document, { touches: [{ clientX: 150 }] });
    expect(defaultProps.onChange).toHaveBeenCalled();
    
    // Test touch end
    fireEvent.touchEnd(document);
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('cleans up event listeners on unmount', () => {
    const { unmount } = render(<EmotionKnob {...defaultProps} />);
    
    // Add event listeners
    const knob = screen.getByRole('slider');
    fireEvent.mouseDown(knob, { clientX: 100 });
    
    // Unmount component
    unmount();
    
    // Try to trigger events after unmount
    fireEvent.mouseMove(document, { clientX: 150 });
    fireEvent.mouseUp(document);
    
    // Should not have been called after unmount
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });
}); 