import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PremiumMark from './premium-mark';

describe('PremiumMark', () => {
  it('should render correctly with default variant', () => {
    render(<PremiumMark />);
    const mark = screen.getByText('Premium');
    expect(mark).toBeInTheDocument();
    expect(mark.closest('div')).toHaveClass('place-card__mark');
  });

  it('should render with offer variant', () => {
    render(<PremiumMark variant="offer" />);
    const mark = screen.getByText('Premium');
    expect(mark.closest('div')).toHaveClass('offer__mark');
  });

  it('should render with custom className', () => {
    render(<PremiumMark className="custom-class" />);
    const mark = screen.getByText('Premium');
    expect(mark.closest('div')).toHaveClass('place-card__mark', 'custom-class');
  });
});

