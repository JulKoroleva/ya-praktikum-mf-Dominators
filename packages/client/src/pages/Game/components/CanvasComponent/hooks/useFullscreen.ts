import { useState, useEffect } from 'react';

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = (element: HTMLElement | null, status?: boolean) => {
    if (!element) return;

    if (typeof status !== 'undefined') {
      if (status && !document.fullscreenElement) {
        element.requestFullscreen();
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

  return { isFullscreen, toggleFullscreen };
};
