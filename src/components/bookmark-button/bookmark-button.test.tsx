import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookmarkButton from './bookmark-button';

describe('BookmarkButton', () => {
  it('should render bookmark button', () => {
    render(<BookmarkButton />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should render active state when isActive is true', () => {
    render(<BookmarkButton isActive />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('place-card__bookmark-button--active');
  });

  it('should render inactive state when isActive is false', () => {
    render(<BookmarkButton isActive={false} />);
    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('place-card__bookmark-button--active');
  });

  it('should render with large size', () => {
    render(<BookmarkButton size="large" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('offer__bookmark-button');
  });

  it('should render with small size by default', () => {
    render(<BookmarkButton />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('place-card__bookmark-button');
  });

  it('should apply custom className', () => {
    render(<BookmarkButton className="custom-class" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('should display correct text when active', () => {
    render(<BookmarkButton isActive />);
    expect(screen.getByText('In bookmarks')).toBeInTheDocument();
  });

  it('should display correct text when inactive', () => {
    render(<BookmarkButton isActive={false} />);
    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
  });

  it('should call onClick when button is clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<BookmarkButton onClick={handleClick} />);
    const button = screen.getByRole('button');
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when onClick is not provided', async () => {
    const user = userEvent.setup();
    render(<BookmarkButton />);
    const button = screen.getByRole('button');
    await user.click(button);
    // Should not throw error
    expect(button).toBeInTheDocument();
  });
});

