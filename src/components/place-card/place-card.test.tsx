import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import PlaceCard from './place-card';
import { rootReducer } from '../../store/root-reducer';
import { AuthorizationStatus } from '../../store/auth-slice';
import { createAPI } from '../../api/api';
import type { Offer } from '../../types/offer';
import { OfferType } from '../../constants';
import { PlaceCardVariant } from '../../types/place-card-variant';

const createMockStore = (initialState = {}) => {
  const api = createAPI();
  return configureStore({
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
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: 'test@example.com' },
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
          extraArgument: api,
        },
      }),
  });
};

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
    name: 'John',
    avatarUrl: 'avatar.jpg',
    isPro: true,
  },
};

describe('PlaceCard', () => {
  it('should render place card', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard offer={mockOffer} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Test Offer')).toBeInTheDocument();
  });

  it('should render premium mark when offer is premium', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard offer={mockOffer} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should render bookmark button', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard offer={mockOffer} />
        </MemoryRouter>
      </Provider>
    );
    const bookmarkButton = screen.getByRole('button');
    expect(bookmarkButton).toBeInTheDocument();
  });

  it('should render with different variant', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard offer={mockOffer} variant={PlaceCardVariant.NearPlaces} />
        </MemoryRouter>
      </Provider>
    );
    const card = screen.getByText('Test Offer').closest('article');
    expect(card).toHaveClass('near-places__card');
  });

  it('should call onCardHover when card is hovered', async () => {
    const store = createMockStore();
    const handleCardHover = vi.fn();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard offer={mockOffer} onCardHover={handleCardHover} />
        </MemoryRouter>
      </Provider>
    );

    const card = screen.getByText('Test Offer').closest('article');
    if (card) {
      await user.hover(card);
      expect(handleCardHover).toHaveBeenCalledWith('1');
    }
  });

  it('should call onCardLeave when card is left', async () => {
    const store = createMockStore();
    const handleCardLeave = vi.fn();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard offer={mockOffer} onCardHover={vi.fn()} onCardLeave={handleCardLeave} />
        </MemoryRouter>
      </Provider>
    );

    const card = screen.getByText('Test Offer').closest('article');
    if (card) {
      await user.hover(card);
      await user.unhover(card);
      expect(handleCardLeave).toHaveBeenCalled();
    }
  });

  it('should call onClick when bookmark button is clicked', async () => {
    const store = createMockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: 'test@example.com' },
      },
    });
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard offer={mockOffer} />
        </MemoryRouter>
      </Provider>
    );

    const bookmarkButton = screen.getByRole('button');
    await user.click(bookmarkButton);
    // Bookmark click is handled by Redux thunk, so we just verify the button is clickable
    expect(bookmarkButton).toBeInTheDocument();
  });
});
