import { Link } from 'react-router-dom';
import { useCallback, FC } from 'react';
import { Offer } from '../../types/offer';
import { PlaceCardVariant } from '../../types/place-card-variant';
import Rating from '../rating/rating';
import BookmarkButton from '../bookmark-button/bookmark-button';
import Price from '../price/price';
import PremiumMark from '../premium-mark/premium-mark';
import { getOfferUrl } from '../../constants';
import { getImageUrl } from '../../utils/image-url';

const PLACE_CARD_IMAGE = {
  FAVORITES: {
    WIDTH: 150,
    HEIGHT: 110,
  },
  DEFAULT: {
    WIDTH: 260,
    HEIGHT: 200,
  },
} as const;

type PlaceCardProps = {
  offer: Offer;
  onCardHover?: (offerId: string) => void;
  onCardLeave?: () => void;
  variant?: PlaceCardVariant;
  isPremium?: boolean;
}

const PlaceCard: FC<PlaceCardProps> = ({offer, onCardHover, onCardLeave, variant = PlaceCardVariant.Cities, isPremium = false}) => {
  let imageWrapperClass = 'cities__image-wrapper';
  let cardClass = 'cities__card';

  if (variant === PlaceCardVariant.NearPlaces) {
    imageWrapperClass = 'near-places__image-wrapper';
    cardClass = 'near-places__card';
  } else if (variant === PlaceCardVariant.Favorites) {
    imageWrapperClass = 'favorites__image-wrapper';
    cardClass = 'favorites__card';
  }

  const imageWidth = variant === PlaceCardVariant.Favorites ? PLACE_CARD_IMAGE.FAVORITES.WIDTH : PLACE_CARD_IMAGE.DEFAULT.WIDTH;
  const imageHeight = variant === PlaceCardVariant.Favorites ? PLACE_CARD_IMAGE.FAVORITES.HEIGHT : PLACE_CARD_IMAGE.DEFAULT.HEIGHT;
  const cardInfoClass = variant === PlaceCardVariant.Favorites ? 'favorites__card-info' : '';
  const offerUrl = getOfferUrl(offer.id);

  const handleMouseEnter = useCallback(() => {
    onCardHover?.(offer.id);
  }, [onCardHover, offer.id]);

  const handleMouseLeave = useCallback(() => {
    onCardLeave?.();
  }, [onCardLeave]);

  return (
    <article
      className={`${cardClass} place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && <PremiumMark />}
      <div className={`${imageWrapperClass} place-card__image-wrapper`}>
        <Link to={offerUrl}>
          <img
            className="place-card__image"
            src={getImageUrl(offer.previewImage)}
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
          <Link to={offerUrl}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

export default PlaceCard;

