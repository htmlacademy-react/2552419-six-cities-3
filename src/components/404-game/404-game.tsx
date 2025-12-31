import { FC, useState, useEffect, useCallback, useRef } from 'react';
import './404-game.css';

const COLORS = ['#00ffff', '#ff00ff'];

const NOT_FOUND_GAME = {
  GAME_DURATION: 30,
  PARTICLE_SPAWN_INTERVAL: 1000,
  PARTICLE_LIFETIME: 2000,
  PARTICLE_SIZE_OFFSET: 40,
  GAME_INTERVAL: 1000,
  MIN_TIME_LEFT: 1,
  SCORE_INCREMENT: 1,
  INITIAL_SCORE: 0,
  SHADOW_BLUR_SMALL: 10,
  SHADOW_BLUR_LARGE: 20,
} as const;

type Particle = {
  id: number;
  left: number;
  top: number;
  color: string;
};

const NotFoundGame: FC = () => {
  const [score, setScore] = useState<number>(NOT_FOUND_GAME.INITIAL_SCORE);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_timeLeft, setTimeLeft] = useState<number>(NOT_FOUND_GAME.GAME_DURATION);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isPlaying, setIsPlaying] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const particleIdRef = useRef(NOT_FOUND_GAME.INITIAL_SCORE);
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const spawnParticle = useCallback(() => {
    const newParticle: Particle = {
      id: particleIdRef.current++,
      left: Math.random() * (window.innerWidth - NOT_FOUND_GAME.PARTICLE_SIZE_OFFSET),
      top: Math.random() * (window.innerHeight - NOT_FOUND_GAME.PARTICLE_SIZE_OFFSET),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
    setParticles((prev) => [...prev, newParticle]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, NOT_FOUND_GAME.PARTICLE_LIFETIME);
  }, []);

  const handleParticleHover = useCallback((particleId: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== particleId));
    setScore((prev) => prev + NOT_FOUND_GAME.SCORE_INCREMENT);
  }, []);

  const startGame = useCallback(() => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(NOT_FOUND_GAME.INITIAL_SCORE);
    setTimeLeft(NOT_FOUND_GAME.GAME_DURATION);
    setParticles([]);
    particleIdRef.current = NOT_FOUND_GAME.INITIAL_SCORE;

    spawnParticle();

    spawnIntervalRef.current = setInterval(() => {
      spawnParticle();
    }, NOT_FOUND_GAME.PARTICLE_SPAWN_INTERVAL);

    gameIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= NOT_FOUND_GAME.MIN_TIME_LEFT) {
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
          }, NOT_FOUND_GAME.PARTICLE_LIFETIME);
          return NOT_FOUND_GAME.INITIAL_SCORE;
        }
        return prev - NOT_FOUND_GAME.SCORE_INCREMENT;
      });
    }, NOT_FOUND_GAME.GAME_INTERVAL);
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
        <div
          key={particle.id}
          className="not-found-game__particle"
          style={{
            left: `${particle.left}px`,
            top: `${particle.top}px`,
            borderColor: particle.color,
            boxShadow: `0 0 ${NOT_FOUND_GAME.SHADOW_BLUR_SMALL}px ${particle.color}, 0 0 ${NOT_FOUND_GAME.SHADOW_BLUR_LARGE}px ${particle.color}`,
          } as React.CSSProperties}
          onMouseEnter={() => handleParticleHover(particle.id)}
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

