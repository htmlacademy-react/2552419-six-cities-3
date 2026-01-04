import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import NearPlaces from './near-places';
import { OfferType } from '../../constants';
import type { Offer } from '../../types/offer';
import { rootReducer } from '../../store/root-reducer';
import { createAPI } from '../../api/api';

const mockOffer: Offer = {
  id: '1',
  title: 'Test Offer',
  type: OfferType.Apartment,
  price: 100,
  previewImage: 'preview.jpg',
  images: ['image1.jpg'],
  rating: 4.5,
  isFavorite: false,
  isPremium: true,
  city: { name: 'Paris' },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  bedrooms: 2,
  maxAdults: 4,
  goods: ['WiFi'],
  description: 'Test description',
  host: {
    name: 'John Doe',
    avatarUrl: 'avatar.jpg',
    isPro: true,
  },
};

const createMockStore = () => {
  const api = createAPI();
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }),
  });
};

describe('NearPlaces', () => {
  it('should render near places section', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NearPlaces offers={[mockOffer]} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
  });

  it('should render multiple offers', () => {
    const store = createMockStore();
    const offers: Offer[] = [
      mockOffer,
      { ...mockOffer, id: '2', title: 'Second Offer' },
      { ...mockOffer, id: '3', title: 'Third Offer' },
    ];

    render(
      <Provider store={store}>
        <BrowserRouter>
          <NearPlaces offers={offers} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Test Offer')).toBeInTheDocument();
    expect(screen.getByText('Second Offer')).toBeInTheDocument();
    expect(screen.getByText('Third Offer')).toBeInTheDocument();
  });

  it('should render empty list', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NearPlaces offers={[]} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
  });
});

