import { createReducer, createSelector } from '@reduxjs/toolkit';
import type { Offer, City } from '../types/offer';
import type { RootState } from '../hooks/use-redux';
import { changeCity, loadOffers, updateOffer, setLoading, setServerError, updateOfferFavorite, loadNearbyOffers } from './data-actions';
import { OFFER, CITY_NAME } from '../constants';

export type DataState = {
  city: City;
  offers: Offer[];
  nearbyOffers: Record<string, Offer[]>;
  isLoading: boolean;
  serverError: boolean;
}

const initialState: DataState = {
  city: { name: CITY_NAME.DEFAULT_ACTIVE },
  offers: [],
  nearbyOffers: {},
  isLoading: false,
  serverError: false,
};

const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(updateOffer, (state, action) => {
      const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
      const firstImageIndex = OFFER.FIRST_IMAGE_INDEX as number;
      if (index !== -1) {
        const existingOffer = state.offers[index];
        state.offers[index] = {
          ...action.payload,
          previewImage: action.payload.previewImage || existingOffer.previewImage || action.payload.images?.[firstImageIndex],
        };
      } else {
        state.offers.push({
          ...action.payload,
          previewImage: action.payload.previewImage || action.payload.images?.[firstImageIndex],
        });
      }
    })
    .addCase(setLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setServerError, (state, action) => {
      state.serverError = action.payload;
    })
    .addCase(updateOfferFavorite, (state, action) => {
      const offer = state.offers.find((o) => o.id === action.payload.id);
      if (offer) {
        offer.isFavorite = action.payload.isFavorite;
      }
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers[action.payload.offerId] = action.payload.offers;
    });
});

export default dataReducer;

export const selectCity = (state: RootState) => state.data.city;
export const selectOffers = (state: RootState) => state.data.offers;
export const selectOffersByCity = createSelector(
  [selectOffers, selectCity],
  (offers, city) => offers.filter((offer: Offer) => offer.city.name === city.name)
);
export const selectFavoriteOffers = createSelector(
  [selectOffers],
  (offers) => offers.filter((offer: Offer) => offer.isFavorite)
);
const EMPTY_ARRAY: Offer[] = [];

export const selectOfferById = createSelector(
  [selectOffers, (_state: RootState, id: string | undefined) => id],
  (offers, id) => {
    if (!id) {
      return undefined;
    }
    return offers.find((offer: Offer) => offer.id === id);
  }
);

export const selectIsLoading = (state: RootState): boolean => state.data.isLoading;
export const selectServerError = (state: RootState): boolean => state.data.serverError;

const selectNearbyOffersRecord = (state: RootState) => state.data.nearbyOffers;
export const selectNearbyOffers = createSelector(
  [selectNearbyOffersRecord, (_state: RootState, offerId: string | undefined) => offerId],
  (nearbyOffersRecord, offerId): Offer[] => {
    if (!offerId) {
      return EMPTY_ARRAY;
    }
    return nearbyOffersRecord[offerId] || EMPTY_ARRAY;
  }
);

