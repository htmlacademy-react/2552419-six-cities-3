import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { createAPI } from '../api/api';
import { REDUX } from '../constants';

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
      serializableCheck: {
        warnAfter: REDUX.SERIALIZABLE_CHECK_WARN_AFTER as number,
      },
    }),
});

export type { RootState } from './root-reducer';

