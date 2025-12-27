import { createAction } from '@reduxjs/toolkit';
import type { Offer, City } from '../types/offer';

export const changeCity = createAction<City>('data/changeCity');
export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const updateOffer = createAction<Offer>('data/updateOffer');
export const setLoading = createAction<boolean>('data/setLoading');
export const setServerError = createAction<boolean>('data/setServerError');
export const updateOfferFavorite = createAction<{ id: string; isFavorite: boolean }>('data/updateOfferFavorite');
export const loadNearbyOffers = createAction<{ offerId: string; offers: Offer[] }>('data/loadNearbyOffers');

