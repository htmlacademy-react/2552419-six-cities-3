import { FC, useMemo } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FavoriteCitySection from '../../components/favorite-city-section/favorite-city-section';
import { OFFER } from '../../constants';
import { selectFavoriteOffers } from '../../store/data-slice';
import { useAppSelector, useAppDispatch } from '../../hooks/use-redux';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import { useMount } from '../../hooks/use-mount';

const FavoritesPage: FC = () => {
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(selectFavoriteOffers);

  useMount(() => {
    void dispatch(fetchFavoriteOffersAction());
  });
  const amsterdamOffers = useMemo(() => favoriteOffers.slice(0, OFFER.AMSTERDAM_COUNT), [favoriteOffers]);
  const cologneOffers = useMemo(() => favoriteOffers.slice(OFFER.AMSTERDAM_COUNT), [favoriteOffers]);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <FavoriteCitySection cityName="Amsterdam" offers={amsterdamOffers} />
              <FavoriteCitySection cityName="Cologne" offers={cologneOffers} />
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
