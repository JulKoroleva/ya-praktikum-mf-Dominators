import { Color } from 'react-slider-color-picker/dist/interfaces';
import { hslToRgb } from './hslToRgb';

export const calculateBorderColor = (
  color: Color,
  hasImage: boolean,
  selectedColor: string | null,
) => {
  if (hasImage) return 'black';

  if (selectedColor) {
    const rgbMatch = selectedColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      const [r, g, b] = rgbMatch.slice(1).map(Number);
      const darkenedR = Math.max(0, r * 0.8);
      const darkenedG = Math.max(0, g * 0.8);
      const darkenedB = Math.max(0, b * 0.8);
      return `rgb(${Math.round(darkenedR)}, ${Math.round(darkenedG)}, ${Math.round(darkenedB)})`;
    } else {
      const rgbValue = hslToRgb(color.h, color.s, color.l * 0.8);
      return rgbValue;
    }
  }
};
