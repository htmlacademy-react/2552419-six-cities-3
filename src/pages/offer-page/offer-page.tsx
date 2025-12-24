import { FC, useMemo, useEffect, useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { OFFER, AppRoute } from '../../constants';
import { selectOffers, selectFavoriteOffers, selectNearbyOffers } from '../../store/data-slice';
import { selectReviewsByOfferId } from '../../store/reviews-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { useAuth } from '../../hooks/use-auth';
import { fetchReviewsAction, fetchOfferByIdAction, toggleFavoriteAction, fetchNearbyOffersAction } from '../../store/api-actions';

const OfferPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const offers = useAppSelector(selectOffers);
  const favoriteOffers = useAppSelector(selectFavoriteOffers);
  const { isAuthorized, user } = useAuth();
  const [isOfferLoading, setIsOfferLoading] = useState(true);
  const currentOffer = useMemo(() => offers.find((offer) => offer.id === id), [offers, id]);
  const nearbyOffersFromStore = useAppSelector((state) => selectNearbyOffers(state, id));
  const nearbyOffers = useMemo(() => nearbyOffersFromStore.slice(0, OFFER.NEARBY_COUNT), [nearbyOffersFromStore]);
  const mapOffers = useMemo(() => currentOffer ? [currentOffer, ...nearbyOffers] : nearbyOffers, [currentOffer, nearbyOffers]);
  const reviews = useAppSelector((state) => {
    if (!id) {
      return [];
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return selectReviewsByOfferId(state, id);
  });

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsOfferLoading(true);

    // Всегда запрашиваем информацию по предложению
    dispatch(fetchOfferByIdAction(id))
      .then((result) => {
        if (fetchOfferByIdAction.rejected.match(result) && result.payload === 'NOT_FOUND') {
          navigate('/non-existent-route-for-404', { replace: true });
        } else {
          // Запрашиваем nearby offers и reviews только если предложение найдено
          dispatch(fetchNearbyOffersAction(id));
          dispatch(fetchReviewsAction(id));
        }
      })
      .finally(() => {
        setIsOfferLoading(false);
      });
  }, [dispatch, id, navigate]);

  const handleBookmarkClick = useCallback(() => {
    if (!isAuthorized) {
      navigate(AppRoute.Login);
      return;
    }
    if (currentOffer && id) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      dispatch(toggleFavoriteAction({
        offerId: id,
        isFavorite: !currentOffer.isFavorite,
      }));
    }
  }, [isAuthorized, navigate, dispatch, currentOffer, id]);

  if (isOfferLoading) {
    return (
      <div className="page">
        <Header user={user || undefined} />
        <main className="page__main">
          <div className="container">
            <p>Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!currentOffer) {
    return null;
  }

  return (
    <div className="page">
      <Header
        user={user ? {
          email: user.email,
          avatarUrl: user.avatarUrl,
          favoriteCount: favoriteOffers.length,
        } : undefined}
      />

      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            images={currentOffer.images || (currentOffer.previewImage ? [currentOffer.previewImage] : [])}
          />
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && <PremiumMark variant="offer" />}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <BookmarkButton size="large" isActive={currentOffer.isFavorite} onClick={handleBookmarkClick} />
              </div>
              <Rating rating={currentOffer.rating} className="offer__rating" showValue />
              {currentOffer.bedrooms !== undefined && currentOffer.maxAdults !== undefined && (
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                <OfferFeatures type={currentOffer.type} bedrooms={currentOffer.bedrooms} maxAdults={currentOffer.maxAdults} />
              )}
              <Price value={currentOffer.price} variant="offer" />
              {currentOffer.goods && (
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
                currentOffer.goods.length > 0 && <OfferInside items={currentOffer.goods} />
              )}
              {currentOffer.description && (
                <div className="offer__description">
                  {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */}
                  {currentOffer.description.split('\n').map((paragraph, index) => (
                    // eslint-disable-next-line react/no-array-index-key, @typescript-eslint/no-unsafe-assignment
                    <p key={index} className="offer__text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
              {currentOffer.host && (
                <OfferHost
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                  name={currentOffer.host.name}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                  avatarUrl={currentOffer.host.avatarUrl}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                  isPro={currentOffer.host.isPro}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                  description={currentOffer.description ? currentOffer.description.split('\n') : []}
                />
              )}
              <Reviews reviews={reviews} showForm={isAuthorized} offerId={currentOffer.id} />
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
                  isPremium={index === OFFER.PREMIUM_INDEX}
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
