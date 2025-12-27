import { FC, memo } from 'react';

type PriceProps = {
  value: number;
  className?: string;
  showText?: boolean;
  variant?: 'card' | 'offer';
}

const Price: FC<PriceProps> = memo(({value, className = '', showText = true, variant = 'card'}) => {
  const priceClass = variant === 'offer' ? 'offer__price' : 'place-card__price';
  const valueClass = variant === 'offer' ? 'offer__price-value' : 'place-card__price-value';
  const textClass = variant === 'offer' ? 'offer__price-text' : 'place-card__price-text';

  return (
    <div className={`${priceClass} ${className}`}>
      <b className={valueClass}>&euro;{value}</b>
      {showText && (
        <span className={textClass}>
          {variant === 'offer' ? '\u00A0night' : '/\u00A0night'}
        </span>
      )}
    </div>
  );
});

Price.displayName = 'Price';

export default Price;

