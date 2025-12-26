import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../pages/main-page/main-page';
import LoginPage from '../pages/login-page/login-page';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import OfferPage from '../pages/offer-page/offer-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import PrivateRoute from '../components/private-route/private-route';
import Spinner from '../components/spinner/spinner';
import { AppRoute } from '../constants';
import { fetchOffersAction, checkAuthAction } from '../store/api-actions';
import { useAppDispatch, useAppSelector } from '../hooks/use-redux';
import { selectIsLoading, selectServerError } from '../store/data-slice';
import { selectAuthorizationStatus, AuthorizationStatus } from '../store/auth-slice';
import ServerError from '../components/server-error/server-error';
import { useMount } from '../hooks/use-mount';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const serverError = useAppSelector(selectServerError);

  useMount(() => {
    dispatch(checkAuthAction());
    dispatch(fetchOffersAction());
  });

  const baseUrl = import.meta.env.BASE_URL || '';
  const basename = baseUrl.replace(/\/$/, '');

  if (isLoading || authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  if (serverError) {
    return <ServerError />;
  }

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route path={AppRoute.NotFound as string} element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
