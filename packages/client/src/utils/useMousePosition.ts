import { useEffect, useRef } from 'react';
import { ICoords } from '../pages/Game/components/CanvasComponent/interfaces/CanvasComponent.interface';

const INITIAL_MOUSE_STATE = {
  X: 0,
  Y: 0,
};

export function useMousePosition() {
  const mouseCoodrs = useRef<ICoords>(INITIAL_MOUSE_STATE);

  const handleCursorMovement = (event: MouseEvent): void => {
    mouseCoodrs.current.X += event.movementX;
    mouseCoodrs.current.Y += event.movementY;
  };

  const lockStatusChange = () => {
    if (document.pointerLockElement) {
      window.addEventListener('mousemove', handleCursorMovement);
    } else {
      window.removeEventListener('mousemove', handleCursorMovement);
    }
  };

  useEffect(() => {
    document.addEventListener('pointerlockchange', lockStatusChange, false);
    return () => {
      document.removeEventListener('pointerlockchange', lockStatusChange);
    };
  }, []);

  return mouseCoodrs;
}
