import { ICircle } from '../interfaces/CanvasComponent.interface';

import { GameFeatureModel } from './GameFeature.model';

export class FoodModel extends GameFeatureModel {
  public ToX = 0;
  public ToY = 0;
  public Speed = 0;
  public Movable = true;
  public Angle = 0;

  constructor(props: ICircle & { ToX?: number; ToY?: number; Speed?: number }) {
    super(props);
    this.ToX = props.ToX || 0;
    this.ToY = props.ToY || 0;
    this.Speed = props.Speed || 0;
    this.Movable = (this.ToX > 0 || this.ToY > 0) && this.Speed > 0;

    const dX = this.ToX - this.X;
    const dY = this.ToY - this.Y;

    this.Angle = Math.atan2(dY, dX);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.X, this.Y, this.Radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = this.ColorFill;
    ctx.fill();
  }
}
