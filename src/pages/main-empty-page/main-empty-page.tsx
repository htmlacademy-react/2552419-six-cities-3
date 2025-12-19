import { FC, useMemo } from 'react';
import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import { DEFAULT_FAVORITE_COUNT, CITIES, EMPTY_PAGE_ACTIVE_CITY_NAME } from '../../constants';

const MainEmptyPage: FC = () => {
  const citiesWithActive = useMemo(() => CITIES.map((city) => ({
    ...city,
    isActive: city.name === EMPTY_PAGE_ACTIVE_CITY_NAME,
  })), []);

  const activeCity = EMPTY_PAGE_ACTIVE_CITY_NAME;

  return (
    <div className="page page--gray page--main">
      <Header
        user={{
          email: 'Oliver.conner@gmail.com',
          favoriteCount: DEFAULT_FAVORITE_COUNT,
        }}
      />

      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <LocationsList cities={citiesWithActive} activeCity={activeCity} />
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in {activeCity}</p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainEmptyPage;
