import { createAction } from '@reduxjs/toolkit';
import type { Review } from '../types/offer';

export const loadReviews = createAction<{ offerId: string; reviews: Review[] }>('reviews/loadReviews');
export const addReview = createAction<{ offerId: string; review: Review }>('reviews/addReview');

