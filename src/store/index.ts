import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './data-slice';
import authReducer from './auth-slice';
import reviewsReducer from './reviews-slice';
import type { DataState } from './data-slice';
import { createAPI } from '../api/api';

const api = createAPI();

export const store = configureStore({
  reducer: {
    data: dataReducer,
    auth: authReducer,
    reviews: reviewsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
      serializableCheck: {
        warnAfter: 128,
      },
    }),
});

export type { DataState as State };

