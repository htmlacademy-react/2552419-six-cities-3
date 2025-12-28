import { FC, memo } from 'react';

type PremiumMarkProps = {
  className?: string;
  variant?: 'card' | 'offer';
}

const PremiumMark: FC<PremiumMarkProps> = memo(({className = '', variant = 'card'}) => {
  const markClass = variant === 'offer' ? 'offer__mark' : 'place-card__mark';

  return (
    <div className={`${markClass} ${className}`}>
      <span>Premium</span>
    </div>
  );
});

PremiumMark.displayName = 'PremiumMark';

export default PremiumMark;

