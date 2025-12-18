import { FC } from 'react';

type PremiumMarkProps = {
  className?: string;
  variant?: 'card' | 'offer';
}

const PremiumMark: FC<PremiumMarkProps> = ({className = '', variant = 'card'}) => {
  const markClass = variant === 'offer' ? 'offer__mark' : 'place-card__mark';

  return (
    <div className={`${markClass} ${className}`}>
      <span>Premium</span>
    </div>
  );
};

export default PremiumMark;

