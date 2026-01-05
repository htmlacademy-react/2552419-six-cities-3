import { describe, it, expect } from 'vitest';
import reviewsReducer, { selectReviewsByOfferId, selectReviewsLoading, selectReviewsError } from './reviews-slice';
import { loadReviews, addReview } from './reviews-actions';
import { submitReviewAction } from './api-actions';
import type { Review } from '../types/offer';
import type { RootState } from './root-reducer';
import { AuthorizationStatus } from './auth-slice';

const mockReview: Review = {
  id: '1',
  user: {
    name: 'John Doe',
    avatarUrl: 'avatar.jpg',
  },
  rating: 5,
  comment: 'Great place!',
  date: '2024-01-01T00:00:00.000Z',
};

const mockReview2: Review = {
  id: '2',
  user: {
    name: 'Jane Smith',
    avatarUrl: 'avatar2.jpg',
  },
  rating: 4,
  comment: 'Nice location',
  date: '2024-01-02T00:00:00.000Z',
};

describe('reviewsReducer', () => {
  it('should return initial state', () => {
    const state = reviewsReducer(undefined, { type: 'unknown' });
    expect(state).toEqual({
      reviews: {},
      reviewsLoading: false,
      reviewsError: false,
    });
  });

  it('should handle loadReviews', () => {
    const reviews: Review[] = [mockReview, mockReview2];
    const state = reviewsReducer(undefined, loadReviews({ offerId: '1', reviews }));
    expect(state.reviews['1']).toEqual(reviews);
  });

  it('should handle loadReviews for multiple offers', () => {
    let state = reviewsReducer(undefined, loadReviews({ offerId: '1', reviews: [mockReview] }));
    state = reviewsReducer(state, loadReviews({ offerId: '2', reviews: [mockReview2] }));
    expect(state.reviews['1']).toEqual([mockReview]);
    expect(state.reviews['2']).toEqual([mockReview2]);
  });

  it('should handle addReview', () => {
    const initialState = reviewsReducer(undefined, loadReviews({ offerId: '1', reviews: [mockReview] }));
    const newReview: Review = {
      id: '3',
      user: {
        name: 'Bob',
        avatarUrl: 'avatar3.jpg',
      },
      rating: 5,
      comment: 'Excellent!',
      date: '2024-01-03T00:00:00.000Z',
    };
    const state = reviewsReducer(initialState, addReview({ offerId: '1', review: newReview }));
    expect(state.reviews['1']).toHaveLength(2);
    expect(state.reviews['1'][0]).toEqual(newReview);
  });

  it('should handle addReview for new offerId', () => {
    const newReview: Review = {
      id: '3',
      user: {
        name: 'Bob',
        avatarUrl: 'avatar3.jpg',
      },
      rating: 5,
      comment: 'Excellent!',
      date: '2024-01-03T00:00:00.000Z',
    };
    const state = reviewsReducer(undefined, addReview({ offerId: '1', review: newReview }));
    expect(state.reviews['1']).toHaveLength(1);
    expect(state.reviews['1'][0]).toEqual(newReview);
  });

  it('should handle submitReviewAction.pending', () => {
    const state = reviewsReducer(undefined, submitReviewAction.pending('', { offerId: '1', reviewData: { rating: 5, comment: 'test' } }));
    expect(state.reviewsLoading).toBe(true);
    expect(state.reviewsError).toBe(false);
  });

  it('should handle submitReviewAction.fulfilled', () => {
    const initialState = reviewsReducer(undefined, submitReviewAction.pending('', { offerId: '1', reviewData: { rating: 5, comment: 'test' } }));
    const state = reviewsReducer(initialState, submitReviewAction.fulfilled(mockReview, '', { offerId: '1', reviewData: { rating: 5, comment: 'test' } }));
    expect(state.reviewsLoading).toBe(false);
    expect(state.reviewsError).toBe(false);
  });

  it('should handle submitReviewAction.rejected', () => {
    const initialState = reviewsReducer(undefined, submitReviewAction.pending('', { offerId: '1', reviewData: { rating: 5, comment: 'test' } }));
    const state = reviewsReducer(initialState, submitReviewAction.rejected(new Error('test'), '', { offerId: '1', reviewData: { rating: 5, comment: 'test' } }));
    expect(state.reviewsLoading).toBe(false);
    expect(state.reviewsError).toBe(true);
  });
});

describe('reviewsSlice selectors', () => {
  const mockState: RootState = {
    data: {
      city: { name: 'Paris' },
      offers: [],
      nearbyOffers: {},
      isLoading: false,
      serverError: false,
    },
    auth: {
      authorizationStatus: 'NO_AUTH' as AuthorizationStatus,
      user: null,
    },
    reviews: {
      reviews: {
        '1': [mockReview, mockReview2],
        '2': [mockReview],
      },
      reviewsLoading: false,
      reviewsError: false,
    },
  };

  it('selectReviewsByOfferId should return reviews for offerId', () => {
    const reviews = selectReviewsByOfferId(mockState, '1');
    expect(reviews).toHaveLength(2);
    expect(reviews).toEqual([mockReview, mockReview2]);
  });

  it('selectReviewsByOfferId should return empty array for non-existent offerId', () => {
    const reviews = selectReviewsByOfferId(mockState, '999');
    expect(reviews).toEqual([]);
  });

  it('selectReviewsLoading should return loading state', () => {
    expect(selectReviewsLoading(mockState)).toBe(false);
  });

  it('selectReviewsError should return error state', () => {
    expect(selectReviewsError(mockState)).toBe(false);
  });
});

