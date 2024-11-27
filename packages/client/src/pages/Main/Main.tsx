import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { ROUTES } from '@/constants/routes';
import { Button } from 'react-bootstrap';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import { IButtonConfig } from './interfaces/Button.interface';
import { Container } from '@tsparticles/engine';
import { COLOR_PALETTE } from './constants/color.constant';
import { IParticle } from './interfaces/Particle.interface';
import styles from './Main.module.scss';

export const Main = () => {
  const containerRef = useRef<Container | null>(null);
  const [init, setInit] = useState(false);
  const [userName] = useState<string>('UserName');

  const description =
    'Сражайся, поглощай и становись сильнее! Уничтожай соперников в динамичной битве за выживание.';

  const buttons: IButtonConfig[] = [
    { href: ROUTES.game(), text: 'Start Game!', className: styles[`main-button`] },
    { href: ROUTES.profile(), text: 'Profile' },
    { href: ROUTES.leaderboard(), text: 'Leaderboard' },
    { href: ROUTES.forum(), text: 'Forum' },
  ];

  useEffect(() => {
    const initializeParticles = async () => {
      try {
        await initParticlesEngine(async engine => {
          await loadFull(engine);
        });
        setInit(true);
      } catch (error) {
        console.error('Error initializing particles engine:', error);
      }
    };

    if (!init) {
      initializeParticles();
    }
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
    <div className={styles['main-page']}>
      {init && (
        <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={particlesConfig} />
      )}
      <h1 className={styles['main-page__title']}>DOMinators</h1>
      <div className={styles['main-page__menu']}>
        <h3 className={styles['main-page__menu_greetings']}>Привет, {userName}!</h3>
        <p className={styles['main-page__menu_description']}>{description}</p>
        <div className={styles['main-page__menu_buttons']}>
          {buttons.map(({ href, text, className }, index) => (
            <Button
              key={index}
              href={href}
              size="lg"
              className={`${styles['menu-button']} ${className || ''}`.trim()}>
              {text}
            </Button>
          ))}
        </div>
      </div>
      <Button href={ROUTES.authorization()} className={styles['main-page__logout-button']}>
        Logout
      </Button>
    </div>
  );
};
