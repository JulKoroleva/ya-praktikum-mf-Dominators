import { useEffect } from 'react';

const toggleFullscreen = (element: HTMLElement | null, status?: boolean) => {
  if (!element) return;

  if (typeof status !== 'undefined') {
    if (status && !document.fullscreenElement) {
      //проверка для запуска тестов
      if (typeof element.requestFullscreen === 'function') {
        element.requestFullscreen();
      }
    } else if (!status && document.fullscreenElement) {
      document.exitFullscreen();
    }
  } else {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      element.requestFullscreen();
    }
  }
};

export const useFullscreenAndPointerLock = (
  refCanvas: React.RefObject<HTMLCanvasElement>,
  pause: () => void,
) => {
  const lockStatusChange = () => {
    if (!document.pointerLockElement) {
      pause();
    }
  };

  const toggleStatus = (status: boolean) => {
    if (status) {
      //проверка для запуска тестов
      if (typeof refCanvas.current?.requestPointerLock === 'function') {
        refCanvas.current?.requestPointerLock();
      }
    } else {
      document.exitPointerLock();
    }
    toggleFullscreen(refCanvas.current?.parentElement || null, status);
  };

  useEffect(() => {
    toggleStatus(true);
    document.addEventListener('pointerlockchange', lockStatusChange);

    return () => {
      document.removeEventListener('pointerlockchange', lockStatusChange);
    };
  }, []);

  return toggleStatus;
};
