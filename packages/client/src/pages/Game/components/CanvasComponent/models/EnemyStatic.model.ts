import { ICircle } from '../CanvasComponent.interface';

import { GameFeatureModel } from './GameFeature.model';

export class EnemyStatic extends GameFeatureModel {
  public ToX = 0;
  public ToY = 0;
  public Speed = 1;
  public Movable = false;
  public Angle = 0;

  constructor(props: ICircle) {
    super(props);
  }

  prepareMove(x: number, y: number) {
    this.Movable = true;

    const dX = this.X - x;
    const dY = this.Y - y;

    this.Angle = Math.atan2(dY, dX);

    this.ToX = this.X + Math.cos(this.Angle) * 20;
    this.ToY = this.Y + Math.sin(this.Angle) * 20;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Наружные шипы
    const spikeCount = 10;
    const spikeLength = this.Radius * 0.3;
    const baseWidth = this.Radius * 0.2;
    for (let i = 0; i < spikeCount; i++) {
      const angle = (i / spikeCount) * Math.PI * 2;

      const xTip = this.X + Math.cos(angle) * (this.Radius + spikeLength);
      const yTip = this.Y + Math.sin(angle) * (this.Radius + spikeLength);

      const perpAngle = angle + Math.PI / 2;

      const xBase1 = this.X + Math.cos(angle) * this.Radius + Math.cos(perpAngle) * baseWidth;
      const yBase1 = this.Y + Math.sin(angle) * this.Radius + Math.sin(perpAngle) * baseWidth;

      const xBase2 = this.X + Math.cos(angle) * this.Radius - Math.cos(perpAngle) * baseWidth;
      const yBase2 = this.Y + Math.sin(angle) * this.Radius - Math.sin(perpAngle) * baseWidth;

      ctx.beginPath();
      ctx.moveTo(xBase1, yBase1);
      ctx.lineTo(xTip, yTip);
      ctx.lineTo(xBase2, yBase2);
      ctx.closePath();
      ctx.fillStyle = 'rgb(0, 180, 0)';
      ctx.fill();
    }

    // Основной круг
    ctx.beginPath();
    ctx.arc(this.X, this.Y, this.Radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgb(0, 200, 0)';
    ctx.fill();
    ctx.closePath();

    // Внутренние шипы
    const innerSpikeCount = 6;
    const innerRadius = this.Radius * 0.5;
    const innerSpikeLength = this.Radius * 0.3;
    const innerBaseWidth = innerRadius * 0.2;
    for (let i = 0; i < innerSpikeCount; i++) {
      const angle = (i / innerSpikeCount) * Math.PI * 2;

      const xTip = this.X + Math.cos(angle) * (innerRadius + innerSpikeLength);
      const yTip = this.Y + Math.sin(angle) * (innerRadius + innerSpikeLength);

      const perpAngle = angle + Math.PI / 2;

      const xBase1 = this.X + Math.cos(angle) * innerRadius + Math.cos(perpAngle) * innerBaseWidth;
      const yBase1 = this.Y + Math.sin(angle) * innerRadius + Math.sin(perpAngle) * innerBaseWidth;

      const xBase2 = this.X + Math.cos(angle) * innerRadius - Math.cos(perpAngle) * innerBaseWidth;
      const yBase2 = this.Y + Math.sin(angle) * innerRadius - Math.sin(perpAngle) * innerBaseWidth;

      ctx.beginPath();
      ctx.moveTo(xBase1, yBase1);
      ctx.lineTo(xTip, yTip);
      ctx.lineTo(xBase2, yBase2);
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 220, 0)';
      ctx.fill();
    }
  }
}
