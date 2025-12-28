import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { getImageUrl } from '../../utils/image-url';

type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
  to?: string;
}

const DEFAULT_LOGO = {
  WIDTH: 81,
  HEIGHT: 41,
} as const;

const Logo: FC<LogoProps> = memo(({ width = DEFAULT_LOGO.WIDTH, height = DEFAULT_LOGO.HEIGHT, className = '', imageClassName = 'header__logo', to = AppRoute.Main }) => (
  <Link className={className} to={to}>
    <img className={imageClassName} src={getImageUrl('img/logo.svg')} alt="6 cities logo" width={width} height={height} />
  </Link>
));

Logo.displayName = 'Logo';

export default Logo;

