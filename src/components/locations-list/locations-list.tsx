import { FC, useCallback } from 'react';
import { City } from '../../types/offer';
import { changeCity } from '../../store/data-slice';
import { useActionCreators } from '../../store';

type LocationsListProps = {
  cities: City[];
  activeCity?: City;
}

type LocationsItemProps = {
  city: City;
  activeCity?: City;
  onCityClick: (city: City, evt: React.MouseEvent<HTMLAnchorElement>) => void;
}

const ListItem: FC<LocationsItemProps> = ({city, activeCity, onCityClick}) => {
  const className = `locations__item-link tabs__item ${city.isActive || activeCity?.name === city.name ? 'tabs__item--active' : ''}`;

  const handleClick = useCallback((evt: React.MouseEvent<HTMLAnchorElement>) => {
    onCityClick(city, evt);
  }, [onCityClick, city]);

  return (
    <li className="locations__item">
      <a
        className={className}
        href="#"
        onClick={handleClick}
      >
        <span>{city.name}</span>
      </a>
    </li>
  );
};

const LocationsList: FC<LocationsListProps> = ({cities, activeCity}) => {
  const actions = useActionCreators({ changeCity });

  const handleCityClick = useCallback((city: City, evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    actions.changeCity(city);
  }, [actions]);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <ListItem
              key={city.name}
              city={city}
              activeCity={activeCity}
              onCityClick={handleCityClick}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default LocationsList;

