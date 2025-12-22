import { FC } from 'react';
import Rating from '../rating/rating';
import { getImageUrl } from '../../utils/image-url';

const AVATAR_SIZE = 54;

type ReviewItemProps = {
  user: {
    name: string;
    avatarUrl: string;
  };
  rating: number;
  comment: string;
  date: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

const ReviewItem: FC<ReviewItemProps> = ({user, rating, comment, date}) => {
  const formattedDate = formatDate(date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={getImageUrl(user.avatarUrl)} width={AVATAR_SIZE} height={AVATAR_SIZE} alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <Rating rating={rating} className="reviews__rating" />
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>{formattedDate}</time>
      </div>
    </li>
  );
};

export default ReviewItem;

