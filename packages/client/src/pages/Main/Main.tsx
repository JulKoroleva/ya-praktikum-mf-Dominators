import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { ROUTES } from '@/constants/routes';
import Button from 'react-bootstrap/Button';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import { IButtonConfig } from './interfaces/Button.interface';
import { Container } from '@tsparticles/engine';
import { COLOR_PALETTE } from './constants/color.constant';
import { IParticle } from './interfaces/Particle.interface';
import './style.scss';

export const Main = () => {
  const containerRef = useRef<Container | null>(null);
  const [init, setInit] = useState(false);
  const [userName] = useState<string>('UserName');

  const description =
    'Сражайся, поглощай и становись сильнее! Уничтожай соперников в динамичной битве за выживание.';

  const buttons: IButtonConfig[] = [
    { href: ROUTES.game(), text: 'Start Game!', variant: 'dark', className: 'main-button' },
    { href: ROUTES.profile(), text: 'Profile', variant: 'dark' },
    { href: ROUTES.leaderboard(), text: 'Leaderboard', variant: 'dark' },
    { href: ROUTES.forum(), text: 'Forum', variant: 'dark' },
  ];

  useEffect(() => {
    if (init) return;

    initParticlesEngine(async engine => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, [init]);

  const particlesConfig = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      particles: {
        number: { value: 80 },
        color: { value: COLOR_PALETTE },
        shape: { type: 'circle' },
        opacity: { value: 1 },
        size: { value: { min: 5, max: 25 } },
        collisions: { enable: true, mode: 'bounce' as const },
        move: {
          enable: true,
          speed: 3,
          direction: 'none' as const,
          outModes: 'bounce' as const,
        },
      },
    }),
    [],
  );

  const handleCollision = useCallback((container: Container) => {
    if (!container) return;

    const particlesArray: IParticle[] =
      (container as unknown as { particles: { _array: IParticle[] } }).particles?._array || [];

    if (!particlesArray || particlesArray.length === 0) return;

    for (let i = 0; i < particlesArray.length; i++) {
      for (let j = i + 1; j < particlesArray.length; j++) {
        const p1 = particlesArray[i];
        const p2 = particlesArray[j];

        const dx = p1.position.x - p2.position.x;
        const dy = p1.position.y - p2.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= p1.getRadius() + p2.getRadius()) {
          const larger = p1.getRadius() > p2.getRadius() ? p1 : p2;
          const smaller = p1.getRadius() > p2.getRadius() ? p2 : p1;

          const growth = smaller.size.value * 0.2;
          larger.size.value += growth;

          smaller.destroy();

          const index = particlesArray.indexOf(smaller);
          if (index > -1) {
            particlesArray.splice(index, 1);
          }
        }
      }
    }
  }, []);

  const particlesLoaded = useCallback(
    async (container?: Container) => {
      if (!container) return;
      containerRef.current = container;

      const intervalId = setInterval(() => handleCollision(containerRef.current!), 10);

      return new Promise<void>(resolve => {
        return () => {
          clearInterval(intervalId);
          resolve();
        };
      });
    },
    [handleCollision],
  );

  return (
    <div className="main-page">
      {init && (
        <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={particlesConfig} />
      )}
      <h1 className="main-page__title">DOMinators</h1>
      <div className="main-page__menu">
        <h3 className="main-page__menu_greeting">Привет, {userName}!</h3>
        <p className="main-page__menu_description">{description}</p>
        <div className="main-page__menu_buttons">
          {buttons.map(({ href, text, variant, className }, index) => (
            <Button
              key={index}
              href={href}
              variant={variant}
              size="lg"
              className={`menu-button ${className || ''}`.trim()}>
              {text}
            </Button>
          ))}
        </div>
      </div>
      <Button
        href={ROUTES.authorization()}
        variant="outline-dark"
        className="main-page__logout-button">
        Logout
      </Button>
    </div>
  );
};
