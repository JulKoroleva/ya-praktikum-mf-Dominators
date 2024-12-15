import { rgbToHsl } from '@tsparticles/engine';
import { Color } from 'react-slider-color-picker/dist/interfaces';

export const rgbStringToHsl = (rgbString: string): Color | null => {
  const rgbMatch = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch.map(Number);
    const { h, s, l } = rgbToHsl({ r, g, b });
    return { h, s, l, a: 1 };
  }
  return null;
};
