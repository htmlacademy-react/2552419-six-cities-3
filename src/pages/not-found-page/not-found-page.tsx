import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, PARTICLES_COUNT } from '../../constants';
import { getImageUrl } from '../../utils/image-url';
import NotFoundGame from '../../components/404-game/404-game';
import './not-found-page.css';

const NotFoundPage: FC = () => {
  const particles = Array.from({ length: PARTICLES_COUNT }, (_, i) => ({
    id: `particle-${i}`,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 2,
  }));

  return (
    <div className="not-found-page">
      <div className="not-found-background" />
      <div className="not-found-grid" />

      <div className="not-found-particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="not-found-particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      <header className="not-found-header">
        <Link to={AppRoute.Main} className="not-found-logo-link">
          <img src={getImageUrl('img/logo.svg')} alt="6 cities logo" className="not-found-logo" />
        </Link>
      </header>

      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-text">Page Not Found</p>
        <NotFoundGame />
        <Link to={AppRoute.Main} className="not-found-link">
          Go Home
        </Link>
      </div>

      <footer className="not-found-footer">
        <p className="not-found-developer">
          Developed by{' '}
          <a
            href="https://up.htmlacademy.ru/react-individual/3/user/2552419"
            target="_blank"
            rel="noopener noreferrer"
            className="not-found-link-text"
          >
            Grigor Mkrtchyan
          </a>
        </p>
        <p className="not-found-mentor">
          Mentor:{' '}
          <a
            href="https://htmlacademy.ru/profile/unidentifiedraccoon"
            target="_blank"
            rel="noopener noreferrer"
            className="not-found-link-text"
          >
            Yuriy Posledov
          </a>
        </p>
        <a
          href="https://htmlacademy.ru"
          target="_blank"
          rel="noopener noreferrer"
          className="not-found-academy-link"
        >
          HTML Academy
        </a>
      </footer>
    </div>
  );
};

export default NotFoundPage;
