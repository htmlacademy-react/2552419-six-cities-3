import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import AuthorizedNavList from './authorized-nav-list';
import { rootReducer } from '../../store/root-reducer';
import { AuthorizationStatus } from '../../store/auth-slice';
import { createAPI } from '../../api/api';

vi.mock('../../store/api-actions', async () => {
  const actual = await vi.importActual<typeof import('../../store/api-actions')>('../../store/api-actions');
  return {
    ...actual,
    logoutAction: vi.fn(() => ({ type: 'auth/logout' })),
  };
});

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

describe('AuthorizedNavList', () => {
  it('should render user email', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthorizedNavList />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('should render sign out button', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthorizedNavList />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });


  it('should display favorite count when favorites exist', () => {
    const store = createMockStore({
      data: {
        city: { name: 'Paris' },
        offers: [
          {
            id: '1',
            title: 'Test',
            type: 'apartment' as const,
            price: 100,
            previewImage: 'preview.jpg',
            images: [],
            rating: 4.5,
            isFavorite: true,
            isPremium: false,
            city: { name: 'Paris' },
            location: { latitude: 0, longitude: 0, zoom: 10 },
            bedrooms: 2,
            maxAdults: 4,
            goods: [],
            description: 'Test',
            host: { name: 'John', avatarUrl: 'avatar.jpg', isPro: true },
          },
        ],
        nearbyOffers: {},
        isLoading: false,
        serverError: false,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthorizedNavList />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should not render when user is null', () => {
    const store = createMockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthorizedNavList />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });
});

