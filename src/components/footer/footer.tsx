import { FC, memo } from 'react';
import Logo from '../logo/logo';

const FOOTER_LOGO = {
  WIDTH: 64,
  HEIGHT: 33,
} as const;

const Footer: FC = memo(() => (
  <footer className="footer container">
    <Logo className="footer__logo-link" imageClassName="footer__logo" width={FOOTER_LOGO.WIDTH} height={FOOTER_LOGO.HEIGHT} />
  </footer>
));

Footer.displayName = 'Footer';

export default Footer;

