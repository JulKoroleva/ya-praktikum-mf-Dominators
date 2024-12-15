import { useState, useEffect } from 'react';

export const useAvatarImage = (avatar: string | null, onAvatarReady: () => void) => {
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (avatar?.startsWith('data:image')) {
      const img = new Image();
      img.src = avatar;
      img.onload = () => {
        setImageElement(img);
        onAvatarReady();
      };
    } else {
      setImageElement(null);
      onAvatarReady();
    }
  }, [avatar, onAvatarReady]);

  return imageElement;
};
