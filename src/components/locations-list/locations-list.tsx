import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { City } from '../../types/offer';
import { changeCity } from '../../store/action';

type LocationsListProps = {
  cities: City[];
  activeCity?: string;
}

const LocationsList: FC<LocationsListProps> = ({cities, activeCity}) => {
  const dispatch = useDispatch();

  const handleCityClick = useCallback((cityName: string, evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(changeCity(cityName));
  }, [dispatch]);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} className="locations__item">
              <a
                className={`locations__item-link tabs__item ${city.isActive || activeCity === city.name ? 'tabs__item--active' : ''}`}
                href="#"
                onClick={(evt) => handleCityClick(city.name, evt)}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default LocationsList;

