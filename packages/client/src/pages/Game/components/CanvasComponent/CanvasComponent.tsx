import { useEffect, useRef, useState } from 'react';
import { useMousePosition } from '@/utils/useMousePosition';
import { useCanvasResize } from '@/utils/useCanvasResize';
import { useFullscreenAndPointerLock } from './hooks/useFullscreenAndPointerLock';
import { useAvatarImage } from './hooks/useAvatar';

import { CanvasController } from './CanvasComponent.controller';

import styles from './CanvasComponent.module.scss';
import { STATUS } from './interfaces/CanvasComponent.interface';
import { ProgressBar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { TResult } from '../../Game.interface';
import { TimerProgressBar } from '@/components/TimerProgressBar/TimerProgressBar';

export function CanvasComponent({
  endGameCallback,
  onBackButtonClick,
  isPaused,
  isEndedGame,
}: {
  endGameCallback: (result: Array<TResult>) => void;
  onBackButtonClick: () => void;
  isPaused: boolean;
  isEndedGame: boolean;
}) {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timerProgress, setTimerProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState(60);
  const [isWaitingForTap, setIsWaitingForTap] = useState(false);
  //должен быть до useMousePosition
  const toggleFullscreenAndPointerLock = useFullscreenAndPointerLock(refCanvas, onBackButtonClick);
  const mouseCoodrs = useMousePosition();
  const lastTimeRef = useRef(performance.now());

  useCanvasResize();

  const controllerRef = useRef<CanvasController | null>(null);
  const baseAvatar = useSelector(
    (state: RootState) => state.global.user.processedAvatar || 'rgb(0, 200, 255)',
  );

  useAvatarImage(baseAvatar, (baseColor: string | null, img: HTMLImageElement | null) => {
    if (!controllerRef.current) {
      controllerRef.current = new CanvasController(
        baseColor || 'rgb(0, 200, 255)',
        img || undefined,
      );
      animate();
    }
  });

  useEffect(() => {
    if (isEndedGame) {
      toggleFullscreenAndPointerLock(false);
    }
  }, [isEndedGame]);

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
      toggleFullscreenAndPointerLock(true);
    }

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isPaused]);

  useEffect(() => {
    if (isPaused || isWaitingForTap) return;

    const interval = setInterval(() => {
      setTimerProgress(prev => {
        if (prev >= 100) {
          setIsWaitingForTap(true);
          clearInterval(interval);
          return 100;
        }
        setRemainingTime(t => t - 1);
        return prev + 100 / 60;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, isWaitingForTap]);

  const resetTimer = () => {
    setTimerProgress(0);
    setRemainingTime(60);
    setIsWaitingForTap(false);
  };

  const handleTap = () => {
    if (!isWaitingForTap) return;

    setIsWaitingForTap(false);
    setTimerProgress(prev => Math.max(0, prev - 20));
  };

  const renderCanvas = (ctx: CanvasRenderingContext2D, deltaTime: number) => {
    const controller = controllerRef.current;
    if (!controller) return;

    const canvas = refCanvas.current;
    if (!canvas) return;

    controller.Camera.Scale = Math.max(10 - controller.Player.Player.Radius / 10, 1);

    ctx.setTransform(controller.Camera.Scale, 0, 0, controller.Camera.Scale, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    controller.DrawGrid(ctx);

    controller.MovePlayer(mouseCoodrs.current.X, mouseCoodrs.current.Y, deltaTime);
    controller.EnemyPlayersMove(deltaTime); // Передаём deltaTime

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

    const currentTime = performance.now();
    const deltaTime = (currentTime - lastTimeRef.current) / 16.67;
    lastTimeRef.current = currentTime;

    setProgress(controller.Player.BoostProgress);
    const ctx = refCanvas.current.getContext('2d');
    if (!ctx) return;
    renderCanvas(ctx, deltaTime);

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
        controller.Player.activateSpeedBooster();
        if (progress === 100) {
          resetTimer();
        }
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
    <>
      <div className={styles['canvas-page']}>
        {!isEndedGame && (
          <div className={styles['canvas-page__menu']}>
            <div className={styles['canvas-page__score-block']}>
              <div className={styles['canvas-page__score-block__name']}>Score: </div>
              <div className={styles['canvas-page__score-block__points']}>{score}</div>
            </div>
            <div className={styles['canvas-page__progress-block']}>
              <ProgressBar className={styles['canvas-page__progress']}>
                <ProgressBar
                  className={
                    progress < 100
                      ? styles['canvas-page__progress__fill']
                      : styles['canvas-page__progress__complete']
                  }
                  now={progress}
                  max={100}
                />
                <TimerProgressBar
                  progress={timerProgress}
                  isWaitingForTap={isWaitingForTap}
                  remainingTime={remainingTime}
                  onTap={handleTap}
                />
              </ProgressBar>
            </div>
          </div>
        )}
        <canvas data-testid="canvas" className={styles['canvas']} ref={refCanvas} />
      </div>
    </>
  );
}
