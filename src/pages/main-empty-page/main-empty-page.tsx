import { FC, useMemo } from 'react';
import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import { CITIES, CITY_NAME } from '../../constants';

const MainEmptyPage: FC = () => {
  const activeCity = useMemo(() => CITIES.find((city) => city.name === CITY_NAME.EMPTY_PAGE_ACTIVE), []);

  const citiesWithActive = useMemo(() => CITIES.map((city) => ({
    ...city,
    isActive: city.name === CITY_NAME.EMPTY_PAGE_ACTIVE,
  })), []);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <LocationsList cities={citiesWithActive} activeCity={activeCity} />
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in {activeCity?.name}</p>
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
