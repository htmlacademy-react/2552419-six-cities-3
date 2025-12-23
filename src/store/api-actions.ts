import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Offer } from '../types/offer';
import type { AxiosInstance } from 'axios';
import { loadOffers, setLoading } from './data-slice';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.get<Offer[]>('/offers');
      dispatch(loadOffers(data));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

