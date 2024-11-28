import { ICircle, STATUS } from '../CanvasComponent.interface';

import { DrawCircle } from '../utils';

const BASE_COLOR = 'black';

export class GameFeatureModel implements ICircle {
  public X = 0;
  public Y = 0;
  public Radius = 10;
  public Status = STATUS.ALIVE;
  public StrokeStyle = BASE_COLOR;
  public ColorFill = BASE_COLOR;
  public LineWidth: number;

  constructor({ X, Y, Radius, StrokeStyle, ColorFill, LineWidth }: ICircle) {
    this.X = X;
    this.Y = Y;
    this.Radius = Radius;
    this.StrokeStyle = StrokeStyle || BASE_COLOR;
    this.ColorFill = ColorFill || BASE_COLOR;
    this.LineWidth = LineWidth || 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    DrawCircle(ctx, {
      ...this,
      lineWidth: 2,
    });
  }
}
