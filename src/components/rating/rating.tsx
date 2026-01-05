import { FC, memo } from 'react';
import { PERCENT_PER_STAR } from '../../constants';

type RatingProps = {
  rating: number;
  className?: string;
  showValue?: boolean;
}

const Rating: FC<RatingProps> = memo(({rating, className = '', showValue = false}) => {
  const roundedRating = Math.round(rating);
  const ratingPercent = (className.includes('reviews__rating') ? rating : roundedRating) * PERCENT_PER_STAR;

  let starsClass = 'rating__stars';
  if (className.includes('place-card__rating')) {
    starsClass = 'place-card__stars rating__stars';
  } else if (className.includes('offer__rating')) {
    starsClass = 'offer__stars rating__stars';
  } else if (className.includes('reviews__rating')) {
    starsClass = 'reviews__stars rating__stars';
  }

  const valueClass = className.includes('offer__rating')
    ? 'offer__rating-value rating__value'
    : 'rating__value';

  return (
    <div className={`rating ${className}`}>
      <div className={starsClass}>
        <span style={{width: `${ratingPercent}%`}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {showValue && (
        <span className={valueClass}>{rating}</span>
      )}
    </div>
  );
});

Rating.displayName = 'Rating';

export default Rating;

