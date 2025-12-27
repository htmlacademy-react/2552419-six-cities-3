import { FC, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { City } from '../../types/offer';
import { changeCity } from '../../store/data-slice';
import { useAppDispatch } from '../../hooks/use-redux';
import { AppRoute } from '../../constants';

type LocationsListProps = {
  cities: City[];
  activeCity?: City;
}

type LocationsItemProps = {
  city: City;
  activeCity?: City;
  onCityClick: (city: City) => void;
}

const ListItem: FC<LocationsItemProps> = memo(({city, activeCity, onCityClick}) => {
  const className = `locations__item-link tabs__item ${city.isActive || activeCity?.name === city.name ? 'tabs__item--active' : ''}`;

  const handleClick = useCallback((evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    onCityClick(city);
  }, [onCityClick, city]);

  return (
    <li className="locations__item">
      <Link
        className={className}
        to={AppRoute.Main}
        onClick={handleClick}
      >
        <span>{city.name}</span>
      </Link>
    </li>
  );
});

ListItem.displayName = 'ListItem';

const LocationsList: FC<LocationsListProps> = memo(({cities, activeCity}) => {
  const dispatch = useAppDispatch();

  const handleCityClick = useCallback((city: City) => {
    dispatch(changeCity({ name: city.name }));
  }, [dispatch]);

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
});

LocationsList.displayName = 'LocationsList';

export default LocationsList;

