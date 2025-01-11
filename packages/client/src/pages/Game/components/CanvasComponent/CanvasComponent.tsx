import { useEffect, useRef, useState } from 'react';
import { useMousePosition } from '@/utils/useMousePosition';
import { useCanvasResize } from '@/utils/useCanvasResize';
import { useFullscreen } from './hooks/useFullscreen';
import { useAvatarImage } from './hooks/useAvatar';

import { CanvasController } from './CanvasComponent.controller';

import styles from './CanvasComponent.module.scss';
import { STATUS } from './interfaces/CanvasComponent.interface';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { TResult } from '../../Game.interface';

import fullScrenIcon from '@/assets/icons/screen-full.svg';
import normalScrenIcon from '@/assets/icons/screen-normal.svg';

export function CanvasComponent({
  endGameCallback,
  onBackButtonClick,
  isPaused,
}: {
  endGameCallback: (result: Array<TResult>) => void;
  onBackButtonClick: () => void;
  isPaused: boolean;
}) {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mouseCoodrs = useMousePosition();
  const [score, setScore] = useState(0);

  useCanvasResize();

  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const controllerRef = useRef<CanvasController | null>(null);
  const baseAvatar = useSelector(
    (state: RootState) => state.global.user.processedAvatar || 'rgb(0, 0, 0)',
  );

  useAvatarImage(baseAvatar, (baseColor: string | null, img: HTMLImageElement | null) => {
    if (!controllerRef.current) {
      controllerRef.current = new CanvasController(baseColor || 'rgb(0, 0, 0)', img || undefined);
      animate();
    }
  });

  useEffect(() => {
    if (isPaused) {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    } else {
      if (!animationFrameRef.current) {
        animate();
      }
    }

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isPaused]);

  const renderCanvas = (ctx: CanvasRenderingContext2D) => {
    const controller = controllerRef.current;
    if (!controller) return;

    const canvas = refCanvas.current;
    if (!canvas) return;

    controller.Camera.Scale = Math.max(10 - controller.Player.Player.Radius / 10, 1);

    ctx.setTransform(controller.Camera.Scale, 0, 0, controller.Camera.Scale, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    controller.DrawGrid(ctx);

    controller.MovePlayer(mouseCoodrs.current.X, mouseCoodrs.current.Y);
    controller.EnemyPlayersMove();

    controller.Camera.focus(canvas, controller.Map, controller.Player.Player);
    ctx.translate(-controller.Camera.X, -controller.Camera.Y);

    controller.CollisionFoodDetection();
    controller.CollisionEnemyDetection();
    controller.CollisionDetection();
    controller.DrawAll(ctx);
  };

  const animate = () => {
    if (isPaused || !controllerRef.current || !refCanvas.current) return;
    const controller = controllerRef.current;
    if (!controller || !refCanvas.current) return;

    if (controller.Player.Player.Status === STATUS.DEAD) {
      endGameCallback(controller.Result);
      return;
    }

    const ctx = refCanvas.current.getContext('2d');
    if (!ctx) return;
    renderCanvas(ctx);

    if (!isPaused) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (controllerRef.current) {
        setScore(controllerRef.current.Player.MyScore);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const controller = controllerRef.current;
    if (!controller) return;

    for (const enemys of controller.EnemyPlayers) {
      enemys.Init();
    }

    return () => {
      for (const enemys of controller.EnemyPlayers) {
        enemys.Destroy();
      }
    };
  }, []);

  useEffect(() => {
    const controller = controllerRef.current;
    if (!controller) return;

    const cb = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        controller.Player.cellDivision(
          controller.Camera,
          mouseCoodrs.current.X,
          mouseCoodrs.current.Y,
        );
        return;
      }
      if (event.code === 'KeyW') {
        controller.Player.throwFood(
          controller.Camera,
          controller.FoodFields,
          mouseCoodrs.current.X,
          mouseCoodrs.current.Y,
        );
        return;
      }
    };
    document.addEventListener('keydown', cb);
    return () => {
      document.removeEventListener('keydown', cb);
    };
  }, []);

  return (
    <div className={styles['canvas-page']}>
      <div className={styles['canvas-page__menu']}>
        <div className={styles['canvas-page__score-block']}>
          <div className={styles['canvas-page__score-block__name']}>Score: </div>
          <div className={styles['canvas-page__score-block__points']}>{score}</div>
        </div>
        <Button
          className={styles['back-button']}
          type="button"
          onClick={() => {
            const parentElement = refCanvas.current?.parentElement || null;
            toggleFullscreen(parentElement, false);
            onBackButtonClick();
          }}>
          <img src="/src/assets/icons/back.svg" alt="back arrow" />
        </Button>
      </div>
      <Button
        className={styles['fullscreen-button']}
        type="button"
        onClick={() => {
          const parentElement = refCanvas.current?.parentElement || null;
          toggleFullscreen(parentElement);
        }}>
        <img
          className={styles['fullscreen-button__icon']}
          src={isFullscreen ? normalScrenIcon : fullScrenIcon}
          alt="fullscreen toggle"
        />
      </Button>
      <canvas data-testid="canvas" className={styles['canvas']} ref={refCanvas} />
    </div>
  );
}
