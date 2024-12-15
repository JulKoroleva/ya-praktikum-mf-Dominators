import { useEffect, useRef, useState } from 'react';

import { useMousePosition } from '@/utils/useMousePosition';
import { useCanvasResize } from '@/utils/useCanvasResize';

import { CanvasController } from './CanvasComponent.controller';

import styles from './CanvasComponent.module.scss';
import { STATUS } from './interfaces/CanvasComponent.interface';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { TResult } from '../../Game.interface';
import { RESURSES_URL } from '@/constants/apiUrls';
import { urlToFile } from '@/utils/urlToFile';
import { extractTextFromImage } from '@/utils/colorFileUtils';

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

  const controllerRef = useRef<CanvasController | null>(null);
  const baseAvatar = useSelector(
    (state: RootState) => state.global.user.userInfo?.avatar || 'rgb(0, 0, 0)',
  );

  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const processAvatar = async () => {
      const isRgbColor = baseAvatar?.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

      if (isRgbColor) {
        if (!controllerRef.current) {
          controllerRef.current = new CanvasController(baseAvatar, undefined);
          animate();
        }
        return;
      }

      try {
        const avatarFile = await urlToFile(`${RESURSES_URL}${baseAvatar}`, 'avatar_image.jpg');
        const extractedColor = await extractTextFromImage(avatarFile);

        if (extractedColor) {
          if (!controllerRef.current) {
            controllerRef.current = new CanvasController(extractedColor, undefined);
            animate();
          }
        }
      } catch (error) {
        const img = new Image();
        img.src = `${RESURSES_URL}${baseAvatar}`;
        img.onload = () => {
          setImageElement(img);
        };
      }
    };

    processAvatar();
  }, [baseAvatar]);

  useEffect(() => {
    if (!controllerRef.current && (imageElement || (!baseAvatar && !imageElement))) {
      controllerRef.current = new CanvasController(baseAvatar, imageElement || undefined);
      animate();
    }
  }, [imageElement, baseAvatar]);

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
    controller.MoveStatics();
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
    setScore(controller.Player.MyScore);

    const ctx = refCanvas.current.getContext('2d');
    if (!ctx) return;
    renderCanvas(ctx);

    if (!isPaused) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  };

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
        <div className={styles['canvas-page__button_container']}>
          <Button className={styles['back-button']} type="button" onClick={onBackButtonClick}>
            <img src="/src/assets/icons/back.svg" alt="back arrow" />
          </Button>
        </div>
      </div>
      <canvas data-testid="canvas" className={styles['canvas']} ref={refCanvas} />
    </div>
  );
}
