import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import MainEmpty from './main-empty';
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

const mockCity: City = { name: 'Paris' };
const mockCities: City[] = [
  { name: 'Paris' },
  { name: 'Cologne' },
  { name: 'Brussels' },
];

describe('MainEmpty', () => {
  it('should render main empty page', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainEmpty city={mockCity} cities={mockCities} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  it('should display no places message', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainEmpty city={mockCity} cities={mockCities} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });

  it('should display city name in description', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainEmpty city={mockCity} cities={mockCities} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/We could not find any property available at the moment in Paris/i)).toBeInTheDocument();
  });

  it('should render header', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainEmpty city={mockCity} cities={mockCities} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('should render locations list', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainEmpty city={mockCity} cities={mockCities} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });
});

