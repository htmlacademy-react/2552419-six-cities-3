import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import PlacesList from './places-list';
import { rootReducer } from '../../store/root-reducer';
import { AuthorizationStatus } from '../../store/auth-slice';
import { createAPI } from '../../api/api';
import type { Offer } from '../../types/offer';
import { OfferType, SortType } from '../../constants';

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

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Test Offer 1',
    type: OfferType.Apartment,
    price: 100,
    previewImage: 'preview1.jpg',
    images: ['image1.jpg'],
    rating: 4.5,
    isFavorite: false,
    isPremium: true,
    city: { name: 'Paris' },
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
    bedrooms: 2,
    maxAdults: 4,
    goods: ['WiFi'],
    description: 'Test description 1',
    host: {
      name: 'John',
      avatarUrl: 'avatar.jpg',
      isPro: true,
    },
  },
  {
    id: '2',
    title: 'Test Offer 2',
    type: OfferType.Room,
    price: 200,
    previewImage: 'preview2.jpg',
    images: ['image2.jpg'],
    rating: 4.0,
    isFavorite: true,
    isPremium: false,
    city: { name: 'Paris' },
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
    bedrooms: 1,
    maxAdults: 2,
    goods: ['WiFi', 'TV'],
    description: 'Test description 2',
    host: {
      name: 'Jane',
      avatarUrl: 'avatar2.jpg',
      isPro: false,
    },
  },
];

describe('PlacesList', () => {
  it('should render places list', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlacesList offers={mockOffers} offersCount={2} cityName="Paris" />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('2 places to stay in Paris')).toBeInTheDocument();
  });

  it('should render all offers', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlacesList offers={mockOffers} offersCount={2} cityName="Paris" />
        </MemoryRouter>
      </Provider>
    );
    mockOffers.map((offer) =>
      expect(screen.getByText(offer.title)).toBeInTheDocument()
    );
  });

  it('should render sort options', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlacesList offers={mockOffers} offersCount={2} cityName="Paris" />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });

  it('should display current sort', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlacesList
            offers={mockOffers}
            offersCount={2}
            cityName="Paris"
            currentSort="Price: low to high"
          />
        </MemoryRouter>
      </Provider>
    );
    const sortType = screen.getByTestId('sorting-type');
    expect(sortType).toHaveTextContent('Price: low to high');
  });

  it('should call onCardHover when card is hovered', async () => {
    const store = createMockStore();
    const handleCardHover = vi.fn();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlacesList
            offers={mockOffers}
            offersCount={2}
            cityName="Paris"
            onCardHover={handleCardHover}
          />
        </MemoryRouter>
      </Provider>
    );

    const card = screen.getByText('Test Offer 1').closest('article');
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
          <PlacesList
            offers={mockOffers}
            offersCount={2}
            cityName="Paris"
            onCardHover={vi.fn()}
            onCardLeave={handleCardLeave}
          />
        </MemoryRouter>
      </Provider>
    );

    const card = screen.getByText('Test Offer 1').closest('article');
    if (card) {
      await user.hover(card);
      await user.unhover(card);
      expect(handleCardLeave).toHaveBeenCalled();
    }
  });

  it('should call onSortChange when sort option is clicked', async () => {
    const store = createMockStore();
    const handleSortChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlacesList
            offers={mockOffers}
            offersCount={2}
            cityName="Paris"
            currentSort="Popular"
            isSortOpen
            onSortChange={handleSortChange}
          />
        </MemoryRouter>
      </Provider>
    );

    const priceOption = screen.getByText('Price: low to high');
    await user.click(priceOption);
    expect(handleSortChange).toHaveBeenCalledWith(SortType.PriceLow);
  });

  it('should call onSortToggle when sort button is clicked', async () => {
    const store = createMockStore();
    const handleSortToggle = vi.fn();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlacesList
            offers={mockOffers}
            offersCount={2}
            cityName="Paris"
            currentSort="Popular"
            onSortToggle={handleSortToggle}
          />
        </MemoryRouter>
      </Provider>
    );

    const sortButton = screen.getByTestId('sorting-type');
    await user.click(sortButton);
    expect(handleSortToggle).toHaveBeenCalled();
  });
});

