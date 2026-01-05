import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
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

const mockFetchOfferByIdAction = vi.fn();

vi.mock('../store/api-actions', async () => {
  const actual = await vi.importActual<typeof import('../store/api-actions')>('../store/api-actions');
  return {
    ...actual,
    fetchOffersAction: vi.fn(() => ({ type: 'data/fetchOffers' })),
    checkAuthAction: vi.fn(() => ({ type: 'auth/checkAuth' })),
    get fetchOfferByIdAction(): unknown {
      return mockFetchOfferByIdAction() as unknown;
    },
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
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  it('should render MainPage on /main route', () => {
    const store = createMockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });
    renderApp(AppRoute.Main, store);
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  it('should render LoginPage on /login route', () => {
    const store = createMockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });
    renderApp(AppRoute.Login, store);
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('should render NotFoundPage on /offer/:id route when offer not found', async () => {
    const rejectedAction = {
      type: 'data/fetchOfferById/rejected',
      payload: 'NOT_FOUND',
      meta: { rejectedWithValue: true },
    };
    mockFetchOfferByIdAction.mockReturnValue(
      Object.assign(
        () => () => Promise.resolve(rejectedAction),
        {
          rejected: {
            match: (action: { type: string }) => action.type === 'data/fetchOfferById/rejected',
          },
          fulfilled: {
            match: () => false,
          },
        }
      )
    );

    const store = createMockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });

    render(createTestRouter('/offer/123', store));

    await waitFor(
      () => {
        expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    expect(screen.queryByTestId('offer-page')).not.toBeInTheDocument();
  });

  it('should render NotFoundPage on unknown route', () => {
    const store = createMockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });
    renderApp('/unknown-route', store);
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });

  it('should redirect to LoginPage when accessing Favorites without auth', () => {
    const store = createMockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });
    renderApp(AppRoute.Favorites, store);
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('should render FavoritesPage when authorized', () => {
    const store = createMockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: 'test@example.com' },
      },
    });
    renderApp(AppRoute.Favorites, store);
    expect(screen.getByTestId('favorites-page')).toBeInTheDocument();
  });
});
