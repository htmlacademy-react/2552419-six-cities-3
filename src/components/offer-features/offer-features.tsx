import { FC } from 'react';
import { OfferType } from '../../constants';

type OfferFeaturesProps = {
  type: string;
  bedrooms: number;
  maxAdults: number;
}

const getTypeLabel = (type: string): string => {
  const typeMap: Record<string, string> = {
    [OfferType.Apartment]: 'Apartment',
    [OfferType.Room]: 'Room',
    [OfferType.House]: 'House',
    [OfferType.Hotel]: 'Hotel',
  };
  return typeMap[type.toLowerCase()] || type;
};

const OfferFeatures: FC<OfferFeaturesProps> = ({type, bedrooms, maxAdults}) => {
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
};

export default OfferFeatures;

