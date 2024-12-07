import { ICircle } from '../CanvasComponent.interface';

export const DrawCircle = (
  ctx: CanvasRenderingContext2D,
  circleDims: ICircle & {
    DeformationX?: number;
    DeformationY?: number;
    IsJelly?: boolean;
  },
) => {
  const {
    Radius: radius,
    X: startX,
    Y: startY,
    LineWidth = 2,
    StrokeStyle: strokeStyle,
    ColorFill: colorFill = 'black',
    DeformationX = 0,
    DeformationY = 0,
  } = circleDims;

  const jellyDamping = 0.98;

  const numPoints = 36;
  const angleStep = (Math.PI * 2) / numPoints;
  const time = Date.now() / 100;
  const jellyFrequency = 5;

  const baseRadius = radius;
  const shakeAmplitude =
    Math.abs(DeformationX) > 0.5 || Math.abs(DeformationY) > 0.5 ? baseRadius * 0.01 : 0;
  const radiusShake = baseRadius + shakeAmplitude * Math.sin(time * jellyFrequency);

  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = i * angleStep;
    const waveEffect =
      Math.sin(time + i * 0.5) * (Math.abs(DeformationX) > 0.5 ? baseRadius * 0.05 : 0);
    const noise = Math.sin(time * 0.3 + i) * (DeformationX + DeformationY) * 0.2;
    const pointRadius = radiusShake + waveEffect + noise;
    const x = startX + Math.cos(angle) * pointRadius;
    const y = startY + Math.sin(angle) * pointRadius;
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

  ctx.fillStyle = colorFill || 'rgba(0, 128, 255, 0.6)';
  ctx.fill();

  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle || 'rgba(0, 128, 255, 1)';
    ctx.lineWidth = LineWidth;
    ctx.stroke();
  }

  circleDims.DeformationX = DeformationX * jellyDamping;
  circleDims.DeformationY = DeformationY * jellyDamping;
};
