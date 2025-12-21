import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import dataReducer from './data-slice';
import type { DataState } from './data-slice';

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function useActionCreators<AC extends Record<string, (...args: never[]) => unknown>>(actions: AC) {
  const dispatch = useAppDispatch();
  return bindActionCreators(actions, dispatch);
}

export { store, useAppDispatch, useAppSelector, useActionCreators };
export type { RootState, AppDispatch };
export type { DataState as State };

