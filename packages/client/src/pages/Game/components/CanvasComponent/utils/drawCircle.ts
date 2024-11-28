import { ICircle } from '../CanvasComponent.interface';

export const DrawCircle = (ctx: CanvasRenderingContext2D, circleDims: ICircle) => {
  const {
    Radius: radius,
    X: startX,
    Y: startY,
    LineWidth = 2,
    StrokeStyle: strokeStyle,
    ColorFill: colorFill = 'black',
  } = circleDims;

  if (strokeStyle) {
    ctx.lineWidth = LineWidth;
    ctx.strokeStyle = strokeStyle;
  }

  ctx.beginPath();
  ctx.arc(startX, startY, radius, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.closePath();
  ctx.fillStyle = colorFill;
  ctx.fill();
};
