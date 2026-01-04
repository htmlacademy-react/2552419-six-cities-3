import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Offer, AuthInfo, Review, ReviewData } from '../types/offer';
import type { AxiosInstance } from 'axios';
import { AxiosError } from 'axios';
import { loadOffers, setLoading, setServerError, updateOffer, updateOfferFavorite, loadNearbyOffers } from './data-actions';
import { requireAuthorization, setUser } from './auth-actions';
import { AuthorizationStatus } from './auth-slice';
import { loadReviews, addReview } from './reviews-actions';
import { saveToken, dropToken } from '../api/token';
import { FAVORITE_STATUS, HTTP_STATUS } from '../constants';
import { mapOfferServerToOffer, mapReviewServerToReview, type ServerOffer, type ServerReview } from '../utils/map-offer-server-to-offer';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api, rejectWithValue }) => {
    dispatch(setLoading(true));
    dispatch(setServerError(false));
    try {
      const { data } = await api.get<ServerOffer[]>('/offers');
      const offers = data.map((item) => mapOfferServerToOffer(item));
      dispatch(loadOffers(offers));
      dispatch(setServerError(false));
      dispatch(setLoading(false));
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
        dispatch(setLoading(false));
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
        dispatch(setUser(null));
        dropToken();
        return rejectWithValue(undefined);
      }
      dispatch(setLoading(false));
      if (error instanceof AxiosError && !error.response) {
        dispatch(setServerError(true));
      } else if (!(error instanceof AxiosError)) {
        dispatch(setServerError(true));
      }
      throw error;
    }
  }
);

export const fetchOfferByIdAction = createAsyncThunk<
  Offer,
  string,
  { extra: AxiosInstance; rejectValue: 'NOT_FOUND' }
>(
  'data/fetchOfferById',
  async (offerId, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const response = await api.get<ServerOffer>(`/offers/${offerId}`);
      const offer = mapOfferServerToOffer(response.data);
      dispatch(updateOffer(offer));
      return offer;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === HTTP_STATUS.NOT_FOUND) {
        return rejectWithValue('NOT_FOUND');
      }
      throw error;
    }
  }
);

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>(
  'auth/checkAuth',
  async (_arg, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<AuthInfo>('/login');
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUser({
        email: data.email,
        avatarUrl: data.avatarUrl,
      }));
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
        dropToken();
        return rejectWithValue(undefined);
      }
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dropToken();
      return rejectWithValue(undefined);
    }
  }
);

export type LoginData = {
  email: string;
  password: string;
}

export const loginAction = createAsyncThunk<
  void,
  LoginData,
  { extra: AxiosInstance }
>(
  'auth/login',
  async ({ email, password }, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<AuthInfo>('/login', { email, password });
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUser({
        email: data.email,
        avatarUrl: data.avatarUrl,
      }));
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === HTTP_STATUS.BAD_REQUEST) {
        return rejectWithValue(error.response.data as unknown);
      }
      throw error;
    }
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>(
  'auth/logout',
  (_arg, { dispatch }) => {
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setUser(null));
  }
);

export type SubmitReviewData = {
  offerId: string;
  reviewData: ReviewData;
}

export const fetchReviewsAction = createAsyncThunk<
  void,
  string,
  { extra: AxiosInstance }
>(
  'reviews/fetchReviews',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const response = await api.get<ServerReview[]>(`/comments/${offerId}`);
      const reviews = response.data.map((item) => mapReviewServerToReview(item));
      dispatch(loadReviews({ offerId, reviews }));
    } catch (error) {
      if (error instanceof AxiosError && !error.response) {
        dispatch(loadReviews({ offerId, reviews: [] }));
      }
    }
  }
);

export const submitReviewAction = createAsyncThunk<
  Review,
  SubmitReviewData,
  { extra: AxiosInstance; rejectValue: unknown }
>(
  'reviews/submitReview',
  async ({ offerId, reviewData }, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const response = await api.post<ServerReview>(`/comments/${offerId}`, reviewData);
      const review = mapReviewServerToReview(response.data);
      dispatch(addReview({ offerId, review }));
      return review;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data as unknown);
      }
      throw error;
    }
  }
);

export type ToggleFavoriteData = {
  offerId: string;
  isFavorite: boolean;
}

export const fetchNearbyOffersAction = createAsyncThunk<
  void,
  string,
  { extra: AxiosInstance }
>(
  'data/fetchNearbyOffers',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const response = await api.get<ServerOffer[]>(`/offers/${offerId}/nearby`);
      const offers = response.data.map((item) => mapOfferServerToOffer(item));
      dispatch(loadNearbyOffers({ offerId, offers }));
    } catch (error) {
      if (error instanceof AxiosError && !error.response) {
        dispatch(loadNearbyOffers({ offerId, offers: [] }));
      }
    }
  }
);

export const toggleFavoriteAction = createAsyncThunk<
  Offer,
  ToggleFavoriteData,
  { extra: AxiosInstance }
>(
  'data/toggleFavorite',
  async ({ offerId, isFavorite }, { dispatch, extra: api }) => {
    const status = isFavorite ? FAVORITE_STATUS.ACTIVE : FAVORITE_STATUS.INACTIVE;
    const response = await api.post<ServerOffer>(`/favorite/${offerId}/${status}`);
    const offer = mapOfferServerToOffer(response.data);
    dispatch(updateOfferFavorite({ id: offerId, isFavorite }));
    dispatch(updateOffer(offer));
    return offer;
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>(
  'data/fetchFavoriteOffers',
  async (_arg, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<ServerOffer[]>('/favorite');
      const offers = data.map((item) => mapOfferServerToOffer(item));
      offers.forEach((offer) => {
        dispatch(updateOffer(offer));
      });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
        dispatch(setUser(null));
        dropToken();
        return rejectWithValue(undefined);
      }
      throw error;
    }
  }
);

