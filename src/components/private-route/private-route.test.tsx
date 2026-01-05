import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PrivateRoute from './private-route';
import { rootReducer } from '../../store/root-reducer';
import { AuthorizationStatus } from '../../store/auth-slice';
import { AppRoute } from '../../constants';
import { createAPI } from '../../api/api';

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

const TestComponent = () => <div data-testid="protected-content">Protected Content</div>;

describe('PrivateRoute', () => {
  it('should render children when authorized', () => {
    const store = createMockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: 'test@example.com' },
      },
    });

    const router = createMemoryRouter(
      [
        {
          path: '/protected',
          element: (
            <PrivateRoute>
              <TestComponent />
            </PrivateRoute>
          ),
        },
        {
          path: AppRoute.Login,
          element: <div data-testid="login-page">Login Page</div>,
        },
      ],
      {
        initialEntries: ['/protected'],
      }
    );

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  it('should redirect to login when not authorized', () => {
    const store = createMockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });

    const router = createMemoryRouter(
      [
        {
          path: '/protected',
          element: (
            <PrivateRoute>
              <TestComponent />
            </PrivateRoute>
          ),
        },
        {
          path: AppRoute.Login,
          element: <div data-testid="login-page">Login Page</div>,
        },
      ],
      {
        initialEntries: ['/protected'],
      }
    );

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });
});

