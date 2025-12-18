import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    position: 'relative' as const,
    overflow: 'hidden',
    background: '#000',
    color: '#fff',
  },
  background: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, #1a1a1a, #000, #1a1a1a)',
    backgroundSize: '400% 400%',
    animation: 'gradientShift 15s ease infinite',
    zIndex: 0,
  },
  grid: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `
      linear-gradient(rgba(255, 0, 0, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 0, 0, 0.1) 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px',
    animation: 'gridMove 20s linear infinite',
    zIndex: 1,
  },
  header: {
    position: 'relative' as const,
    zIndex: 3,
    padding: '2rem',
    display: 'flex',
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  logoLink: {
    display: 'block',
    filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.5))',
    transition: 'all 0.3s ease',
  },
  logo: {
    display: 'block',
    width: '120px',
    height: 'auto',
  },
  content: {
    position: 'relative' as const,
    zIndex: 2,
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: '2rem',
  },
  title: {
    fontSize: 'clamp(8rem, 20vw, 15rem)',
    fontWeight: 900,
    fontFamily: '"Arial Black", "Impact", sans-serif',
    letterSpacing: '-0.05em',
    margin: 0,
    textShadow: `
      0 0 10px rgba(255, 0, 0, 0.5),
      0 0 20px rgba(255, 0, 0, 0.3),
      0 0 30px rgba(255, 0, 0, 0.2),
      0 0 40px rgba(255, 0, 0, 0.1)
    `,
    animation: 'glitch 3s infinite',
    color: '#ff0000',
    lineHeight: 0.9,
  },
  text: {
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    fontWeight: 700,
    fontFamily: '"Arial Black", "Impact", sans-serif',
    marginTop: '1rem',
    marginBottom: '3rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.2em',
    color: '#fff',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
  },
  link: {
    display: 'inline-block',
    padding: '1rem 3rem',
    fontSize: '1.2rem',
    fontWeight: 700,
    fontFamily: '"Arial Black", "Impact", sans-serif',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color: '#000',
    background: '#ff0000',
    textDecoration: 'none',
    border: '3px solid #ff0000',
    boxShadow: `
      0 0 20px rgba(255, 0, 0, 0.5),
      inset 0 0 20px rgba(255, 255, 255, 0.1)
    `,
    transition: 'all 0.3s ease',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },
  footer: {
    position: 'relative' as const,
    zIndex: 3,
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  developer: {
    fontSize: '1rem',
    fontWeight: 700,
    fontFamily: '"Arial Black", "Impact", sans-serif',
    letterSpacing: '0.1em',
    color: '#666',
    textTransform: 'uppercase' as const,
    textShadow: '0 0 5px rgba(255, 0, 0, 0.3)',
  },
  particles: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    pointerEvents: 'none' as const,
  },
  particle: {
    position: 'absolute' as const,
    width: '4px',
    height: '4px',
    background: '#ff0000',
    borderRadius: '50%',
    boxShadow: '0 0 10px rgba(255, 0, 0, 0.8)',
  },
};

const PARTICLES_COUNT = 20;

import { FC } from 'react';

const NotFoundPage: FC = () => {
  const particles = Array.from({ length: PARTICLES_COUNT }, (_, i) => ({
    id: `particle-${i}`,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 2,
  }));

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes glitch {
          0%, 100% {
            transform: translate(0);
            text-shadow:
              0 0 10px rgba(255, 0, 0, 0.5),
              0 0 20px rgba(255, 0, 0, 0.3),
              0 0 30px rgba(255, 0, 0, 0.2);
          }
          20% {
            transform: translate(-2px, 2px);
            text-shadow:
              -2px 0 10px rgba(0, 255, 0, 0.5),
              2px 0 10px rgba(255, 0, 0, 0.5);
          }
          40% {
            transform: translate(2px, -2px);
            text-shadow:
              2px 0 10px rgba(0, 255, 0, 0.5),
              -2px 0 10px rgba(255, 0, 0, 0.5);
          }
          60% {
            transform: translate(-2px, -2px);
            text-shadow:
              -2px 0 10px rgba(0, 255, 0, 0.5),
              2px 0 10px rgba(255, 0, 0, 0.5);
          }
          80% {
            transform: translate(2px, 2px);
            text-shadow:
              2px 0 10px rgba(0, 255, 0, 0.5),
              -2px 0 10px rgba(255, 0, 0, 0.5);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }

        @keyframes logoGlow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.5)); }
          50% { filter: drop-shadow(0 0 20px rgba(255, 0, 0, 0.8)); }
        }

        .not-found-link:hover {
          transform: scale(1.05);
          box-shadow:
            0 0 30px rgba(255, 0, 0, 0.8),
            inset 0 0 30px rgba(255, 255, 255, 0.2);
        }

        .not-found-logo:hover {
          filter: drop-shadow(0 0 20px rgba(255, 0, 0, 0.8));
          transform: scale(1.05);
        }
      `}
      </style>

      <div style={styles.background} />
      <div style={styles.grid} />

      <div style={styles.particles}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            style={{
              ...styles.particle,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      <header style={styles.header}>
        <Link to={AppRoute.Main} style={styles.logoLink} className="not-found-logo">
          <img src="img/logo.svg" alt="6 cities logo" style={styles.logo} />
        </Link>
      </header>

      <div style={styles.content}>
        <h1 style={styles.title}>404</h1>
        <p style={styles.text}>Page Not Found</p>
        <Link to={AppRoute.Main} style={styles.link} className="not-found-link">
          Go Home
        </Link>
      </div>

      <footer style={styles.footer}>
        <p style={styles.developer}>Developed by Grigor Mkrtchyan</p>
      </footer>
    </div>
  );
};

export default NotFoundPage;
