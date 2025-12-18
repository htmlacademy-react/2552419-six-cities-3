import { FC } from 'react';
import ReviewItem from '../review-item/review-item';
import ReviewForm from '../review-form/review-form';

type Review = {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  rating: number;
  comment: string;
  date: string;
}

type ReviewsProps = {
  reviews: Review[];
  showForm?: boolean;
}

const Reviews: FC<ReviewsProps> = ({reviews, showForm = false}) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          user={review.user}
          rating={review.rating}
          comment={review.comment}
          date={review.date}
        />
      ))}
    </ul>
    {showForm && <ReviewForm />}
  </section>
);

export default Reviews;

