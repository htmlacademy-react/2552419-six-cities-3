import { FC } from 'react';
import Header from '../../components/header/header';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import PremiumMark from '../../components/premium-mark/premium-mark';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';
import Rating from '../../components/rating/rating';
import OfferFeatures from '../../components/offer-features/offer-features';
import Price from '../../components/price/price';
import OfferInside from '../../components/offer-inside/offer-inside';
import OfferHost from '../../components/offer-host/offer-host';
import Reviews from '../../components/reviews/reviews';
import Map from '../../components/map/map';
import PlaceCard from '../../components/place-card/place-card';
import { PlaceCardVariant } from '../../types/place-card-variant';
import { OFFER, MOCK_OFFER, GALLERY_IMAGES, INSIDE_ITEMS, REVIEWS_DATA, NEARBY_OFFERS } from '../../constants';

const OfferNotLoggedPage: FC = () => (
  <div className="page">
    <Header />

    <main className="page__main page__main--offer">
      <section className="offer">
        <OfferGallery images={GALLERY_IMAGES} />
        <div className="offer__container container">
          <div className="offer__wrapper">
            <PremiumMark variant="offer" />
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                Beautiful &amp; luxurious studio at great location
              </h1>
              <BookmarkButton size="large" />
            </div>
            <Rating rating={MOCK_OFFER.RATING} className="offer__rating" showValue />
            <OfferFeatures type="Apartment" bedrooms={OFFER.DEFAULT_BEDROOMS_COUNT} maxAdults={OFFER.DEFAULT_MAX_ADULTS_COUNT} />
            <Price value={MOCK_OFFER.PRICE} variant="offer" />
            <OfferInside items={INSIDE_ITEMS} />
            <OfferHost
              name="Angelina"
              avatarUrl={`${import.meta.env.BASE_URL || ''}img/avatar-angelina.jpg`}
              isPro
              description={[
                'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
                'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
              ]}
            />
            <Reviews reviews={REVIEWS_DATA} />
          </div>
        </div>
        <Map offers={NEARBY_OFFERS} className="offer__map" />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {NEARBY_OFFERS.map((offer, index) => (
              <PlaceCard
                key={offer.id}
                offer={offer}
                variant={PlaceCardVariant.NearPlaces}
                isPremium={index === OFFER.PREMIUM_INDEX}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  </div>
);

export default OfferNotLoggedPage;
