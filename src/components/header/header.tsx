import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { getImageUrl } from '../../utils/image-url';
import AuthorizedNavList from './authorized-nav-list';
import UnauthorizedNavList from './unauthorized-nav-list';
import { useAuth } from '../../hooks/use-auth';

const LOGO = {
  WIDTH: 81,
  HEIGHT: 41,
} as const;

const Header: FC = () => {
  const { isAuthorized } = useAuth();
  const navList = isAuthorized ? <AuthorizedNavList /> : <UnauthorizedNavList />;

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

