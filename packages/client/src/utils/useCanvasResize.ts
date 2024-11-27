import { useEffect } from 'react';

export function useCanvasResize() {
  const resize = function () {
    const canvas = document.querySelector('canvas');
    if (!canvas) {
      return;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  useEffect(() => {
    window.addEventListener('resize', resize);
    resize();
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);
}
