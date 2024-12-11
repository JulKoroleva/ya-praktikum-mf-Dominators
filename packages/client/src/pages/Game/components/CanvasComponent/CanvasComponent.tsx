import { useEffect, useRef, useState } from 'react';

import { useMousePosition } from '@/utils/useMousePosition';
import { useCanvasResize } from '@/utils/useCanvasResize';

import { CanvasController } from './CanvasComponent.controller';

import styles from './CanvasComponent.module.scss';
import { STATUS } from './interfaces/CanvasComponent.interface';
import { Button } from 'react-bootstrap';
import { ROUTES } from '@/constants/routes';
import { Navigation } from '@/components';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { TResult } from '../../Game.interface';

export function CanvasComponent({
  endGameCallback,
}: {
  endGameCallback: (result: Array<TResult>) => void;
}) {
  const controllerRef = useRef<CanvasController | null>(null);
  const baseColor = useSelector(
    (state: RootState) => state.circlePicker.selectedColor || 'rgb(0, 0, 0)',
  );
  const baseImage = useSelector((state: RootState) => state.circlePicker.selectedImage);

  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (baseImage) {
      const img = new Image();
      img.src = baseImage;
      img.onload = () => {
        setImageElement(img);
      };
    } else {
      if (!controllerRef.current) {
        controllerRef.current = new CanvasController(baseColor, undefined);
        animate();
      }
    }
  }, [baseImage]);

  useEffect(() => {
    if (!controllerRef.current && (imageElement || (!baseImage && !imageElement))) {
      controllerRef.current = new CanvasController(baseColor, imageElement || undefined);
      animate();
    }
  }, [imageElement, baseImage, baseColor]);

  const refCanvas = useRef<HTMLCanvasElement>(null);
  const mouseCoodrs = useMousePosition();
  const [score, setScore] = useState(0);

  useCanvasResize();

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

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = refCanvas.current;
    if (canvas) {
      const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      setCanvasSize();
      window.addEventListener('resize', setCanvasSize);

      return () => {
        window.removeEventListener('resize', setCanvasSize);
      };
    }
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
        <div className={styles['canvas-page__button_container']}>
          <Navigation title="" to={ROUTES.main()} />
          <Button
            className={styles['back-button']}
            type="button"
            onClick={() => ROUTES.main()}></Button>
        </div>
      </div>
      <canvas className={styles['canvas']} ref={refCanvas} />
    </div>
  );
}
