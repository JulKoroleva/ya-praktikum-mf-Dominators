import { useEffect, useRef } from 'react';

import { useMousePosition } from '@/utils/useMousePosition';
import { useCanvasResize } from '@/utils/useCanvasResize';

import { CanvasController } from './CanvasComponent.controller';

import styles from './CanvasComponent.module.scss';

export function CanvasComponent() {
  const controller = new CanvasController();
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const mouseCoodrs = useMousePosition();

  useCanvasResize();

  const animate = () => {
    if (refCanvas?.current) {
      const canvas = document.querySelector('canvas')!;
      const ctx = refCanvas.current.getContext('2d')!;

      controller.Camera.Scale = Math.max(10 - controller.Player.Player.Radius / 10, 1);

      ctx.setTransform(controller.Camera.Scale, 0, 0, controller.Camera.Scale, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      controller.MovePlayer(mouseCoodrs.current.X, mouseCoodrs.current.Y);
      controller.EnemyPlayersMove();

      controller.Camera.focus(canvas, controller.Map, controller.Player.Player);
      ctx.translate(-controller.Camera.X, -controller.Camera.Y);

      controller.CollisionFoodDetection();
      controller.CollisionEnemyDetection();
      controller.CollisionDetection();

      for (const enemys of controller.EnemyPlayers) {
        enemys.draw(ctx);
      }
      controller.Player.Player.draw(ctx);
      controller.Player.drawDivisions(ctx);
      controller.MoveStatics();

      controller.DrawFood(ctx);
      controller.DrawEnemy(ctx);
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
      if (event.code !== 'Space') {
        return;
      }
      controller.Player.cellDivision(
        controller.Camera,
        mouseCoodrs.current.X,
        mouseCoodrs.current.Y,
      );
    };
    document.addEventListener('keydown', cb);
    return () => {
      document.removeEventListener('keydown', cb);
    };
  }, []);

  useEffect(() => {
    const cb = (event: KeyboardEvent) => {
      if (event.code !== 'KeyW') {
        return;
      }
      controller.Player.throwFood(
        controller.Camera,
        controller.FoodFields,
        mouseCoodrs.current.X,
        mouseCoodrs.current.Y,
      );
    };
    document.addEventListener('keydown', cb);
    return () => {
      document.removeEventListener('keydown', cb);
    };
  }, []);

  return <canvas className={styles['canvas']} ref={refCanvas} />;
}
