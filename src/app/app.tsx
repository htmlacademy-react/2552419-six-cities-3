import { FC, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../pages/main-page/main-page';
import LoginPage from '../pages/login-page/login-page';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import OfferPage from '../pages/offer-page/offer-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import PrivateRoute from '../components/private-route/private-route';
import Spinner from '../components/spinner/spinner';
import { AppRoute } from '../constants';
import { fetchOffersAction } from '../store/api-actions';
import { useAppDispatch, useAppSelector } from '../store';
import { selectIsLoading } from '../store/data-slice';

const App: FC = () => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment
  const isLoading = useAppSelector(selectIsLoading);
  const isAuthorized = false;

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  const baseUrl = import.meta.env.BASE_URL || '';
  const basename = baseUrl.replace(/\/$/, '');

  if (isLoading) {
    return <Spinner />;
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
            <PrivateRoute isAuthorized={isAuthorized}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
