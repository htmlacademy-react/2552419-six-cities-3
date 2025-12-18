import { FC } from 'react';
import PlaceCard from '../place-card/place-card';
import SortOptions from '../sort-options/sort-options';
import { Offer } from '../../types/offer';

type PlacesListProps = {
  offers: Offer[];
  offersCount: number;
  cityName: string;
  currentSort?: string;
  isSortOpen?: boolean;
  onCardHover?: (offerId: string) => void;
}

const PlacesList: FC<PlacesListProps> = ({offers, offersCount, cityName, currentSort, isSortOpen, onCardHover}) => (
  <section className="cities__places places">
    <h2 className="visually-hidden">Places</h2>
    <b className="places__found">{offersCount} places to stay in {cityName}</b>
    <SortOptions currentSort={currentSort} isOpen={isSortOpen} />
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onCardHover={onCardHover}
        />
      ))}
    </div>
  </section>
);

export default PlacesList;

