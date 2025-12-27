import { FC, useCallback, memo } from 'react';
import { DEFAULT_SORT_OPTIONS, SortOption, SortType } from '../../constants';

const ARROW_ICON = {
  WIDTH: 7,
  HEIGHT: 4,
} as const;

type SortOptionsProps = {
  currentSort?: string;
  isOpen?: boolean;
  options?: SortOption[];
  onSortChange?: (sortType: SortType) => void;
  onSortToggle?: () => void;
}

const SortOptions: FC<SortOptionsProps> = memo(({currentSort = 'Popular', isOpen = false, options = DEFAULT_SORT_OPTIONS, onSortChange, onSortToggle}) => {
  const handleOptionClick = useCallback((value: SortType) => {
    if (onSortChange) {
      onSortChange(value);
    }
  }, [onSortChange]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={onSortToggle}>
        {currentSort}
        <svg className="places__sorting-arrow" width={ARROW_ICON.WIDTH} height={ARROW_ICON.HEIGHT}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {options.map((option) => (
          <li
            key={option.value}
            className={`places__option ${option.name === currentSort ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </form>
  );
});

SortOptions.displayName = 'SortOptions';

export default SortOptions;

