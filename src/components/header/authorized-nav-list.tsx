import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { logoutAction } from '../../store/api-actions';
import { selectUser } from '../../store/auth-slice';
import { selectFavoriteOffers } from '../../store/data-slice';

const AuthorizedNavList: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const favoriteOffers = useAppSelector(selectFavoriteOffers);

  const handleSignOut = () => {
    dispatch(logoutAction());
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">{user.email}</span>
          {favoriteOffers.length > 0 && (
            <span className="header__favorite-count">{favoriteOffers.length}</span>
          )}
        </Link>
      </li>
      <li className="header__nav-item">
        <button className="header__nav-link" type="button" onClick={handleSignOut}>
          <span className="header__signout">Sign out</span>
        </button>
      </li>
    </>
  );
};

export default AuthorizedNavList;

