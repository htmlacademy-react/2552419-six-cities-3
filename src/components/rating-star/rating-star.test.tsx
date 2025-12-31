import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RatingStar from './rating-star';

describe('RatingStar', () => {
  const mockOnChange = vi.fn();

  it('should render rating star input', () => {
    render(
      <RatingStar
        value={5}
        title="perfect"
        checked={false}
        onChange={mockOnChange}
      />
    );

    const input = screen.getByRole('radio');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('value', '5');
    expect(input).not.toBeChecked();
  });

  it('should render checked rating star', () => {
    render(
      <RatingStar
        value={4}
        title="good"
        checked
        onChange={mockOnChange}
      />
    );

    const input = screen.getByRole('radio');
    expect(input).toBeChecked();
    expect(input).toHaveAttribute('value', '4');
  });

  it('should render disabled rating star', () => {
    render(
      <RatingStar
        value={3}
        title="not bad"
        checked={false}
        onChange={mockOnChange}
        disabled
      />
    );

    const input = screen.getByRole('radio');
    expect(input).toBeDisabled();
  });

  it('should render with correct title attribute', () => {
    render(
      <RatingStar
        value={2}
        title="badly"
        checked={false}
        onChange={mockOnChange}
      />
    );

    const label = screen.getByTitle('badly');
    expect(label).toBeInTheDocument();
  });
});

