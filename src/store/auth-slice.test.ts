import { describe, it, expect } from 'vitest';
import authReducer, { selectAuthorizationStatus, selectUser, selectIsAuthorized, AuthorizationStatus } from './auth-slice';
import { requireAuthorization, setUser } from './auth-actions';
import type { User } from '../types/offer';
import type { RootState } from './root-reducer';

const mockUser: User = {
  email: 'test@example.com',
  avatarUrl: 'avatar.jpg',
};

describe('authReducer', () => {
  it('should return initial state', () => {
    const state = authReducer(undefined, { type: 'unknown' });
    expect(state).toEqual({
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    });
  });

  it('should handle requireAuthorization', () => {
    const state = authReducer(undefined, requireAuthorization(AuthorizationStatus.Auth));
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should handle setUser', () => {
    const state = authReducer(undefined, setUser(mockUser));
    expect(state.user).toEqual(mockUser);
  });

  it('should handle setUser with null', () => {
    const initialState = authReducer(undefined, setUser(mockUser));
    const state = authReducer(initialState, setUser(null));
    expect(state.user).toBeNull();
  });

  it('should handle requireAuthorization and setUser together', () => {
    let state = authReducer(undefined, requireAuthorization(AuthorizationStatus.Auth));
    state = authReducer(state, setUser(mockUser));
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.user).toEqual(mockUser);
  });
});

describe('authSlice selectors', () => {
  const mockState: RootState = {
    data: {
      city: { name: 'Paris' },
      offers: [],
      nearbyOffers: {},
      isLoading: false,
      serverError: false,
    },
    auth: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: mockUser,
    },
    reviews: {
      reviews: {},
      reviewsLoading: false,
      reviewsError: false,
    },
  };

  it('selectAuthorizationStatus should return authorization status', () => {
    expect(selectAuthorizationStatus(mockState)).toBe(AuthorizationStatus.Auth);
  });

  it('selectUser should return user', () => {
    expect(selectUser(mockState)).toEqual(mockUser);
  });

  it('selectIsAuthorized should return true when authorized', () => {
    expect(selectIsAuthorized(mockState)).toBe(true);
  });

  it('selectIsAuthorized should return false when not authorized', () => {
    const notAuthorizedState: RootState = {
      ...mockState,
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    };
    expect(selectIsAuthorized(notAuthorizedState)).toBe(false);
  });
});

