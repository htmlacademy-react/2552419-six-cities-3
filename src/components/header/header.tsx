import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { getImageUrl } from '../../utils/image-url';

const LOGO = {
  WIDTH: 81,
  HEIGHT: 41,
} as const;
import AuthorizedNavList from './authorized-nav-list';
import UnauthorizedNavList from './unauthorized-nav-list';

type HeaderProps = {
  user?: {
    email: string;
    avatarUrl?: string;
    favoriteCount?: number;
  };
}

const Header: FC<HeaderProps> = ({user}) => {
  const navList = user ? <AuthorizedNavList user={user} /> : <UnauthorizedNavList />;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
              <img className="header__logo" src={getImageUrl('img/logo.svg')} alt="6 cities logo" width={LOGO.WIDTH} height={LOGO.HEIGHT} />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {navList}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

