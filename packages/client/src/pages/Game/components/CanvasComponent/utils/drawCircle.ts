import { ICircle } from '../interfaces/CanvasComponent.interface';

const jellyDamping = 0.18;
const numPoints = 34;
const angleStep = (Math.PI * 2) / numPoints;

export const DrawCircle = (ctx: CanvasRenderingContext2D, circleDims: ICircle) => {
  const {
    Radius: radius,
    X: startX,
    Y: startY,
    LineWidth = 2,
    ColorFill: colorFill = 'black',
    StrokeStyle: strokeStyle = 'black',
    DeformationX = 0,
    DeformationY = 0,
  } = circleDims;

  if (DeformationX !== 0 || DeformationY !== 0) {
    const time = Date.now() / 100;
    const baseDeform = [-DeformationX, -DeformationY];

    const points = Array.from({ length: numPoints }, (_, i) => {
      const angle = i * angleStep;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const deformation = cosA * baseDeform[0] + sinA * baseDeform[1];
      const waveEffect = Math.sin(time + angle * 7) * deformation * 0.3;
      const spreadEffect = sinA * deformation * 0.2;
      const pointRadius = Math.max(
        radius * 0.8,
        Math.min(radius * 1.3, radius + deformation + waveEffect + spreadEffect),
      );

      return {
        x: startX + cosA * pointRadius,
        y: startY + sinA * pointRadius,
      };
    });

    ctx.beginPath();
    const prevX = (points[0].x + points[1].x) / 2;
    const prevY = (points[0].y + points[1].y) / 2;
    ctx.moveTo(prevX, prevY);

    for (let i = 1; i < numPoints; i++) {
      const next = (i + 1) % numPoints;
      const cpX = (points[i].x + points[next].x) / 2;
      const cpY = (points[i].y + points[next].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, cpX, cpY);
    }

    ctx.closePath();
  } else {
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    ctx.closePath();
  }

  ctx.fillStyle = colorFill;
  ctx.fill();

  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = LineWidth;
  ctx.stroke();

  if (circleDims.DeformationX && circleDims.DeformationY) {
    circleDims.DeformationX *= jellyDamping;
    circleDims.DeformationY *= jellyDamping;
  }
};
