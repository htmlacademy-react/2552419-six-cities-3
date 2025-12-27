import { FC, memo } from 'react';

type BookmarkButtonProps = {
  isActive?: boolean;
  className?: string;
  size?: 'small' | 'large';
  onClick?: () => void;
}

const BOOKMARK_ICON = {
  LARGE: {
    WIDTH: 31,
    HEIGHT: 33,
  },
  SMALL: {
    WIDTH: 18,
    HEIGHT: 19,
  },
} as const;

const BookmarkButton: FC<BookmarkButtonProps> = memo(({isActive = false, className = '', size = 'small', onClick}) => {
  const iconWidth = size === 'large' ? BOOKMARK_ICON.LARGE.WIDTH : BOOKMARK_ICON.SMALL.WIDTH;
  const iconHeight = size === 'large' ? BOOKMARK_ICON.LARGE.HEIGHT : BOOKMARK_ICON.SMALL.HEIGHT;
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
});

BookmarkButton.displayName = 'BookmarkButton';

export default BookmarkButton;

