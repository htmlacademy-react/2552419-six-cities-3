import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Offer, City } from '../types/offer';
import type { RootState } from './index';

export type DataState = {
  city: City;
  offers: Offer[];
  isLoading: boolean;
}

const initialState: DataState = {
  city: { name: 'Paris' },
  offers: [],
  isLoading: false,
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { changeCity, loadOffers, setLoading } = dataSlice.actions;
export default dataSlice.reducer;

export const selectCity = (state: RootState) => state.data.city;
export const selectOffers = (state: RootState) => state.data.offers;
export const selectOffersByCity = (state: RootState) => {
  const city = state.data.city;
  return state.data.offers.filter((offer) => offer.city.name === city.name);
};
export const selectFavoriteOffers = (state: RootState) => state.data.offers.filter((offer) => offer.isFavorite);
export const selectOfferById = (state: RootState, id: string | undefined) => {
  if (!id) {
    return undefined;
  }
  return state.data.offers.find((offer) => offer.id === id);
};
export const selectIsLoading = (state: RootState): boolean => state.data.isLoading;

