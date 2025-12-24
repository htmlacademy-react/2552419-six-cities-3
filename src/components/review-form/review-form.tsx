import { useState, FormEvent, ChangeEvent, useCallback, FC } from 'react';
import { MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH, RATING } from '../../constants';
import RatingStar from '../rating-star/rating-star';
import { useAppDispatch } from '../../hooks/use-redux';
import { submitReviewAction } from '../../store/api-actions';
import { useAuth } from '../../hooks/use-auth';

const RATING_OPTIONS = [
  { value: RATING.MAX, title: 'perfect' },
  { value: RATING.VALUE_4, title: 'good' },
  { value: RATING.VALUE_3, title: 'not bad' },
  { value: RATING.VALUE_2, title: 'badly' },
  { value: RATING.MIN, title: 'terribly' },
] as const;

type ReviewFormProps = {
  offerId: string;
}

const ReviewForm: FC<ReviewFormProps> = ({ offerId }) => {
  const dispatch = useAppDispatch();
  const { isAuthorized } = useAuth();
  const [rating, setRating] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRatingChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setRating(evt.target.value);
    setError(null);
  }, []);

  const handleCommentChange = useCallback((evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
    setError(null);
  }, []);

  const handleSubmit = useCallback(async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await dispatch(submitReviewAction({
      offerId,
      reviewData: {
        rating: Number(rating),
        comment: comment.trim(),
      },
    }));

    if (submitReviewAction.fulfilled.match(result)) {
      setRating('');
      setComment('');
    } else {
      if (result.payload && typeof result.payload === 'object' && 'error' in result.payload) {
        const errorData = result.payload as { error?: string };
        setError(errorData.error || 'Failed to submit review. Please try again.');
      } else {
        setError('Failed to submit review. Please try again.');
      }
    }
    setIsSubmitting(false);
  }, [dispatch, offerId, rating, comment]);

  const isSubmitDisabled = !rating || comment.trim().length < MIN_COMMENT_LENGTH || comment.trim().length > MAX_COMMENT_LENGTH || isSubmitting;

  if (!isAuthorized) {
    return null;
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_OPTIONS.map((option) => (
          <RatingStar
            key={option.value}
            value={option.value}
            title={option.title}
            checked={rating === String(option.value)}
            onChange={handleRatingChange}
            disabled={isSubmitting}
          />
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
        disabled={isSubmitting}
        maxLength={MAX_COMMENT_LENGTH}
      />
      {error && (
        <div className="reviews__error" style={{ color: '#ff6b6b', marginTop: '0.5rem', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b> and no more than <b className="reviews__text-amount">{MAX_COMMENT_LENGTH} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;

