import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingFallback from '../LoadingFallback';

describe('LoadingFallback', () => {
  it('renders with default message', () => {
    render(<LoadingFallback />);
    
    expect(screen.getByText('Loading model comparison tool...')).toBeInTheDocument();
    expect(screen.getByText('🔄')).toBeInTheDocument();
  });

  it('renders with custom message', () => {
    const customMessage = 'Loading custom content...';
    render(<LoadingFallback message={customMessage} />);
    
    expect(screen.getByText(customMessage)).toBeInTheDocument();
    expect(screen.getByText('🔄')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<LoadingFallback />);
    
    const container = screen.getByText('Loading model comparison tool...').parentElement;
    expect(container).toHaveClass('loadingFallback');
    
    const icon = screen.getByText('🔄');
    expect(icon).toHaveClass('loadingIcon');
    
    const text = screen.getByText('Loading model comparison tool...');
    expect(text).toHaveClass('loadingText');
  });

  it('has proper accessibility attributes', () => {
    render(<LoadingFallback />);
    
    const container = screen.getByText('Loading model comparison tool...').parentElement;
    expect(container).toHaveAttribute('role', 'status');
    expect(container).toHaveAttribute('aria-live', 'polite');
  });

  it('handles empty message gracefully', () => {
    render(<LoadingFallback message="" />);
    
    expect(screen.getByText('🔄')).toBeInTheDocument();
    // Should still render the container even with empty message
    const container = screen.getByText('🔄').parentElement;
    expect(container).toBeInTheDocument();
  });

  it('handles very long messages', () => {
    const longMessage = 'This is a very long loading message that should still be displayed properly without breaking the layout or causing any issues with the component rendering';
    render(<LoadingFallback message={longMessage} />);
    
    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });
});