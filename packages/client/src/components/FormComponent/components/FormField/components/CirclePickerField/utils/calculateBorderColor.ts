import { RGBColor } from 'react-color';
import { getRgbDarkned } from './getRgbDarkned';

export const calculateBorderColor = (
  color: RGBColor | null,
  hasImage: boolean,
  selectedColor: string | null,
) => {
  if (!selectedColor || typeof selectedColor === 'object') return null;

  if (hasImage) return 'black';

  const rgbDarkned = getRgbDarkned(selectedColor);

  if (rgbDarkned) {
    return rgbDarkned;
  }

  if (!color) {
    return 'transparent';
  }

  return getRgbDarkned(`rgb(${color.r}, ${color.g}, ${color.b})`);
};
