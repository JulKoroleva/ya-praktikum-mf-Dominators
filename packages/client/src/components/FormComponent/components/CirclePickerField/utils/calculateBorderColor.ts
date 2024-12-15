import { Color } from 'react-slider-color-picker/dist/interfaces';
import { hslToRgb } from './hslToRgb';

export const calculateBorderColor = (
  color: Color | null,
  hasImage: boolean,
  selectedColor: string | null,
) => {
  if (!selectedColor || typeof selectedColor === 'object') return null;

  if (hasImage) return 'black';

  const rgbMatch = selectedColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    const [r, g, b] = rgbMatch.slice(1).map(Number);

    const darkenedR = Math.max(0, r * 0.8);
    const darkenedG = Math.max(0, g * 0.8);
    const darkenedB = Math.max(0, b * 0.8);

    return `rgb(${Math.round(darkenedR)}, ${Math.round(darkenedG)}, ${Math.round(darkenedB)})`;
  }

  // Проверяем, что color не null
  if (!color) {
    console.error('Color is null or undefined');
    return 'transparent'; // Возвращаем прозрачный цвет, если color не определён
  }

  const rgbValue = hslToRgb(color.h, color.s, color.l * 0.8);
  return rgbValue;
};
