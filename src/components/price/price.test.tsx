import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Price from './price';

describe('Price', () => {
  it('should render correctly with default props', () => {
    render(<Price value={100} />);
    expect(screen.getByText('€100')).toBeInTheDocument();
    expect(screen.getByText('/ night')).toBeInTheDocument();
  });

  it('should render with offer variant', () => {
    const { container } = render(<Price value={200} variant="offer" />);
    expect(screen.getByText('€200')).toBeInTheDocument();
    const nightText = container.querySelector('.offer__price-text');
    expect(nightText).toBeInTheDocument();
    expect(nightText?.textContent).toContain('night');
  });

  it('should render without text when showText is false', () => {
    render(<Price value={150} showText={false} />);
    expect(screen.getByText('€150')).toBeInTheDocument();
    expect(screen.queryByText('/ night')).not.toBeInTheDocument();
  });

  it('should render with custom className', () => {
    render(<Price value={100} className="custom-class" />);
    const priceElement = screen.getByText('€100').closest('div');
    expect(priceElement).toHaveClass('place-card__price', 'custom-class');
  });
});

