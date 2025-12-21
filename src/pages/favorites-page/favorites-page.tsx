import { FC, useMemo } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import PlaceCard from '../../components/place-card/place-card';
import { PlaceCardVariant } from '../../types/place-card-variant';
import { OFFER, FAVORITE_COUNT, MOCK_EMAIL } from '../../constants';
import { selectFavoriteOffers } from '../../store/data-slice';
import { useAppSelector } from '../../store';

const FavoritesPage: FC = () => {
  const favoriteOffers = useAppSelector(selectFavoriteOffers);
  const amsterdamOffers = useMemo(() => favoriteOffers.slice(0, OFFER.AMSTERDAM_COUNT), [favoriteOffers]);
  const cologneOffers = useMemo(() => favoriteOffers.slice(OFFER.AMSTERDAM_COUNT), [favoriteOffers]);

  return (
    <div className="page">
      <Header
        user={{
          email: MOCK_EMAIL,
          favoriteCount: FAVORITE_COUNT.DEFAULT,
        }}
      />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {amsterdamOffers.map((offer, index) => (
                    <PlaceCard
                      key={offer.id}
                      offer={offer}
                      variant={PlaceCardVariant.Favorites}
                      isPremium={index === OFFER.FIRST_INDEX}
                    />
                  ))}
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {cologneOffers.map((offer) => (
                    <PlaceCard
                      key={offer.id}
                      offer={offer}
                      variant={PlaceCardVariant.Favorites}
                    />
                  ))}
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
