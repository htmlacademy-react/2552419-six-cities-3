import { FC, useMemo } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FavoriteCitySection from '../../components/favorite-city-section/favorite-city-section';
import FavoritesEmptyPage from '../favorites-empty-page/favorites-empty-page';
import { selectFavoriteOffers } from '../../store/data-slice';
import { useAppSelector, useAppDispatch } from '../../hooks/use-redux';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import { useMount } from '../../hooks/use-mount';
import type { Offer } from '../../types/offer';

const FavoritesPage: FC = () => {
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(selectFavoriteOffers);

  useMount(() => {
    void dispatch(fetchFavoriteOffersAction());
  });

  const offersByCity = useMemo(() => {
    const grouped: Record<string, Offer[]> = {};
    favoriteOffers.forEach((offer) => {
      const cityName = offer.city.name;
      if (!grouped[cityName]) {
        grouped[cityName] = [];
      }
      grouped[cityName].push(offer);
    });
    return grouped;
  }, [favoriteOffers]);

  const cityNames = Object.keys(offersByCity);

  if (favoriteOffers.length === 0) {
    return <FavoritesEmptyPage />;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cityNames.map((cityName) => (
                <FavoriteCitySection key={cityName} cityName={cityName} offers={offersByCity[cityName]} />
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
