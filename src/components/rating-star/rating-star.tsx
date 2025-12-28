import { ChangeEvent, FC, memo } from 'react';

const STAR_ICON = {
  WIDTH: 37,
  HEIGHT: 33,
} as const;

type RatingStarProps = {
  value: number;
  title: string;
  checked: boolean;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const RatingStar: FC<RatingStarProps> = memo(({ value, title, checked, onChange, disabled = false }) => {
  const id = `${value}-stars`;

  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={String(value)}
        id={id}
        type="radio"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={id} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width={STAR_ICON.WIDTH} height={STAR_ICON.HEIGHT}>
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
});

RatingStar.displayName = 'RatingStar';

export default RatingStar;

