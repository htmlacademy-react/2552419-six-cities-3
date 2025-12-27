import { FC, memo } from 'react';
import AuthorizedNavList from './authorized-nav-list';
import UnauthorizedNavList from './unauthorized-nav-list';
import Logo from '../logo/logo';
import { useAuth } from '../../hooks/use-auth';

const Header: FC = memo(() => {
  const { isAuthorized } = useAuth();
  const navList = isAuthorized ? <AuthorizedNavList /> : <UnauthorizedNavList />;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo className="header__logo-link header__logo-link--active" />
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
});

Header.displayName = 'Header';

export default Header;

