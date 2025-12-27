import { combineReducers } from '@reduxjs/toolkit';
import dataReducer from './data-slice';
import authReducer from './auth-slice';
import reviewsReducer from './reviews-slice';

export const rootReducer = combineReducers({
  data: dataReducer,
  auth: authReducer,
  reviews: reviewsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

