import { FC } from 'react';
import { PERCENT_PER_STAR } from '../../constants';

type RatingProps = {
  rating: number;
  className?: string;
  showValue?: boolean;
}

const Rating: FC<RatingProps> = ({rating, className = '', showValue = false}) => {
  const ratingPercent = Math.round(rating * PERCENT_PER_STAR);

  return (
    <div className={`rating ${className}`}>
      <div className="rating__stars">
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

