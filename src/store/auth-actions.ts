import { createAction } from '@reduxjs/toolkit';
import type { User } from '../types/offer';
import { AuthorizationStatus } from './auth-slice';

export const requireAuthorization = createAction<AuthorizationStatus>('auth/requireAuthorization');
export const setUser = createAction<User | null>('auth/setUser');

