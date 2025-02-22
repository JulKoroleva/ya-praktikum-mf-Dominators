import { ICircle, STATUS } from '../interfaces/CanvasComponent.interface';

import { DrawCircle } from '../utils';

export class GameFeatureModel implements ICircle {
  //#region static & dynamic
  public id: string;
  public X = 0;
  public Y = 0;
  public Radius = 10;
  public Status = STATUS.ALIVE;
  public ColorFill = '';
  public ImageFill;
  public StrokeStyle = '';
  public LineWidth;
  //#endregion

  //#region dynamic
  public ToX = 0;
  public ToY = 0;
  public Speed: number;
  public Movable = false;
  public Angle = 0;
  public DeformationX = 0;
  public DeformationY = 0;
  //#endregion

  constructor({ id, X, Y, Radius, ColorFill, LineWidth, ImageFill, Speed }: ICircle) {
    this.id = id;
    this.X = X;
    this.Y = Y;
    this.Speed = Speed;
    this.Radius = Radius;
    this.ColorFill = ColorFill || 'rgb(0, 0, 0)';
    this.ImageFill = ImageFill;
    this.StrokeStyle = this.calculateDarkerColor(this.ColorFill, 0.8);
    this.LineWidth = LineWidth || 0;
  }

  private calculateDarkerColor(rgb: string, factor: number): string {
    const match = rgb.match(/\d+/g);
    if (!match || match.length < 3) return rgb;

    const [r, g, b] = match.map(Number);
    return `rgb(${Math.floor(r * factor)}, ${Math.floor(g * factor)}, ${Math.floor(b * factor)})`;
  }

  getAreaOfCircle() {
    return Math.PI * Math.pow(this.Radius, 2);
  }

  move() {
    if (!this.Speed || !this.Movable || this.Status !== STATUS.ALIVE) {
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
      id: this.id,
      Radius: this.Radius,
      X: this.X,
      Y: this.Y,
      StrokeStyle: this.StrokeStyle,
      ColorFill: this.ColorFill,
      ImageFill: this.ImageFill,
      LineWidth: this.Radius / 5,
      DeformationX: this.DeformationX,
      DeformationY: this.DeformationY,
      Speed: this.Speed,
    });
    const recoveryRate = 0.1;
    if (Math.abs(this.DeformationX) > 0.1) {
      this.DeformationX *= 1 - recoveryRate;
    } else {
      this.DeformationX = 0;
    }

    if (Math.abs(this.DeformationY) > 0.1) {
      this.DeformationY *= 1 - recoveryRate;
    } else {
      this.DeformationY = 0;
    }
  }
}
