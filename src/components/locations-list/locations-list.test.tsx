import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import LocationsList from './locations-list';
import { rootReducer } from '../../store/root-reducer';
import { AuthorizationStatus } from '../../store/auth-slice';
import { createAPI } from '../../api/api';
import type { City } from '../../types/offer';

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
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
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

const mockCities: City[] = [
  { name: 'Paris' },
  { name: 'Cologne' },
  { name: 'Brussels' },
];

describe('LocationsList', () => {
  it('should render list of cities', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LocationsList cities={mockCities} />
        </MemoryRouter>
      </Provider>
    );
    mockCities.map((city) =>
      expect(screen.getByText(city.name)).toBeInTheDocument()
    );
  });

  it('should highlight active city', () => {
    const store = createMockStore({
      data: {
        city: { name: 'Paris' },
        offers: [],
        nearbyOffers: {},
        isLoading: false,
        serverError: false,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LocationsList cities={mockCities} activeCity={{ name: 'Paris' }} />
        </MemoryRouter>
      </Provider>
    );
    const parisLink = screen.getByText('Paris').closest('a');
    expect(parisLink).toHaveClass('tabs__item--active');
  });


  it('should highlight city with isActive flag', () => {
    const citiesWithActive: City[] = [
      { name: 'Paris', isActive: true },
      { name: 'Cologne', isActive: false },
    ];
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LocationsList cities={citiesWithActive} />
        </MemoryRouter>
      </Provider>
    );
    const parisLink = screen.getByText('Paris').closest('a');
    expect(parisLink).toHaveClass('tabs__item--active');
  });
});

