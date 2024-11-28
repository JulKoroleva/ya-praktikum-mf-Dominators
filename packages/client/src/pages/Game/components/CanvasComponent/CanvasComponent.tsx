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

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      controller.MovePlayer(mouseCoodrs.current.X, mouseCoodrs.current.Y);
      controller.Camera.focus(canvas, controller.Map, controller.Player);
      ctx.translate(-controller.Camera.X, -controller.Camera.Y);

      controller.CollisionDetection();
      controller.collisionEnemyDetection();

      /** оставлено для дебага */
      // controller.Map.draw(ctx)
      controller.Player.draw(ctx);
      controller.DrawFood(ctx);
      controller.DrawEnemy(ctx);
    }
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    animate();
  }, []);

  return <canvas className={styles['canvas']} ref={refCanvas} />;
}
