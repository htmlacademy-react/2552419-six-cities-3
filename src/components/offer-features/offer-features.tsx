import { FC, memo } from 'react';
import { OfferType } from '../../constants';

type OfferFeaturesProps = {
  type: OfferType;
  bedrooms: number;
  maxAdults: number;
}

const getTypeLabel = (type: OfferType): string => {
  const typeMap: Record<OfferType, string> = {
    [OfferType.Apartment]: 'Apartment',
    [OfferType.Room]: 'Room',
    [OfferType.House]: 'House',
    [OfferType.Hotel]: 'Hotel',
  };
  return typeMap[type] || 'Apartment';
};

const OfferFeatures: FC<OfferFeaturesProps> = memo(({type, bedrooms, maxAdults}) => {
  const bedroomsLabel = bedrooms === 1 ? 'Bedroom' : 'Bedrooms';
  const adultsLabel = maxAdults === 1 ? 'adult' : 'adults';

  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">
        {getTypeLabel(type)}
      </li>
      <li className="offer__feature offer__feature--bedrooms">
        {bedrooms} {bedroomsLabel}
      </li>
      <li className="offer__feature offer__feature--adults">
        Max {maxAdults} {adultsLabel}
      </li>
    </ul>
  );
});

OfferFeatures.displayName = 'OfferFeatures';

export default OfferFeatures;

