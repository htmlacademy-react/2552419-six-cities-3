import { FC, memo } from 'react';
import PlaceCard from '../place-card/place-card';
import SortOptions from '../sort-options/sort-options';
import { Offer } from '../../types/offer';
import { SortType } from '../../constants';

type PlacesListProps = {
  offers: Offer[];
  offersCount: number;
  cityName: string;
  currentSort?: string;
  isSortOpen?: boolean;
  onSortChange?: (sortType: SortType) => void;
  onSortToggle?: () => void;
  onCardHover?: (offerId: string) => void;
  onCardLeave?: () => void;
}

const PlacesList: FC<PlacesListProps> = memo(({offers, offersCount, cityName, currentSort, isSortOpen, onSortChange, onSortToggle, onCardHover, onCardLeave}) => (
  <section className="cities__places places">
    <h2 className="visually-hidden">Places</h2>
    <b className="places__found">{offersCount} places to stay in {cityName}</b>
    <SortOptions currentSort={currentSort} isOpen={isSortOpen} onSortChange={onSortChange} onSortToggle={onSortToggle} />
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onCardHover={onCardHover}
          onCardLeave={onCardLeave}
        />
      ))}
    </div>
  </section>
));

PlacesList.displayName = 'PlacesList';

export default PlacesList;

