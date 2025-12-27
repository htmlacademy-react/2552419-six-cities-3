import { FC, ReactElement, memo } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAuth } from '../../hooks/use-auth';

type PrivateRouteProps = {
  children: ReactElement;
}

const PrivateRoute: FC<PrivateRouteProps> = memo(({children}) => {
  const { isAuthorized } = useAuth();
  return isAuthorized ? children : <Navigate to={AppRoute.Login} />;
});

PrivateRoute.displayName = 'PrivateRoute';

export default PrivateRoute;

