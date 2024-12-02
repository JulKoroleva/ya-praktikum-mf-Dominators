import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { useMousePosition } from '@/utils/useMousePosition';
import { useCanvasResize } from '@/utils/useCanvasResize';

import { CanvasController } from './CanvasComponent.controller';

import styles from './CanvasComponent.module.scss';
import { STATUS } from './CanvasComponent.interface';

export function CanvasComponent({
  endGameCallback,
}: {
  endGameCallback: Dispatch<SetStateAction<boolean>>;
}) {
  const controller = new CanvasController();
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const mouseCoodrs = useMousePosition();
  const [score, setScore] = useState(0);

  useCanvasResize();

  const animate = () => {
    if (refCanvas?.current) {
      if (controller.Player.Player.Status === STATUS.DEAD) {
        endGameCallback(true);
        return;
      }
      setScore(controller.Player.MyScore);
      const canvas = document.querySelector('canvas')!;
      const ctx = refCanvas.current.getContext('2d')!;

      controller.Camera.Scale = Math.max(10 - controller.Player.Player.Radius / 10, 1);

      ctx.setTransform(controller.Camera.Scale, 0, 0, controller.Camera.Scale, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      controller.MovePlayer(mouseCoodrs.current.X, mouseCoodrs.current.Y);
      controller.MoveStatics();
      controller.EnemyPlayersMove();

      controller.Camera.focus(canvas, controller.Map, controller.Player.Player);
      ctx.translate(-controller.Camera.X, -controller.Camera.Y);

      controller.CollisionFoodDetection();
      controller.CollisionEnemyDetection();
      controller.CollisionDetection();
      controller.DrawAll(ctx);
    }
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    animate();
  }, []);

  useEffect(() => {
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
      <div className={styles['canvas-page__score-block']}>
        <div className={styles['canvas-page__score-block__name']}>Игрок: </div>
        <div className={styles['canvas-page__score-block__points']}>{score}</div>
      </div>
      <canvas className={styles['canvas']} ref={refCanvas} />
    </div>
  );
}
