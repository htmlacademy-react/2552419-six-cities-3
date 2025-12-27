import { FC, memo } from 'react';
import PlaceCard from '../place-card/place-card';
import { Offer } from '../../types/offer';
import { PlaceCardVariant } from '../../types/place-card-variant';

type FavoriteCitySectionProps = {
  cityName: string;
  offers: Offer[];
}

const FavoriteCitySection: FC<FavoriteCitySectionProps> = memo(({ cityName, offers }) => (
  <li className="favorites__locations-items">
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <span className="locations__item-link">
          <span>{cityName}</span>
        </span>
      </div>
    </div>
    <div className="favorites__places">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          variant={PlaceCardVariant.Favorites}
        />
      ))}
    </div>
  </li>
));

FavoriteCitySection.displayName = 'FavoriteCitySection';

export default FavoriteCitySection;

