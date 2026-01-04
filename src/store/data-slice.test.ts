import { describe, it, expect } from 'vitest';
import dataReducer, { selectCity, selectOffers, selectOffersByCity, selectFavoriteOffers, selectOfferById, selectIsLoading, selectServerError, selectNearbyOffers } from './data-slice';
import { changeCity, loadOffers, updateOffer, setLoading, setServerError, updateOfferFavorite, loadNearbyOffers } from './data-actions';
import type { Offer, City } from '../types/offer';
import { OfferType } from '../constants';
import type { RootState } from './root-reducer';
import { AuthorizationStatus } from './auth-slice';

const mockOffer: Offer = {
  id: '1',
  title: 'Test Offer',
  type: OfferType.Apartment,
  price: 100,
  previewImage: 'preview.jpg',
  images: ['image1.jpg', 'image2.jpg'],
  rating: 4.5,
  isFavorite: false,
  isPremium: true,
  city: { name: 'Paris' },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  bedrooms: 2,
  maxAdults: 4,
  goods: ['WiFi', 'Heating'],
  description: 'Test description',
  host: {
    name: 'John Doe',
    avatarUrl: 'avatar.jpg',
    isPro: true,
  },
};

const mockOffer2: Offer = {
  ...mockOffer,
  id: '2',
  city: { name: 'Amsterdam' },
  isFavorite: true,
};

describe('dataReducer', () => {
  it('should return initial state', () => {
    const state = dataReducer(undefined, { type: 'unknown' });
    expect(state).toEqual({
      city: { name: 'Paris' },
      offers: [],
      nearbyOffers: {},
      isLoading: false,
      serverError: false,
    });
  });

  it('should handle changeCity', () => {
    const newCity: City = { name: 'Amsterdam' };
    const state = dataReducer(undefined, changeCity(newCity));
    expect(state.city).toEqual(newCity);
  });

  it('should handle loadOffers', () => {
    const offers: Offer[] = [mockOffer, mockOffer2];
    const state = dataReducer(undefined, loadOffers(offers));
    expect(state.offers).toEqual(offers);
  });

  it('should handle updateOffer - add new offer', () => {
    const state = dataReducer(undefined, updateOffer(mockOffer));
    expect(state.offers).toHaveLength(1);
    expect(state.offers[0]).toEqual(mockOffer);
  });

  it('should handle updateOffer - update existing offer', () => {
    const initialState = dataReducer(undefined, loadOffers([mockOffer]));
    const updatedOffer: Offer = { ...mockOffer, title: 'Updated Title' };
    const state = dataReducer(initialState, updateOffer(updatedOffer));
    expect(state.offers).toHaveLength(1);
    expect(state.offers[0].title).toBe('Updated Title');
    expect(state.offers[0].previewImage).toBe('preview.jpg');
  });

  it('should handle updateOffer - preserve previewImage from existing offer', () => {
    const initialState = dataReducer(undefined, loadOffers([mockOffer]));
    const updatedOffer: Offer = { ...mockOffer, previewImage: undefined };
    const state = dataReducer(initialState, updateOffer(updatedOffer));
    expect(state.offers[0].previewImage).toBe('preview.jpg');
  });

  it('should handle updateOffer - use first image if previewImage is missing', () => {
    const offerWithoutPreview: Offer = { ...mockOffer, previewImage: undefined };
    const state = dataReducer(undefined, updateOffer(offerWithoutPreview));
    expect(state.offers[0].previewImage).toBe('image1.jpg');
  });

  it('should handle setLoading', () => {
    const state = dataReducer(undefined, setLoading(true));
    expect(state.isLoading).toBe(true);
  });

  it('should handle setServerError', () => {
    const state = dataReducer(undefined, setServerError(true));
    expect(state.serverError).toBe(true);
  });

  it('should handle updateOfferFavorite', () => {
    const initialState = dataReducer(undefined, loadOffers([mockOffer]));
    const state = dataReducer(initialState, updateOfferFavorite({ id: '1', isFavorite: true }));
    expect(state.offers[0].isFavorite).toBe(true);
  });

  it('should handle loadNearbyOffers', () => {
    const offers: Offer[] = [mockOffer2];
    const state = dataReducer(undefined, loadNearbyOffers({ offerId: '1', offers }));
    expect(state.nearbyOffers['1']).toEqual(offers);
  });
});

describe('dataSlice selectors', () => {
  const mockState: RootState = {
    data: {
      city: { name: 'Paris' },
      offers: [mockOffer, mockOffer2],
      nearbyOffers: { '1': [mockOffer2] },
      isLoading: false,
      serverError: false,
    },
    auth: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
    },
    reviews: {
      reviews: {},
      reviewsLoading: false,
      reviewsError: false,
    },
  };

  it('selectCity should return city', () => {
    expect(selectCity(mockState)).toEqual({ name: 'Paris' });
  });

  it('selectOffers should return all offers', () => {
    expect(selectOffers(mockState)).toHaveLength(2);
  });

  it('selectOffersByCity should filter offers by city', () => {
    const offers = selectOffersByCity(mockState);
    expect(offers).toHaveLength(1);
    expect(offers[0].city.name).toBe('Paris');
  });

  it('selectFavoriteOffers should return only favorite offers', () => {
    const favorites = selectFavoriteOffers(mockState);
    expect(favorites).toHaveLength(1);
    expect(favorites[0].isFavorite).toBe(true);
  });

  it('selectOfferById should return offer by id', () => {
    const offer = selectOfferById(mockState, '1');
    expect(offer).toEqual(mockOffer);
  });

  it('selectOfferById should return undefined for non-existent id', () => {
    const offer = selectOfferById(mockState, '999');
    expect(offer).toBeUndefined();
  });

  it('selectIsLoading should return loading state', () => {
    expect(selectIsLoading(mockState)).toBe(false);
  });

  it('selectServerError should return error state', () => {
    expect(selectServerError(mockState)).toBe(false);
  });

  it('selectNearbyOffers should return nearby offers for offerId', () => {
    const nearby = selectNearbyOffers(mockState, '1');
    expect(nearby).toEqual([mockOffer2]);
  });

  it('selectNearbyOffers should return empty array for non-existent offerId', () => {
    const nearby = selectNearbyOffers(mockState, '999');
    expect(nearby).toEqual([]);
  });
});

