import { FC, memo } from 'react';
import PlaceCard from '../place-card/place-card';
import { Offer } from '../../types/offer';
import { PlaceCardVariant } from '../../types/place-card-variant';

type NearPlacesProps = {
  offers: Offer[];
}

const NearPlaces: FC<NearPlacesProps> = memo(({ offers }) => (
  <div className="container">
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            variant={PlaceCardVariant.NearPlaces}
          />
        ))}
      </div>
    </section>
  </div>
));

NearPlaces.displayName = 'NearPlaces';

export default NearPlaces;

