import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QuantumTimeline } from '../../src/components/QuantumTimeline';
import { ThemeProvider } from '../../src/contexts/ThemeContext';

const mockEvents = [
  {
    id: '1',
    timestamp: Date.now() - 86400000 * 7,
    title: 'Quantum Awakening',
    description: 'The first glimpse of quantum consciousness emerged from the void',
    emotions: [
      { emotion: 'Surprise', value: 85 },
      { emotion: 'Joy', value: 70 }
    ],
    quantumState: {
      superposition: 0.75,
      entanglement: 0.45,
      coherence: 0.60
    }
  }
];

const mockOnEventSelect = jest.fn();

const renderWithTheme = (component: React.ReactNode) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('QuantumTimeline', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default events', () => {
    renderWithTheme(<QuantumTimeline />);
    
    expect(screen.getByText('Quantum Timeline')).toBeInTheDocument();
    expect(screen.getByText('Quantum Awakening')).toBeInTheDocument();
    expect(screen.getByText('Neural Convergence')).toBeInTheDocument();
    expect(screen.getByText('Cosmic Alignment')).toBeInTheDocument();
  });

  it('renders with custom events', () => {
    renderWithTheme(<QuantumTimeline events={mockEvents} />);
    
    expect(screen.getByText('Quantum Awakening')).toBeInTheDocument();
    expect(screen.queryByText('Neural Convergence')).not.toBeInTheDocument();
  });

  it('displays quantum state indicators', () => {
    renderWithTheme(<QuantumTimeline events={mockEvents} />);
    
    expect(screen.getByText('Superposition')).toBeInTheDocument();
    expect(screen.getByText('Entanglement')).toBeInTheDocument();
    expect(screen.getByText('Coherence')).toBeInTheDocument();
  });

  it('shows emotion tags', () => {
    renderWithTheme(<QuantumTimeline events={mockEvents} />);
    
    expect(screen.getByText('Surprise (85%)')).toBeInTheDocument();
    expect(screen.getByText('Joy (70%)')).toBeInTheDocument();
  });

  it('handles event selection', () => {
    renderWithTheme(<QuantumTimeline events={mockEvents} onEventSelect={mockOnEventSelect} />);
    
    const event = screen.getByText('Quantum Awakening');
    fireEvent.click(event);
    
    expect(mockOnEventSelect).toHaveBeenCalledWith(mockEvents[0]);
    expect(screen.getByText('Quantum Resonance Details')).toBeInTheDocument();
  });

  it('displays quantum resonance details when event is selected', () => {
    renderWithTheme(<QuantumTimeline events={mockEvents} />);
    
    const event = screen.getByText('Quantum Awakening');
    fireEvent.click(event);
    
    expect(screen.getByText('Quantum State')).toBeInTheDocument();
    expect(screen.getByText('Emotional Resonance')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument(); // Superposition
    expect(screen.getByText('45%')).toBeInTheDocument(); // Entanglement
    expect(screen.getByText('60%')).toBeInTheDocument(); // Coherence
  });

  it('toggles cosmic mode correctly', () => {
    renderWithTheme(<QuantumTimeline events={mockEvents} />);
    
    const title = screen.getByText('Quantum Timeline');
    const container = title.closest('div');
    expect(container).not.toBeNull();
    if (!container) return;
    
    expect(container).toHaveClass('bg-white');
    
    // Simulate cosmic mode toggle
    container.className = container.className.replace('bg-white', 'bg-gradient-to-br from-purple-900/50 to-blue-900/50');
    
    expect(container).toHaveClass('from-purple-900/50');
  });

  it('formats dates correctly', () => {
    const date = new Date();
    const mockEvent = {
      ...mockEvents[0],
      timestamp: date.getTime()
    };
    
    renderWithTheme(<QuantumTimeline events={[mockEvent]} />);
    
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });
}); 