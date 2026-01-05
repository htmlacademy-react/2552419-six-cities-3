import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Reviews from './reviews';
import { rootReducer } from '../../store/root-reducer';
import { AuthorizationStatus } from '../../store/auth-slice';
import { createAPI } from '../../api/api';
import type { Review } from '../../types/offer';

const mockReview1: Review = {
  id: '1',
  user: {
    name: 'John Doe',
    avatarUrl: 'avatar1.jpg',
  },
  rating: 5,
  comment: 'Great place!',
  date: '2024-01-15T00:00:00.000Z',
};

const mockReview2: Review = {
  id: '2',
  user: {
    name: 'Jane Smith',
    avatarUrl: 'avatar2.jpg',
  },
  rating: 4,
  comment: 'Nice location',
  date: '2024-01-20T00:00:00.000Z',
};

const mockReview3: Review = {
  id: '3',
  user: {
    name: 'Bob Johnson',
    avatarUrl: 'avatar3.jpg',
  },
  rating: 3,
  comment: 'Average',
  date: '2024-01-10T00:00:00.000Z',
};

describe('Reviews', () => {
  it('should render reviews list', () => {
    const reviews = [mockReview1, mockReview2];
    render(<Reviews reviews={reviews} />);
    reviews.map((review) =>
      expect(screen.getByText(review.user.name)).toBeInTheDocument()
    );
  });

  it('should display reviews count', () => {
    render(<Reviews reviews={[mockReview1, mockReview2]} />);
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    const reviewsAmount = screen.getByText('2');
    expect(reviewsAmount).toBeInTheDocument();
  });

  it('should sort reviews by date descending', () => {
    render(<Reviews reviews={[mockReview1, mockReview2, mockReview3]} />);
    const reviews = screen.getAllByText(/John Doe|Jane Smith|Bob Johnson/i);
    expect(reviews[0]).toHaveTextContent('Jane Smith');
    expect(reviews[1]).toHaveTextContent('John Doe');
    expect(reviews[2]).toHaveTextContent('Bob Johnson');
  });

  it('should limit reviews to max display count', () => {
    const manyReviews = Array.from({ length: 15 }, (_, i) => ({
      ...mockReview1,
      id: String(i),
      date: `2024-01-${String(i + 1).padStart(2, '0')}T00:00:00.000Z`,
    }));
    render(<Reviews reviews={manyReviews} />);
    const reviewItems = screen.getAllByText('John Doe');
    expect(reviewItems.length).toBeLessThanOrEqual(10);
  });

  it('should render review form when showForm is true and offerId is provided', () => {
    const api = createAPI();
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        data: {
          city: { name: 'Paris' },
          offers: [],
          nearbyOffers: {},
          isLoading: false,
          serverError: false,
        },
        auth: {
          authorizationStatus: AuthorizationStatus.Auth,
          user: { email: 'test@example.com' },
        },
        reviews: {
          reviews: {},
          reviewsLoading: false,
          reviewsError: false,
        },
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: api,
          },
        }),
    });
    render(
      <Provider store={store}>
        <Reviews reviews={[mockReview1]} showForm offerId="1" />
      </Provider>
    );
    expect(screen.getByLabelText('Your review')).toBeInTheDocument();
  });

  it('should not render review form when showForm is false', () => {
    render(<Reviews reviews={[mockReview1]} showForm={false} offerId="1" />);
    expect(screen.queryByLabelText('Your review')).not.toBeInTheDocument();
  });

  it('should not render review form when offerId is not provided', () => {
    render(<Reviews reviews={[mockReview1]} showForm />);
    expect(screen.queryByLabelText('Your review')).not.toBeInTheDocument();
  });
});

