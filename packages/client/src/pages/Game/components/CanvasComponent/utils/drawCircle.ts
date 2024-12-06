import { ICircle } from '../CanvasComponent.interface';

export const DrawCircle = (
  ctx: CanvasRenderingContext2D,
  circleDims: ICircle & { DeformationX?: number; DeformationY?: number },
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

  const radiusX = Math.max(1, radius + DeformationX);
  const radiusY = Math.max(1, radius + DeformationY);

  if (strokeStyle) {
    ctx.lineWidth = LineWidth;
    ctx.strokeStyle = strokeStyle;
  }

  ctx.beginPath();
  ctx.ellipse(startX, startY, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
  ctx.fillStyle = colorFill;
  ctx.fill();
};
