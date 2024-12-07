import { ICircle } from '../CanvasComponent.interface';

export const DrawCircle = (ctx: CanvasRenderingContext2D, circleDims: ICircle) => {
  const {
    Radius: radius,
    X: startX,
    Y: startY,
    LineWidth = 2,
    ColorFill: colorFill = 'black',
    DeformationX = 0,
    DeformationY = 0,
  } = circleDims;

  const jellyDamping = 0.98;
  const numPoints = 36;
  const angleStep = (Math.PI * 2) / numPoints;
  const time = Date.now() / 100;

  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = i * angleStep;

    const deformation = -(Math.cos(angle) * DeformationX + Math.sin(angle) * DeformationY);
    const waveEffect = Math.sin(time + angle * 2) * deformation * 0.3;
    const spreadEffect = Math.sin(angle) * deformation * 0.2;
    const pointRadius = radius + deformation + waveEffect + spreadEffect;
    const limitedRadius = Math.max(radius * 0.8, Math.min(radius * 1.3, pointRadius));

    const x = startX + Math.cos(angle) * limitedRadius;
    const y = startY + Math.sin(angle) * limitedRadius;

    points.push({ x, y });
  }

  ctx.beginPath();
  for (let i = 0; i < numPoints; i++) {
    const next = (i + 1) % numPoints;
    const cpX = (points[i].x + points[next].x) / 2;
    const cpY = (points[i].y + points[next].y) / 2;

    if (i === 0) ctx.moveTo(cpX, cpY);
    else ctx.quadraticCurveTo(points[i].x, points[i].y, cpX, cpY);
  }
  ctx.closePath();

  ctx.fillStyle = colorFill;
  ctx.fill();

  const darkerStrokeStyle = strokeColor(colorFill, 20);
  ctx.strokeStyle = darkerStrokeStyle;
  ctx.lineWidth = LineWidth;
  ctx.stroke();

  circleDims.DeformationX = DeformationX * jellyDamping;
  circleDims.DeformationY = DeformationY * jellyDamping;
};

function strokeColor(color: string, amount: number = 20): string {
  const parseColor = (color: string): [number, number, number] | null => {
    if (color.startsWith('#')) {
      let hex = color.slice(1);
      if (hex.length === 3) {
        hex = hex
          .split('')
          .map(char => char + char)
          .join('');
      }
      const bigint = parseInt(hex, 16);
      return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    } else if (color.startsWith('rgb')) {
      const rgb = color.match(/\d+/g)?.map(Number);
      if (rgb && rgb.length >= 3) {
        return [rgb[0], rgb[1], rgb[2]];
      }
    }
    return null;
  };

  const rgb = parseColor(color);
  if (!rgb) return color;

  const [r, g, b] = rgb.map(channel => Math.max(0, Math.min(255, channel - amount)));

  return `rgb(${r}, ${g}, ${b})`;
}
