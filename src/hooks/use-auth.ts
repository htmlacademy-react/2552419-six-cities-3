import { useMemo } from 'react';
import { useAppSelector } from './use-redux';
import { selectIsAuthorized, selectUser } from '../store/auth-slice';

export const useAuth = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const user = useAppSelector(selectUser);

  return useMemo(() => ({ isAuthorized, user }), [isAuthorized, user]);
};

