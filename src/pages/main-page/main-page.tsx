import { useState, useCallback, FC, useMemo } from 'react';
import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import { Offer } from '../../types/offer';
import { DEFAULT_FAVORITE_COUNT, CITIES } from '../../constants';

const ACTIVE_CITY_NAME = 'Amsterdam';

type MainPageProps = {
  offersCount: number;
  offers: Offer[];
}

const MainPage: FC<MainPageProps> = ({offersCount, offers}) => {
  const citiesWithActive = useMemo(() => CITIES.map((city) => ({
    ...city,
    isActive: city.name === ACTIVE_CITY_NAME,
  })), []);

  const activeCity = ACTIVE_CITY_NAME;
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
        <LocationsList cities={citiesWithActive} activeCity={activeCity} />
        <div className="cities">
          <div className="cities__places-container container">
            <PlacesList
              offers={offers}
              offersCount={offersCount}
              cityName={activeCity}
              currentSort="Popular"
              isSortOpen
              onCardHover={handleCardHover}
            />
            <div className="cities__right-section">
              <Map offers={offers} selectedOfferId={selectedOfferId} className="cities__map" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;

