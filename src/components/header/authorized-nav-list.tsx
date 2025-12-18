import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';

type AuthorizedNavListProps = {
  user: {
    email: string;
    avatarUrl?: string;
    favoriteCount?: number;
  };
}

const AuthorizedNavList: FC<AuthorizedNavListProps> = ({user}) => (
  <>
    <li className="header__nav-item user">
      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
        <div className="header__avatar-wrapper user__avatar-wrapper">
        </div>
        <span className="header__user-name user__name">{user.email}</span>
        {user.favoriteCount !== undefined && (
          <span className="header__favorite-count">{user.favoriteCount}</span>
        )}
      </Link>
    </li>
    <li className="header__nav-item">
      <a className="header__nav-link" href="#">
        <span className="header__signout">Sign out</span>
      </a>
    </li>
  </>
);

export default AuthorizedNavList;

