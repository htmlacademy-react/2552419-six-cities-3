import { useState, FormEvent, ChangeEvent, useCallback, FC } from 'react';
import { MIN_COMMENT_LENGTH, STAR_ICON_WIDTH, STAR_ICON_HEIGHT, MAX_RATING, RATING_4, RATING_3, RATING_2, MIN_RATING } from '../../constants';

const ReviewForm: FC = () => {
  const [rating, setRating] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleRatingChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setRating(evt.target.value);
  }, []);

  const handleCommentChange = useCallback((evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  }, []);

  const handleSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  }, []);

  const isSubmitDisabled = !rating || comment.length < MIN_COMMENT_LENGTH;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value={String(MAX_RATING)} id={`${MAX_RATING}-stars`} type="radio" checked={rating === String(MAX_RATING)} onChange={handleRatingChange} />
        <label htmlFor={`${MAX_RATING}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width={STAR_ICON_WIDTH} height={STAR_ICON_HEIGHT}>
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value={String(RATING_4)} id={`${RATING_4}-stars`} type="radio" checked={rating === String(RATING_4)} onChange={handleRatingChange} />
        <label htmlFor={`${RATING_4}-stars`} className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width={STAR_ICON_WIDTH} height={STAR_ICON_HEIGHT}>
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value={String(RATING_3)} id={`${RATING_3}-stars`} type="radio" checked={rating === String(RATING_3)} onChange={handleRatingChange} />
        <label htmlFor={`${RATING_3}-stars`} className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width={STAR_ICON_WIDTH} height={STAR_ICON_HEIGHT}>
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value={String(RATING_2)} id={`${RATING_2}-stars`} type="radio" checked={rating === String(RATING_2)} onChange={handleRatingChange} />
        <label htmlFor={`${RATING_2}-stars`} className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width={STAR_ICON_WIDTH} height={STAR_ICON_HEIGHT}>
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value={String(MIN_RATING)} id={`${MIN_RATING}-star`} type="radio" checked={rating === String(MIN_RATING)} onChange={handleRatingChange} />
        <label htmlFor={`${MIN_RATING}-star`} className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width={STAR_ICON_WIDTH} height={STAR_ICON_HEIGHT}>
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={comment} onChange={handleCommentChange}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled}>Submit</button>
      </div>
    </form>
  );
};

export default ReviewForm;

