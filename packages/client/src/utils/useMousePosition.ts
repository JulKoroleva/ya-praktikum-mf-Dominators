import { useEffect, useRef } from 'react';
import { ICoords } from '../pages/Game/components/CanvasComponent/CanvasComponent.interface';

const INITIAL_MOUSE_STATE = {
  X: 0,
  Y: 0,
};

export function useMousePosition() {
  const mouseCoodrs = useRef<ICoords>(INITIAL_MOUSE_STATE);

  const handleCursorMovement = (event: MouseEvent): void => {
    const rect = (event.target! as HTMLElement).getBoundingClientRect();
    mouseCoodrs.current = {
      X: event.clientX - rect.left,
      Y: event.clientY - rect.top,
    };
  };
  useEffect(() => {
    window.addEventListener('mousemove', handleCursorMovement);
    return () => {
      window.removeEventListener('mousemove', handleCursorMovement);
    };
  }, []);

  return mouseCoodrs;
}
