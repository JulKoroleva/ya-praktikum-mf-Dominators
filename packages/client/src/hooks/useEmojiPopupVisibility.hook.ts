import { useState, useRef } from 'react';

export function useEmojiPopupVisibility(delay: number = 500) {
  const [showPopup, setShowPopup] = useState(false);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
    }
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setShowPopup(false);
    }, delay);
  };

  return { showPopup, handleMouseEnter, handleMouseLeave, setShowPopup };
}
