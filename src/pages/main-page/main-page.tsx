import { useState, useCallback, FC, useMemo } from 'react';
import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import MainEmpty from '../../components/main-empty/main-empty';
import { CITIES, DEFAULT_SORT_OPTIONS, SortType } from '../../constants';
import { selectCity, selectOffersByCity } from '../../store/data-slice';
import { useAppSelector } from '../../hooks/use-redux';
import { useBoolean } from '../../hooks/use-boolean';

const MainPage: FC = () => {
  const city = useAppSelector(selectCity);
  const filteredOffers = useAppSelector(selectOffersByCity);

  const citiesWithActive = useMemo(() => CITIES.map((cityItem) => ({
    ...cityItem,
    isActive: cityItem.name === city.name,
  })), [city]);

  const [selectedOfferId, setSelectedOfferId] = useState<string | undefined>();
  const [currentSort, setCurrentSort] = useState<SortType>(SortType.Popular);
  const [isSortOpen, { toggle: toggleSort, setFalse: closeSort }] = useBoolean(false);

  const sortedOffers = useMemo(() => {
    const offersCopy = [...filteredOffers];

    switch (currentSort) {
      case SortType.PriceLow:
        return offersCopy.sort((a, b) => a.price - b.price);
      case SortType.PriceHigh:
        return offersCopy.sort((a, b) => b.price - a.price);
      case SortType.Rating:
        return offersCopy.sort((a, b) => b.rating - a.rating);
      case SortType.Popular:
      default:
        return offersCopy;
    }
  }, [filteredOffers, currentSort]);

  const handleCardHover = useCallback((offerId: string) => {
    setSelectedOfferId(offerId);
  }, []);

  const handleCardLeave = useCallback(() => {
    setSelectedOfferId(undefined);
  }, []);

  const handleSortChange = useCallback((sortType: SortType) => {
    setCurrentSort(sortType);
    closeSort();
  }, [closeSort]);

  const handleSortToggle = useCallback(() => {
    toggleSort();
  }, [toggleSort]);

  const option = DEFAULT_SORT_OPTIONS.find((opt) => opt.value === currentSort);
  const currentSortName = option?.name || 'Popular';

  if (sortedOffers.length === 0) {
    return <MainEmpty city={city} cities={citiesWithActive} />;
  }

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationsList cities={citiesWithActive} activeCity={city} />
        <div className="cities">
          <div className="cities__places-container container">
            <PlacesList
              offers={sortedOffers}
              offersCount={sortedOffers.length}
              cityName={city.name}
              currentSort={currentSortName}
              isSortOpen={isSortOpen}
              onSortChange={handleSortChange}
              onSortToggle={handleSortToggle}
              onCardHover={handleCardHover}
              onCardLeave={handleCardLeave}
            />
            <div className="cities__right-section">
              <Map offers={sortedOffers} selectedOfferId={selectedOfferId} className="cities__map" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;

