import { useState, useCallback, FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import { DEFAULT_FAVORITE_COUNT, CITIES } from '../../constants';
import type { RootState } from '../../store';

const MainPage: FC = () => {
  const city = useSelector((state: RootState) => state.data.city);
  const allOffers = useSelector((state: RootState) => state.data.offers);

  const filteredOffers = useMemo(() => {
    return allOffers.filter((offer) => offer.city.name === city);
  }, [allOffers, city]);

  const citiesWithActive = useMemo(() => CITIES.map((cityItem) => ({
    ...cityItem,
    isActive: cityItem.name === city,
  })), [city]);

  const [selectedOfferId, setSelectedOfferId] = useState<string | undefined>();

  const handleCardHover = useCallback((offerId: string | undefined) => {
    setSelectedOfferId(offerId);
  }, []);

  return (
    <div className="page page--gray page--main">
      <Header
        user={{
          email: 'Oliver.conner@gmail.com',
          favoriteCount: DEFAULT_FAVORITE_COUNT,
        }}
      />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationsList cities={citiesWithActive} activeCity={city} />
        <div className="cities">
          <div className="cities__places-container container">
            <PlacesList
              offers={filteredOffers}
              offersCount={filteredOffers.length}
              cityName={city}
              currentSort="Popular"
              isSortOpen
              onCardHover={handleCardHover}
            />
            <div className="cities__right-section">
              <Map offers={filteredOffers} selectedOfferId={selectedOfferId} className="cities__map" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;

