import { FC } from 'react';
import { City } from '../../types/offer';

type LocationsListProps = {
  cities: City[];
  activeCity?: string;
}

const LocationsList: FC<LocationsListProps> = ({cities, activeCity}) => (
  <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index} className="locations__item">
            <a
              className={`locations__item-link tabs__item ${city.isActive || activeCity === city.name ? 'tabs__item--active' : ''}`}
              href="#"
            >
              <span>{city.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export default LocationsList;

