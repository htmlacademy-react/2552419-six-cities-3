import { FC } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import PlaceCard from '../../components/place-card/place-card';
import { PlaceCardVariant } from '../../types/place-card-variant';
import { Offer } from '../../types/offer';
import { AMSTERDAM_OFFERS_COUNT, DEFAULT_FAVORITE_COUNT, FIRST_OFFER_INDEX } from '../../constants';

type FavoritesPageProps = {
  offers: Offer[];
}

const FavoritesPage: FC<FavoritesPageProps> = ({offers}) => {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const amsterdamOffers = favoriteOffers.slice(0, AMSTERDAM_OFFERS_COUNT);
  const cologneOffers = favoriteOffers.slice(AMSTERDAM_OFFERS_COUNT);

  return (
    <div className="page">
      <Header
        user={{
          email: 'Oliver.conner@gmail.com',
          favoriteCount: DEFAULT_FAVORITE_COUNT,
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
                      isPremium={index === FIRST_OFFER_INDEX}
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
