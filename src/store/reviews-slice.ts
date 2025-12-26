import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { Review } from '../types/offer';
import type { RootState } from '../hooks/use-redux';
import { submitReviewAction } from './api-actions';

export type ReviewsState = {
  reviews: Record<string, Review[]>;
  reviewsLoading: boolean;
  reviewsError: boolean;
}

const initialState: ReviewsState = {
  reviews: {},
  reviewsLoading: false,
  reviewsError: false,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    loadReviews: (state, action: PayloadAction<{ offerId: string; reviews: Review[] }>) => {
      state.reviews[action.payload.offerId] = action.payload.reviews;
    },
    addReview: (state, action: PayloadAction<{ offerId: string; review: Review }>) => {
      const { offerId, review } = action.payload;
      if (!state.reviews[offerId]) {
        state.reviews[offerId] = [];
      }
      state.reviews[offerId].unshift(review);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitReviewAction.pending, (state) => {
        state.reviewsLoading = true;
        state.reviewsError = false;
      })
      .addCase(submitReviewAction.fulfilled, (state) => {
        state.reviewsLoading = false;
        state.reviewsError = false;
      })
      .addCase(submitReviewAction.rejected, (state) => {
        state.reviewsLoading = false;
        state.reviewsError = true;
      });
  },
});

export const { loadReviews, addReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;

const EMPTY_REVIEWS_ARRAY: Review[] = [];

const selectReviewsState = (state: RootState) => state.reviews.reviews;

export const selectReviewsByOfferId = createSelector(
  [selectReviewsState, (_state: RootState, offerId: string) => offerId],
  (reviews, offerId): Review[] => reviews[offerId] || EMPTY_REVIEWS_ARRAY
);

export const selectReviewsLoading = (state: RootState) => state.reviews.reviewsLoading;
export const selectReviewsError = (state: RootState) => state.reviews.reviewsError;

