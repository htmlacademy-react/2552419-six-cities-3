import { FC } from 'react';
import { PERCENT_PER_STAR } from '../../constants';

type RatingProps = {
  rating: number;
  className?: string;
  showValue?: boolean;
}

const Rating: FC<RatingProps> = ({rating, className = '', showValue = false}) => {
  const roundedRating = Math.round(rating);
  const ratingPercent = roundedRating * PERCENT_PER_STAR;

  const starsClass = className.includes('place-card__rating')
    ? 'place-card__stars rating__stars'
    : 'rating__stars';

  return (
    <div className={`rating ${className}`}>
      <div className={starsClass}>
        <span style={{width: `${ratingPercent}%`}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {showValue && (
        <span className="rating__value">{rating}</span>
      )}
    </div>
  );
};

export default Rating;

