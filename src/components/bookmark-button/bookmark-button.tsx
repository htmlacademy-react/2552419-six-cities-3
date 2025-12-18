import { FC } from 'react';
import { LARGE_ICON_WIDTH, SMALL_ICON_WIDTH, LARGE_ICON_HEIGHT, SMALL_ICON_HEIGHT } from '../../constants';

type BookmarkButtonProps = {
  isActive?: boolean;
  className?: string;
  size?: 'small' | 'large';
  onClick?: () => void;
}

const BookmarkButton: FC<BookmarkButtonProps> = ({isActive = false, className = '', size = 'small', onClick}) => {
  const iconWidth = size === 'large' ? LARGE_ICON_WIDTH : SMALL_ICON_WIDTH;
  const iconHeight = size === 'large' ? LARGE_ICON_HEIGHT : SMALL_ICON_HEIGHT;
  const buttonClass = size === 'large' ? 'offer__bookmark-button' : 'place-card__bookmark-button';
  const iconClass = size === 'large' ? 'offer__bookmark-icon' : 'place-card__bookmark-icon';
  const activeClass = isActive ? `${buttonClass}--active` : '';
  const text = isActive ? 'In bookmarks' : 'To bookmarks';

  return (
    <button
      className={`${buttonClass} button ${activeClass} ${className}`}
      type="button"
      onClick={onClick}
    >
      <svg className={iconClass} width={iconWidth} height={iconHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{text}</span>
    </button>
  );
};

export default BookmarkButton;

