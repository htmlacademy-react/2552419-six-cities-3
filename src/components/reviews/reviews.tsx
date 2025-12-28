import { FC, useMemo, memo } from 'react';
import ReviewItem from '../review-item/review-item';
import ReviewForm from '../review-form/review-form';
import type { Review } from '../../types/offer';
import { OFFER } from '../../constants';

type ReviewsProps = {
  reviews: Review[];
  showForm?: boolean;
  offerId?: string;
}

const Reviews: FC<ReviewsProps> = memo(({reviews, showForm = false, offerId}) => {
  const sortedAndLimitedReviews = useMemo(() => {
    const sorted = [...reviews].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
    return sorted.slice(0, OFFER.MAX_REVIEWS_DISPLAY);
  }, [reviews]);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {sortedAndLimitedReviews.map((review) => (
          <ReviewItem
            key={review.id}
            user={review.user}
            rating={review.rating}
            comment={review.comment}
            date={review.date}
          />
        ))}
      </ul>
      {showForm && offerId && <ReviewForm offerId={offerId} />}
    </section>
  );
});

Reviews.displayName = 'Reviews';

export default Reviews;

