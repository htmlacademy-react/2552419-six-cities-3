import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useAuth } from './use-auth';
import { rootReducer } from '../store/root-reducer';
import { AuthorizationStatus } from '../store/auth-slice';
import { createAPI } from '../api/api';

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

const createWrapper = (store: ReturnType<typeof createMockStore>) =>
  // eslint-disable-next-line react/display-name
  ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

describe('useAuth', () => {
  it('should return isAuthorized as false when not authorized', () => {
    const store = createMockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(store),
    });
    expect(result.current.isAuthorized).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('should return isAuthorized as true when authorized', () => {
    const mockUser = {
      email: 'test@example.com',
      avatarUrl: 'avatar.jpg',
    };
    const store = createMockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: mockUser,
      },
    });
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(store),
    });
    expect(result.current.isAuthorized).toBe(true);
    expect(result.current.user).toEqual(mockUser);
  });

  it('should return isAuthorized as false when status is Unknown', () => {
    const store = createMockStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      },
    });
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(store),
    });
    expect(result.current.isAuthorized).toBe(false);
    expect(result.current.user).toBeNull();
  });
});
