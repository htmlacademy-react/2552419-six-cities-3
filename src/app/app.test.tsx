import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../store/root-reducer';
import { AuthorizationStatus } from '../store/auth-slice';
import { AppRoute } from '../constants';
import { createAPI } from '../api/api';
import MainPage from '../pages/main-page/main-page';
import LoginPage from '../pages/login-page/login-page';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import OfferPage from '../pages/offer-page/offer-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import PrivateRoute from '../components/private-route/private-route';

vi.mock('../store/api-actions', async () => {
  const actual = await vi.importActual<typeof import('../store/api-actions')>('../store/api-actions');
  return {
    ...actual,
    fetchOffersAction: vi.fn(() => ({ type: 'data/fetchOffers' })),
    checkAuthAction: vi.fn(() => ({ type: 'auth/checkAuth' })),
  };
});

vi.mock('../hooks/use-mount', () => ({
  useMount: vi.fn(() => {
  }),
}));

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

const createTestRouter = (route: string, store: ReturnType<typeof createMockStore>) => {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/favorites',
        element: (
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/offer/:id',
        element: <OfferPage />,
      },
      {
        path: '/404',
        element: <NotFoundPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
    {
      initialEntries: [route],
    }
  );

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

const renderApp = (route: string, store = createMockStore()) =>
  render(createTestRouter(route, store));

describe('App routing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render MainPage on / route', () => {
    const store = createMockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });
    renderApp('/', store);
    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render MainPage on /main route', () => {
    const store = createMockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });
    renderApp(AppRoute.Main, store);
    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render LoginPage on /login route', () => {
    const store = createMockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });
    renderApp(AppRoute.Login, store);
    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should render NotFoundPage on /offer/:id route', () => {
    const store = createMockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });
    renderApp('/offer/123', store);
  });

  it('should render NotFoundPage on unknown route', () => {
    const store = createMockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });
    renderApp('/unknown-route', store);
  });

  it('should redirect to LoginPage when accessing Favorites without auth', () => {
    const store = createMockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });
    renderApp(AppRoute.Favorites, store);
    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should render FavoritesPage when authorized', () => {
    const store = createMockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: 'test@example.com' },
      },
    });
    renderApp(AppRoute.Favorites, store);
    const savedListing = screen.queryByText(/Saved listing/i);
    const nothingYet = screen.queryByText(/Nothing yet saved/i);
    expect(savedListing || nothingYet).toBeTruthy();
  });
});
