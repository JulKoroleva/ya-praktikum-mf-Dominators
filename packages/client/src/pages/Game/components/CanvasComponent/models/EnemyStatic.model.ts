import { ICircle } from '../interfaces/CanvasComponent.interface';
import { drawSpikes } from '../utils/drawVirus';

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
    drawSpikes(ctx, {
      X: this.X,
      Y: this.Y,
      count: 10,
      spikeLength: this.Radius * 0.3,
      baseWidth: this.Radius * 0.2,
      radius: this.Radius,
      fillStyle: 'rgb(0, 180, 0)',
    });

    this.drawCircle(ctx, this.X, this.Y, this.Radius, 'rgb(0, 200, 0)');

    drawSpikes(ctx, {
      X: this.X,
      Y: this.Y,
      count: 6,
      spikeLength: this.Radius * 0.3,
      baseWidth: this.Radius * 0.12,
      radius: this.Radius * 0.6,
      fillStyle: 'rgba(0, 220, 0)',
    });

    drawSpikes(ctx, {
      X: this.X,
      Y: this.Y,
      count: 8,
      spikeLength: this.Radius * 0.2,
      baseWidth: this.Radius * 0.045,
      radius: this.Radius * 0.3,
      fillStyle: 'rgba(0, 255, 0, 0.8)',
    });
  }

  drawCircle(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    fillStyle: string,
  ) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.closePath();
  }
}
