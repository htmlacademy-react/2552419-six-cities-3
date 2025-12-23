import { FC } from 'react';
import { getImageUrl } from '../../utils/image-url';

const FOOTER_LOGO = {
  WIDTH: 64,
  HEIGHT: 33,
} as const;

const Footer: FC = () => (
  <footer className="footer container">
    <a className="footer__logo-link" href="main.html">
      <img className="footer__logo" src={getImageUrl('img/logo.svg')} alt="6 cities logo" width={FOOTER_LOGO.WIDTH} height={FOOTER_LOGO.HEIGHT} />
    </a>
  </footer>
);

export default Footer;

