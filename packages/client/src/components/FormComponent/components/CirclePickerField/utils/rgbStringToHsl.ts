import { Color } from 'react-slider-color-picker/dist/interfaces';

export const rgbStringToHsl = (rgbString: string): Color | null => {
  const rgbMatch = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch.map(Number);

    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const delta = max - min;

    const l = (max + min) / 2;

    let h = 0;
    let s = 0;

    if (delta !== 0) {
      s = l < 0.5 ? delta / (max + min) : delta / (2 - max - min);

      if (max === rNorm) {
        h = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) * 60;
      } else if (max === gNorm) {
        h = ((bNorm - rNorm) / delta + 2) * 60;
      } else if (max === bNorm) {
        h = ((rNorm - gNorm) / delta + 4) * 60;
      }
    }

    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100), a: 1 };
  }

  return null;
};
