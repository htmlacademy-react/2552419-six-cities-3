import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../pages/main-page/main-page';
import LoginPage from '../pages/login-page/login-page';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import OfferPage from '../pages/offer-page/offer-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import PrivateRoute from '../components/private-route/private-route';
import { Offer } from '../types/offer';
import { AppRoute } from '../constants';

type AppProps = {
  offersCount: number;
  offers: Offer[];
}

const App: FC<AppProps> = ({offersCount, offers}) => {
  const isAuthorized = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage offersCount={offersCount} offers={offers} />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute isAuthorized={isAuthorized}>
              <FavoritesPage offers={offers} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferPage offers={offers} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
