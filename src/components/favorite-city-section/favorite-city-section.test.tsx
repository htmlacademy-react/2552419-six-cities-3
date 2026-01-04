import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FavoriteCitySection from './favorite-city-section';
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
  isFavorite: true,
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

describe('FavoriteCitySection', () => {
  it('should render city name and offers', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FavoriteCitySection cityName="Paris" offers={[mockOffer]} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Test Offer')).toBeInTheDocument();
  });

  it('should render multiple offers for city', () => {
    const store = createMockStore();
    const offers: Offer[] = [
      mockOffer,
      { ...mockOffer, id: '2', title: 'Second Offer' },
    ];

    render(
      <Provider store={store}>
        <BrowserRouter>
          <FavoriteCitySection cityName="Amsterdam" offers={offers} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Test Offer')).toBeInTheDocument();
    expect(screen.getByText('Second Offer')).toBeInTheDocument();
  });

  it('should render empty offers list', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FavoriteCitySection cityName="Cologne" offers={[]} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Cologne')).toBeInTheDocument();
  });
});

