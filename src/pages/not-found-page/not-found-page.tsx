import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, PARTICLES_COUNT } from '../../constants';
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
          <img src="img/logo.svg" alt="6 cities logo" className="not-found-logo" />
        </Link>
      </header>

      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-text">Page Not Found</p>
        <Link to={AppRoute.Main} className="not-found-link">
          Go Home
        </Link>
      </div>

      <footer className="not-found-footer">
        <p className="not-found-developer">Developed by Grigor Mkrtchyan</p>
      </footer>
    </div>
  );
};

export default NotFoundPage;
