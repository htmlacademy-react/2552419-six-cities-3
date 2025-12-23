import { FC, useState, useEffect, useCallback, useRef } from 'react';
import './404-game.css';

type Particle = {
  id: number;
  left: number;
  top: number;
  color: string;
};

const GAME_DURATION = 30;
const PARTICLE_SPAWN_INTERVAL = 1000;
const COLORS = ['#00ffff', '#ff00ff'];

const NotFoundGame: FC = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const particleIdRef = useRef(0);
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const spawnParticle = useCallback(() => {
    const newParticle: Particle = {
      id: particleIdRef.current++,
      left: Math.random() * (window.innerWidth - 40),
      top: Math.random() * (window.innerHeight - 40),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
    setParticles((prev) => [...prev, newParticle]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 2000);
  }, []);

  const handleParticleClick = useCallback((particleId: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== particleId));
    setScore((prev) => prev + 1);
  }, []);

  const startGame = useCallback(() => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setParticles([]);
    particleIdRef.current = 0;

    spawnParticle();

    spawnIntervalRef.current = setInterval(() => {
      spawnParticle();
    }, PARTICLE_SPAWN_INTERVAL);

    gameIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          setGameOver(true);
          if (spawnIntervalRef.current) {
            clearInterval(spawnIntervalRef.current);
          }
          if (gameIntervalRef.current) {
            clearInterval(gameIntervalRef.current);
          }
          setTimeout(() => {
            setParticles([]);
          }, 2000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [spawnParticle]);

  useEffect(() => {
    startGame();

    return () => {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
      }
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
      }
    };
  }, [startGame]);

  return (
    <>
      {particles.map((particle) => (
        <button
          key={particle.id}
          className="not-found-game__particle"
          style={{
            left: `${particle.left}px`,
            top: `${particle.top}px`,
            borderColor: particle.color,
            boxShadow: `0 0 10px ${particle.color}, 0 0 20px ${particle.color}`,
          }}
          onClick={() => handleParticleClick(particle.id)}
        />
      ))}

      {gameOver && (
        <div className="not-found-game__result">
          <p className="not-found-game__result-text">Game Over!</p>
          <p className="not-found-game__result-score">Your score: {score}</p>
        </div>
      )}
    </>
  );
};

export default NotFoundGame;

