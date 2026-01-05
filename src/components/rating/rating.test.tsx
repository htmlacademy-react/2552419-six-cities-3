import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Rating from './rating';

describe('Rating', () => {
  it('should render correctly', () => {
    render(<Rating rating={4.5} />);
    const ratingElement = screen.getByText('Rating').closest('.rating');
    expect(ratingElement).toBeInTheDocument();
  });

  it('should render with value when showValue is true', () => {
    render(<Rating rating={4.5} showValue />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('should not render value when showValue is false', () => {
    render(<Rating rating={4.5} showValue={false} />);
    expect(screen.queryByText('4.5')).not.toBeInTheDocument();
  });

  it('should render with custom className', () => {
    render(<Rating rating={4.5} className="custom-class" />);
    const ratingElement = screen.getByText('Rating').closest('.rating');
    expect(ratingElement).toHaveClass('rating', 'custom-class');
  });

  it('should round rating correctly', () => {
    const { container } = render(<Rating rating={4.3} />);
    const span = container.querySelector('.rating__stars span');
    expect(span).toHaveStyle({ width: '80%' }); // 4 * 20% = 80%
  });
});

