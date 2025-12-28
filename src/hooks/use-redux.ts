import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { store } from '../store';
import type { RootState } from '../store/root-reducer';

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useActionCreators<AC extends Record<string, (...args: never[]) => unknown>>(actions: AC) {
  const dispatch = useAppDispatch();
  return bindActionCreators(actions, dispatch);
}

export type { RootState, AppDispatch };

