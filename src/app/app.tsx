import { FC, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import MainPage from '../pages/main-page/main-page';
import LoginPage from '../pages/login-page/login-page';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import OfferPage from '../pages/offer-page/offer-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import PrivateRoute from '../components/private-route/private-route';
import { AppRoute } from '../constants';
import { loadOffers } from '../store/data-slice';
import { useActionCreators } from '../store';
import { MOCK_OFFERS } from '../mocks/offers';
import type { Offer } from '../types/offer';

type ApiResponse = {
  offers: Offer[];
}

const App: FC = () => {
  const actions = useActionCreators({ loadOffers });
  const isAuthorized = false;

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const baseUrl = import.meta.env.BASE_URL || '';
        const apiPath = baseUrl ? `${baseUrl.replace(/\/$/, '')}/api/offers` : '/api/offers';
        const response = await axios.get<string>(apiPath);
        const parsedData = JSON.parse(response.data) as ApiResponse | Offer[];
        const offers = Array.isArray(parsedData) ? parsedData : parsedData.offers;
        actions.loadOffers(offers);
      } catch {
        actions.loadOffers(MOCK_OFFERS);
      }
    };

    fetchOffers();
  }, [actions]);

  const baseUrl = import.meta.env.BASE_URL || '';
  const basename = baseUrl.replace(/\/$/, '');

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
