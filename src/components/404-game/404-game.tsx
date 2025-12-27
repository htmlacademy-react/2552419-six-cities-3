import { FC, useState, useEffect, useCallback, useRef } from 'react';
import './404-game.css';
import { NOT_FOUND_GAME } from '../../constants';

type Particle = {
  id: number;
  left: number;
  top: number;
  color: string;
};

const COLORS = ['#00ffff', '#ff00ff'];

const NotFoundGame: FC = () => {
  const initialScore = NOT_FOUND_GAME.INITIAL_SCORE as number;
  const gameDuration = NOT_FOUND_GAME.GAME_DURATION as number;
  const particleSizeOffset = NOT_FOUND_GAME.PARTICLE_SIZE_OFFSET as number;
  const particleLifetime = NOT_FOUND_GAME.PARTICLE_LIFETIME as number;
  const scoreIncrement = NOT_FOUND_GAME.SCORE_INCREMENT as number;
  const particleSpawnInterval = NOT_FOUND_GAME.PARTICLE_SPAWN_INTERVAL as number;
  const minTimeLeft = NOT_FOUND_GAME.MIN_TIME_LEFT as number;
  const gameInterval = NOT_FOUND_GAME.GAME_INTERVAL as number;
  const shadowBlurSmall = NOT_FOUND_GAME.SHADOW_BLUR_SMALL as number;
  const shadowBlurLarge = NOT_FOUND_GAME.SHADOW_BLUR_LARGE as number;

  const [score, setScore] = useState<number>(initialScore);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_timeLeft, setTimeLeft] = useState<number>(gameDuration);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isPlaying, setIsPlaying] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const particleIdRef = useRef(initialScore);
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const spawnParticle = useCallback(() => {
    const newParticle: Particle = {
      id: particleIdRef.current++,
      left: Math.random() * (window.innerWidth - particleSizeOffset),
      top: Math.random() * (window.innerHeight - particleSizeOffset),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
    setParticles((prev) => [...prev, newParticle]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, particleLifetime);
  }, [particleSizeOffset, particleLifetime]);

  const handleParticleHover = useCallback((particleId: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== particleId));
    setScore((prev) => prev + scoreIncrement);
  }, [scoreIncrement]);

  const startGame = useCallback(() => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(initialScore);
    setTimeLeft(gameDuration);
    setParticles([]);
    particleIdRef.current = initialScore;

    spawnParticle();

    spawnIntervalRef.current = setInterval(() => {
      spawnParticle();
    }, particleSpawnInterval);

    gameIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= minTimeLeft) {
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
          }, particleLifetime);
          return initialScore;
        }
        return prev - scoreIncrement;
      });
    }, gameInterval);
  }, [spawnParticle, initialScore, gameDuration, particleSpawnInterval, minTimeLeft, particleLifetime, scoreIncrement, gameInterval]);

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
            boxShadow: `0 0 ${shadowBlurSmall}px ${particle.color}, 0 0 ${shadowBlurLarge}px ${particle.color}`,
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

