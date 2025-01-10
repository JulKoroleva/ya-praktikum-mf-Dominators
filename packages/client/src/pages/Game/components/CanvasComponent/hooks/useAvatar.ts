import { RESOURCES_URL } from '@/constants/apiUrls';
import { useState, useEffect } from 'react';

export const useAvatarImage = (
  avatar: string | null,
  onAvatarReady: (baseColor: string | null, img: HTMLImageElement | null) => void,
) => {
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const isRgbColor = avatar?.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    if (isRgbColor) {
      setImageElement(null);
      onAvatarReady(avatar, null);
    } else {
      const img = new Image();
      img.src = avatar?.startsWith('http') ? avatar : `${RESOURCES_URL}${avatar}`;
      img.onload = () => {
        setImageElement(img);
        onAvatarReady(null, img);
      };
    }
  }, []);

  return imageElement;
};
