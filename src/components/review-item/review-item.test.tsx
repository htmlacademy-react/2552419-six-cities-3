import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item';

describe('ReviewItem', () => {
  const mockReview = {
    user: {
      name: 'John Doe',
      avatarUrl: 'avatar.jpg',
    },
    rating: 4.5,
    comment: 'Great place to stay!',
    date: '2024-01-15T00:00:00.000Z',
  };

  it('should render review information', () => {
    render(<ReviewItem {...mockReview} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Great place to stay!')).toBeInTheDocument();
  });

  it('should format date correctly', () => {
    render(<ReviewItem {...mockReview} />);

    expect(screen.getByText(/January 2024/i)).toBeInTheDocument();
  });

  it('should render different date format', () => {
    const reviewWithDifferentDate = {
      ...mockReview,
      date: '2024-06-20T00:00:00.000Z',
    };
    render(<ReviewItem {...reviewWithDifferentDate} />);

    expect(screen.getByText(/June 2024/i)).toBeInTheDocument();
  });

  it('should render rating component', () => {
    render(<ReviewItem {...mockReview} />);

    const ratingElement = screen.getByText('Rating');
    expect(ratingElement).toBeInTheDocument();
  });
});

