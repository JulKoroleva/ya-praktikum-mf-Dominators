import { ICircle } from '../interfaces/CanvasComponent.interface';

const jellyDamping = 0.18;
const numPoints = 24;
const angleStep = (Math.PI * 2) / numPoints;

const calculateDeformedPoints = (
  radius: number,
  startX: number,
  startY: number,
  deformationX: number,
  deformationY: number,
): { x: number; y: number }[] => {
  const time = 2000;
  const baseDeform = [-deformationX, -deformationY];

  return Array.from({ length: numPoints }, (_, i) => {
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
};

const drawDeformedPath = (ctx: CanvasRenderingContext2D, points: { x: number; y: number }[]) => {
  const numPoints = points.length;
  const prevX = (points[0].x + points[1].x) / 2;
  const prevY = (points[0].y + points[1].y) / 2;

  ctx.moveTo(prevX, prevY);

  for (let i = 1; i < numPoints; i++) {
    const next = (i + 1) % numPoints;
    const cpX = (points[i].x + points[next].x) / 2;
    const cpY = (points[i].y + points[next].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, cpX, cpY);
  }
};

export const DrawCircle = (ctx: CanvasRenderingContext2D, circleDims: ICircle) => {
  const {
    Radius: radius,
    X: startX,
    Y: startY,
    LineWidth = 2,
    ColorFill: colorFill = 'rgb(0, 0, 0)',
    ImageFill = undefined,
    StrokeStyle: strokeStyle = 'rgb(0, 0, 0)',
    DeformationX = 0,
    DeformationY = 0,
  } = circleDims;

  ctx.beginPath();

  let maxRadiusValue = radius;

  if (DeformationX !== 0 || DeformationY !== 0) {
    const points = calculateDeformedPoints(radius, startX, startY, DeformationX, DeformationY);

    maxRadiusValue = Math.max(
      ...points.map(point =>
        Math.sqrt(Math.pow(point.x - startX, 2) + Math.pow(point.y - startY, 2)),
      ),
    );

    drawDeformedPath(ctx, points);
  } else {
    ctx.arc(startX, startY, radius, 0, Math.PI * 2);
  }

  ctx.closePath();

  ctx.save();
  ctx.clip();

  if (ImageFill) {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(
      startX - maxRadiusValue,
      startY - maxRadiusValue,
      maxRadiusValue * 2,
      maxRadiusValue * 2,
    );
    ctx.drawImage(
      ImageFill,
      startX - maxRadiusValue,
      startY - maxRadiusValue,
      maxRadiusValue * 2,
      maxRadiusValue * 2,
    );
  } else {
    ctx.fillStyle = colorFill;
    ctx.fill();
  }

  ctx.restore();

  ctx.strokeStyle = ImageFill ? 'rgb(0, 0, 0)' : strokeStyle;
  ctx.lineWidth = LineWidth;
  ctx.stroke();

  if (circleDims.DeformationX && circleDims.DeformationY) {
    circleDims.DeformationX *= jellyDamping;
    circleDims.DeformationY *= jellyDamping;
  }
};
