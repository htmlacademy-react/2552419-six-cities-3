import { FC } from 'react';
import { FOOTER_LOGO_WIDTH, FOOTER_LOGO_HEIGHT } from '../../constants';

const Footer: FC = () => (
  <footer className="footer container">
    <a className="footer__logo-link" href="main.html">
      <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={FOOTER_LOGO_WIDTH} height={FOOTER_LOGO_HEIGHT} />
    </a>
  </footer>
);

export default Footer;

