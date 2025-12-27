import { createReducer } from '@reduxjs/toolkit';
import type { RootState } from '../hooks/use-redux';
import type { User } from '../types/offer';
import { requireAuthorization, setUser } from './auth-actions';

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export type AuthState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
}

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
});

export default authReducer;

export const selectAuthorizationStatus = (state: RootState): AuthorizationStatus => state.auth.authorizationStatus;
export const selectUser = (state: RootState): User | null => state.auth.user;
export const selectIsAuthorized = (state: RootState): boolean => state.auth.authorizationStatus === AuthorizationStatus.Auth;

