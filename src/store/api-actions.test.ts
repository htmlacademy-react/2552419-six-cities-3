import { describe, it, expect, beforeEach } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { configureStore } from '@reduxjs/toolkit';
import {
  fetchOffersAction,
  fetchOfferByIdAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchReviewsAction,
  submitReviewAction,
  fetchNearbyOffersAction,
  toggleFavoriteAction,
  fetchFavoriteOffersAction,
} from './api-actions';
import { rootReducer } from './root-reducer';
import { createAPI } from '../api/api';
import { HTTP_STATUS, FAVORITE_STATUS } from '../constants';
import { AuthorizationStatus } from './auth-slice';
import type { ServerOffer, ServerReview } from '../utils/map-offer-server-to-offer';

const mockApi = createAPI();
const mockAdapter = new MockAdapter(mockApi);

const createMockStore = (initialState = {}) =>
  configureStore({
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
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      },
      reviews: {
        reviews: {},
        reviewsLoading: false,
        reviewsError: false,
      },
      ...initialState,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: mockApi,
        },
      }),
  });

const mockServerOffer: ServerOffer = {
  id: '1',
  title: 'Test Offer',
  type: 'apartment',
  price: 100,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 10,
    },
  },
  location: {
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 10,
  },
  isFavorite: false,
  isPremium: true,
  rating: 4.5,
  previewImage: 'preview.jpg',
  images: ['image1.jpg'],
  bedrooms: 2,
  maxAdults: 4,
  goods: ['WiFi'],
  host: {
    name: 'John',
    avatarUrl: 'avatar.jpg',
    isPro: true,
  },
  description: 'Test description',
} as ServerOffer;

const mockServerReview: ServerReview = {
  id: '1',
  user: {
    name: 'John',
    avatarUrl: 'avatar.jpg',
  },
  rating: 5,
  comment: 'Great!',
  date: '2024-01-01T00:00:00.000Z',
} as ServerReview;

describe('api-actions', () => {
  beforeEach(() => {
    mockAdapter.reset();
  });

  describe('fetchOffersAction', () => {
    it('should fetch offers successfully', async () => {
      const store = createMockStore();
      mockAdapter.onGet('/offers').reply(200, [mockServerOffer]);

      await store.dispatch(fetchOffersAction());

      const state = store.getState();
      expect(state.data.offers).toHaveLength(1);
      expect(state.data.isLoading).toBe(false);
      expect(state.data.serverError).toBe(false);
    });

    it('should handle network error', async () => {
      const store = createMockStore();
      mockAdapter.onGet('/offers').networkError();

      await store.dispatch(fetchOffersAction());

      const state = store.getState();
      expect(state.data.serverError).toBe(true);
      expect(state.data.isLoading).toBe(false);
    });

    it('should handle unauthorized error', async () => {
      const store = createMockStore();
      mockAdapter.onGet('/offers').reply(HTTP_STATUS.UNAUTHORIZED);

      await store.dispatch(fetchOffersAction());

      const state = store.getState();
      expect(state.auth.user).toBeNull();
      expect(state.data.isLoading).toBe(false);
    });
  });

  describe('fetchOfferByIdAction', () => {
    it('should fetch offer by id successfully', async () => {
      const store = createMockStore();
      mockAdapter.onGet('/offers/1').reply(200, mockServerOffer);

      const result = await store.dispatch(fetchOfferByIdAction('1'));

      expect(result.type).toBe('data/fetchOfferById/fulfilled');
      const state = store.getState();
      expect(state.data.offers).toHaveLength(1);
    });

    it('should handle 404 error', async () => {
      const store = createMockStore();
      mockAdapter.onGet('/offers/999').reply(HTTP_STATUS.NOT_FOUND);

      const result = await store.dispatch(fetchOfferByIdAction('999'));

      expect(result.type).toBe('data/fetchOfferById/rejected');
      expect(fetchOfferByIdAction.rejected.match(result)).toBeTruthy();
      if (fetchOfferByIdAction.rejected.match(result) && 'meta' in result && 'rejectedWithValue' in result.meta && result.meta.rejectedWithValue) {
        expect('payload' in result && result.payload).toBe('NOT_FOUND');
      }
    });
  });

  describe('checkAuthAction', () => {
    it('should check auth successfully', async () => {
      const store = createMockStore();
      const mockAuthInfo = {
        token: 'test-token',
        email: 'test@example.com',
        avatarUrl: 'avatar.jpg',
      };
      mockAdapter.onGet('/login').reply(200, mockAuthInfo);

      await store.dispatch(checkAuthAction());

      const state = store.getState();
      expect(state.auth.authorizationStatus).toBe(AuthorizationStatus.Auth);
      expect(state.auth.user?.email).toBe('test@example.com');
    });

    it('should handle unauthorized error', async () => {
      const store = createMockStore();
      mockAdapter.onGet('/login').reply(HTTP_STATUS.UNAUTHORIZED);

      const result = await store.dispatch(checkAuthAction());

      expect(result.type).toBe('auth/checkAuth/rejected');
      const state = store.getState();
      expect(state.auth.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    });
  });

  describe('loginAction', () => {
    it('should login successfully', async () => {
      const store = createMockStore();
      const mockAuthInfo = {
        token: 'test-token',
        email: 'test@example.com',
        avatarUrl: 'avatar.jpg',
      };
      mockAdapter.onPost('/login').reply(200, mockAuthInfo);

      await store.dispatch(loginAction({ email: 'test@example.com', password: 'password123' }));

      const state = store.getState();
      expect(state.auth.authorizationStatus).toBe(AuthorizationStatus.Auth);
      expect(state.auth.user?.email).toBe('test@example.com');
    });

    it('should handle bad request error', async () => {
      const store = createMockStore();
      mockAdapter.onPost('/login').reply(HTTP_STATUS.BAD_REQUEST, { error: 'Invalid credentials' });

      const result = await store.dispatch(loginAction({ email: 'test@example.com', password: 'wrong' }));

      expect(result.type).toBe('auth/login/rejected');
    });
  });

  describe('logoutAction', () => {
    it('should logout successfully', async () => {
      const store = createMockStore();
      store.dispatch({ type: 'auth/requireAuthorization', payload: AuthorizationStatus.Auth });
      store.dispatch({ type: 'auth/setUser', payload: { email: 'test@example.com' } });

      await store.dispatch(logoutAction());

      const state = store.getState();
      expect(state.auth.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(state.auth.user).toBeNull();
    });
  });

  describe('fetchReviewsAction', () => {
    it('should fetch reviews successfully', async () => {
      const store = createMockStore();
      mockAdapter.onGet('/comments/1').reply(200, [mockServerReview]);

      await store.dispatch(fetchReviewsAction('1'));

      const state = store.getState();
      expect(state.reviews.reviews['1']).toHaveLength(1);
    });

    it('should handle network error', async () => {
      const store = createMockStore();
      mockAdapter.onGet('/comments/1').networkError();

      await store.dispatch(fetchReviewsAction('1'));

      const state = store.getState();
      expect(state.reviews.reviews['1'] || []).toEqual([]);
    });
  });

  describe('submitReviewAction', () => {
    it('should submit review successfully', async () => {
      const store = createMockStore();
      mockAdapter.onPost('/comments/1').reply(200, mockServerReview);

      const result = await store.dispatch(submitReviewAction({
        offerId: '1',
        reviewData: { rating: 5, comment: 'Great!' },
      }));

      expect(result.type).toBe('reviews/submitReview/fulfilled');
      const state = store.getState();
      expect(state.reviews.reviews['1']).toHaveLength(1);
      expect(state.reviews.reviewsLoading).toBe(false);
    });

    it('should handle error', async () => {
      const store = createMockStore();
      mockAdapter.onPost('/comments/1').reply(HTTP_STATUS.BAD_REQUEST, { error: 'Bad request' });

      const result = await store.dispatch(submitReviewAction({
        offerId: '1',
        reviewData: { rating: 5, comment: 'Great!' },
      }));

      expect(result.type).toBe('reviews/submitReview/rejected');
      const state = store.getState();
      expect(state.reviews.reviewsError).toBe(true);
    });
  });

  describe('fetchNearbyOffersAction', () => {
    it('should fetch nearby offers successfully', async () => {
      const store = createMockStore();
      mockAdapter.onGet('/offers/1/nearby').reply(200, [mockServerOffer]);

      await store.dispatch(fetchNearbyOffersAction('1'));

      const state = store.getState();
      expect(state.data.nearbyOffers['1']).toHaveLength(1);
    });

    it('should handle network error', async () => {
      const store = createMockStore();
      mockAdapter.onGet('/offers/1/nearby').networkError();

      await store.dispatch(fetchNearbyOffersAction('1'));

      const state = store.getState();
      expect(state.data.nearbyOffers['1'] || []).toEqual([]);
    });
  });

  describe('toggleFavoriteAction', () => {
    it('should toggle favorite successfully', async () => {
      const store = createMockStore();
      mockAdapter.onPost(`/favorite/1/${FAVORITE_STATUS.ACTIVE}`).reply(200, { ...mockServerOffer, isFavorite: true });

      await store.dispatch(toggleFavoriteAction({ offerId: '1', isFavorite: true }));

      const state = store.getState();
      const offer = state.data.offers.find((o) => o.id === '1');
      expect(offer?.isFavorite).toBe(true);
    });
  });

  describe('fetchFavoriteOffersAction', () => {
    it('should fetch favorite offers successfully', async () => {
      const store = createMockStore();
      mockAdapter.onGet('/favorite').reply(200, [{ ...mockServerOffer, isFavorite: true }]);

      await store.dispatch(fetchFavoriteOffersAction());

      const state = store.getState();
      expect(state.data.offers).toHaveLength(1);
      expect(state.data.offers[0].isFavorite).toBe(true);
    });

    it('should handle unauthorized error', async () => {
      const store = createMockStore();
      mockAdapter.onGet('/favorite').reply(HTTP_STATUS.UNAUTHORIZED);

      const result = await store.dispatch(fetchFavoriteOffersAction());
      expect(result.type).toBe('data/fetchFavoriteOffers/rejected');
    });
  });
});

