import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import type { State } from './reducer';

const store = configureStore({
  reducer: {
    data: reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { RootState, AppDispatch, State };

