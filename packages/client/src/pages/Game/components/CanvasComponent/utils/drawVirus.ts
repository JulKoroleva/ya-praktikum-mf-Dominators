import { SpikeOptions } from '../interfaces/EnemyStaticOptions.interface';

export function drawSpikes(ctx: CanvasRenderingContext2D, options: SpikeOptions): void {
  const { X, Y, count, spikeLength, baseWidth, radius, fillStyle } = options;

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;

    const xTip = X + Math.cos(angle) * (radius + spikeLength);
    const yTip = Y + Math.sin(angle) * (radius + spikeLength);

    const perpAngle = angle + Math.PI / 2;

    const xBase1 = X + Math.cos(angle) * radius + Math.cos(perpAngle) * baseWidth;
    const yBase1 = Y + Math.sin(angle) * radius + Math.sin(perpAngle) * baseWidth;

    const xBase2 = X + Math.cos(angle) * radius - Math.cos(perpAngle) * baseWidth;
    const yBase2 = Y + Math.sin(angle) * radius - Math.sin(perpAngle) * baseWidth;

    ctx.beginPath();
    ctx.moveTo(xBase1, yBase1);
    ctx.lineTo(xTip, yTip);
    ctx.lineTo(xBase2, yBase2);
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
}
