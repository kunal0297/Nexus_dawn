import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ExpandableSection } from '../ExpandableSection';

describe('ExpandableSection', () => {
  const defaultProps = {
    title: 'Test Section',
    expanded: false,
    onToggle: jest.fn(),
    id: 'test-section',
    children: <div>Test Content</div>
  };

  it('renders with default props', () => {
    render(<ExpandableSection {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Show Test Section');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', 'test-section-content');
  });

  it('renders in expanded state', () => {
    render(<ExpandableSection {...defaultProps} expanded={true} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Hide Test Section');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    
    const content = screen.getByText('Test Content');
    expect(content).toBeInTheDocument();
  });

  it('calls onToggle when button is clicked', () => {
    render(<ExpandableSection {...defaultProps} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(defaultProps.onToggle).toHaveBeenCalledTimes(1);
  });

  it('applies cosmic mode styles', () => {
    render(<ExpandableSection {...defaultProps} isCosmicMode={true} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-purple-600');
  });

  it('applies custom class names', () => {
    render(
      <ExpandableSection
        {...defaultProps}
        className="custom-container"
        buttonClassName="custom-button"
      />
    );
    
    const container = screen.getByRole('button').parentElement;
    expect(container).toHaveClass('custom-container');
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-button');
  });

  it('renders children with proper ARIA attributes', () => {
    render(<ExpandableSection {...defaultProps} expanded={true} />);
    
    const content = screen.getByRole('region');
    expect(content).toHaveAttribute('aria-label', 'Test Section');
    expect(content).toHaveAttribute('id', 'test-section-content');
  });

  it('animates content when expanding/collapsing', () => {
    const { rerender } = render(<ExpandableSection {...defaultProps} />);
    
    // Initially collapsed
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
    
    // Expand
    rerender(<ExpandableSection {...defaultProps} expanded={true} />);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    
    // Collapse
    rerender(<ExpandableSection {...defaultProps} expanded={false} />);
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });
}); 