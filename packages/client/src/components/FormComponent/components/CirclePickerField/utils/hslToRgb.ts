export function hslToRgb(h: number, s: number, l: number): string {
  const sNorm = s / 100;
  const lNorm = l / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;

  const [r, g, b] = (() => {
    switch (true) {
      case h >= 0 && h < 60:
        return [c, x, 0];
      case h >= 60 && h < 120:
        return [x, c, 0];
      case h >= 120 && h < 180:
        return [0, c, x];
      case h >= 180 && h < 240:
        return [0, x, c];
      case h >= 240 && h < 300:
        return [x, 0, c];
      case h >= 300 && h < 360:
        return [c, 0, x];
      default:
        return [0, 0, 0];
    }
  })();

  const rRgb = Math.round((r + m) * 255);
  const gRgb = Math.round((g + m) * 255);
  const bRgb = Math.round((b + m) * 255);

  return `rgb(${rRgb}, ${gRgb}, ${bRgb})`;
}
