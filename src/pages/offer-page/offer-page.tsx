import { FC } from 'react';
import { useParams } from 'react-router-dom';
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
import ReviewForm from '../../components/review-form/review-form';
import Map from '../../components/map/map';
import PlaceCard from '../../components/place-card/place-card';
import { PlaceCardVariant } from '../../types/place-card-variant';
import { Offer } from '../../types/offer';
import { MOCK_REVIEWS } from '../../mocks/reviews';
import { NEARBY_OFFERS_COUNT, DEFAULT_BEDROOMS_COUNT, DEFAULT_MAX_ADULTS_COUNT, DEFAULT_FAVORITE_COUNT, PREMIUM_OFFER_INDEX, GALLERY_IMAGES, INSIDE_ITEMS } from '../../constants';

type OfferPageProps = {
  offers: Offer[];
}

const OfferPage: FC<OfferPageProps> = ({offers}) => {
  const { id } = useParams();
  const currentOffer = offers.find((offer) => offer.id === id);
  const nearbyOffers = offers.filter((offer) => offer.id !== id).slice(0, NEARBY_OFFERS_COUNT);
  const mapOffers = currentOffer ? [currentOffer, ...nearbyOffers] : nearbyOffers;

  if (!currentOffer) {
    return (
      <div className="page">
        <Header />
        <main className="page__main">
          <div className="container">
            <p>Offer not found</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <Header
        user={{
          email: 'Oliver.conner@gmail.com',
          favoriteCount: DEFAULT_FAVORITE_COUNT,
        }}
      />

      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery images={GALLERY_IMAGES} />
          <div className="offer__container container">
            <div className="offer__wrapper">
              <PremiumMark variant="offer" />
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <BookmarkButton size="large" isActive={currentOffer.isFavorite} />
              </div>
              <Rating rating={currentOffer.rating} className="offer__rating" showValue />
              <OfferFeatures type={currentOffer.type} bedrooms={DEFAULT_BEDROOMS_COUNT} maxAdults={DEFAULT_MAX_ADULTS_COUNT} />
              <Price value={currentOffer.price} variant="offer" />
              <OfferInside items={INSIDE_ITEMS} />
              <OfferHost
                name="Angelina"
                avatarUrl="img/avatar-angelina.jpg"
                isPro
                description={[
                  'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
                  'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
                ]}
              />
              <Reviews reviews={MOCK_REVIEWS} />
              <ReviewForm />
            </div>
          </div>
          <Map offers={mapOffers} selectedOfferId={currentOffer?.id} className="offer__map" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearbyOffers.map((offer, index) => (
                <PlaceCard
                  key={offer.id}
                  offer={offer}
                  variant={PlaceCardVariant.NearPlaces}
                  isPremium={index === PREMIUM_OFFER_INDEX}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default OfferPage;
