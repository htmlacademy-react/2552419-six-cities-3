import { FC } from 'react';
import { ARROW_ICON_WIDTH, ARROW_ICON_HEIGHT } from '../../constants';

type SortOption = {
  name: string;
  value: string;
}

type SortOptionsProps = {
  currentSort?: string;
  isOpen?: boolean;
  options?: SortOption[];
}

const DEFAULT_SORT_OPTIONS: SortOption[] = [
  { name: 'Popular', value: 'popular' },
  { name: 'Price: low to high', value: 'price-low' },
  { name: 'Price: high to low', value: 'price-high' },
  { name: 'Top rated first', value: 'rating' },
];

const SortOptions: FC<SortOptionsProps> = ({currentSort = 'Popular', isOpen = false, options = DEFAULT_SORT_OPTIONS}) => (
  <form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by</span>
    <span className="places__sorting-type" tabIndex={0}>
      {currentSort}
      <svg className="places__sorting-arrow" width={ARROW_ICON_WIDTH} height={ARROW_ICON_HEIGHT}>
        <use xlinkHref="#icon-arrow-select"></use>
      </svg>
    </span>
    <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
      {options.map((option, index) => (
        <li
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={`places__option ${option.name === currentSort ? 'places__option--active' : ''}`}
          tabIndex={0}
        >
          {option.name}
        </li>
      ))}
    </ul>
  </form>
);

export default SortOptions;

