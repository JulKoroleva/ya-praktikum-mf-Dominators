import { ICircle, STATUS } from '../CanvasComponent.interface';

import { DrawCircle } from '../utils';

const BASE_COLOR = 'black';

export class GameFeatureModel implements ICircle {
  //#region static & dinamic
  public X = 0;
  public Y = 0;
  public Radius = 10;
  public Status = STATUS.ALIVE;
  public StrokeStyle = BASE_COLOR;
  public ColorFill = BASE_COLOR;
  public LineWidth: number;
  //#endregion

  //#region dinamic
  public ToX = 0;
  public ToY = 0;
  public Speed = 1;
  public Movable = false;
  public Angle = 0;
  //#endregion

  constructor({ X, Y, Radius, StrokeStyle, ColorFill, LineWidth }: ICircle) {
    this.X = X;
    this.Y = Y;
    this.Radius = Radius;
    this.StrokeStyle = StrokeStyle || BASE_COLOR;
    this.ColorFill = ColorFill || BASE_COLOR;
    this.LineWidth = LineWidth || 2;
  }

  getAreaOfCircle() {
    return Math.PI * Math.pow(this.Radius, 2);
  }

  move() {
    if (!this.Movable || this.Status !== STATUS.ALIVE) {
      return;
    }
    const xDirection = Math.cos(this.Angle) > 0 ? 1 : -1;
    const yDirection = Math.sin(this.Angle) > 0 ? 1 : -1;

    /** цель достигнута */
    if ((this.X - this.ToX) * xDirection > 0 && (this.Y - this.ToY) * yDirection > 0) {
      this.Movable = false;
      return;
    }

    this.Y += Math.sin(this.Angle) * this.Speed;
    this.X += Math.cos(this.Angle) * this.Speed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    DrawCircle(ctx, {
      ...this,
      lineWidth: 2,
    });
  }
}
