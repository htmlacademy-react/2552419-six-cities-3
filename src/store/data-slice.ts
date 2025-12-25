import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { Offer, City } from '../types/offer';
import type { RootState } from '../hooks/use-redux';

export type DataState = {
  city: City;
  offers: Offer[];
  nearbyOffers: Record<string, Offer[]>;
  isLoading: boolean;
  serverError: boolean;
}

const initialState: DataState = {
  city: { name: 'Paris' },
  offers: [],
  nearbyOffers: {},
  isLoading: false,
  serverError: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    loadOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    updateOffer: (state, action: PayloadAction<Offer>) => {
      const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
      if (index !== -1) {
        state.offers[index] = action.payload;
      } else {
        state.offers.push(action.payload);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setServerError: (state, action: PayloadAction<boolean>) => {
      state.serverError = action.payload;
    },
    updateOfferFavorite: (state, action: PayloadAction<{ id: string; isFavorite: boolean }>) => {
      const offer = state.offers.find((o) => o.id === action.payload.id);
      if (offer) {
        offer.isFavorite = action.payload.isFavorite;
      }
    },
    loadNearbyOffers: (state, action: PayloadAction<{ offerId: string; offers: Offer[] }>) => {
      state.nearbyOffers[action.payload.offerId] = action.payload.offers;
    },
  },
});

export const { changeCity, loadOffers, setLoading, setServerError, updateOffer, updateOfferFavorite, loadNearbyOffers } = dataSlice.actions;
export default dataSlice.reducer;

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

