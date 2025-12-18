import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../constants';

type PrivateRouteProps = {
  children: ReactElement;
  isAuthorized: boolean;
}

const PrivateRoute: FC<PrivateRouteProps> = ({children, isAuthorized}) => (isAuthorized ? children : <Navigate to={AppRoute.Login} />);

export default PrivateRoute;

