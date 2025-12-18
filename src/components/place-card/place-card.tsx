import { Link } from 'react-router-dom';
import { useCallback, FC } from 'react';
import { Offer } from '../../types/offer';
import { PlaceCardVariant } from '../../types/place-card-variant';
import Rating from '../rating/rating';
import BookmarkButton from '../bookmark-button/bookmark-button';
import Price from '../price/price';
import PremiumMark from '../premium-mark/premium-mark';
import { FAVORITES_IMAGE_WIDTH, DEFAULT_IMAGE_WIDTH, FAVORITES_IMAGE_HEIGHT, DEFAULT_IMAGE_HEIGHT, getOfferUrl } from '../../constants';

type PlaceCardProps = {
  offer: Offer;
  onCardHover?: (offerId: string) => void;
  variant?: PlaceCardVariant;
  isPremium?: boolean;
}

const PlaceCard: FC<PlaceCardProps> = ({offer, onCardHover, variant = PlaceCardVariant.Cities, isPremium = false}) => {
  let imageWrapperClass = 'cities__image-wrapper';
  let cardClass = 'cities__card';

  if (variant === PlaceCardVariant.NearPlaces) {
    imageWrapperClass = 'near-places__image-wrapper';
    cardClass = 'near-places__card';
  } else if (variant === PlaceCardVariant.Favorites) {
    imageWrapperClass = 'favorites__image-wrapper';
    cardClass = 'favorites__card';
  }

  const imageWidth = variant === PlaceCardVariant.Favorites ? FAVORITES_IMAGE_WIDTH : DEFAULT_IMAGE_WIDTH;
  const imageHeight = variant === PlaceCardVariant.Favorites ? FAVORITES_IMAGE_HEIGHT : DEFAULT_IMAGE_HEIGHT;
  const cardInfoClass = variant === PlaceCardVariant.Favorites ? 'favorites__card-info' : '';

  const handleMouseEnter = useCallback(() => {
    onCardHover?.(offer.id);
  }, [onCardHover, offer.id]);

  return (
    <article
      className={`${cardClass} place-card`}
      onMouseEnter={handleMouseEnter}
    >
      {isPremium && <PremiumMark />}
      <div className={`${imageWrapperClass} place-card__image-wrapper`}>
        <Link to={getOfferUrl(offer.id)}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={imageWidth}
            height={imageHeight}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${cardInfoClass} place-card__info`}>
        <div className="place-card__price-wrapper">
          <Price value={offer.price} />
          <BookmarkButton isActive={offer.isFavorite} />
        </div>
        <Rating rating={offer.rating} className="place-card__rating" />
        <h2 className="place-card__name">
          <Link to={getOfferUrl(offer.id)}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

export default PlaceCard;

