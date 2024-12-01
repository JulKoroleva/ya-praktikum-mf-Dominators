import { ICircle, STATUS } from '../CanvasComponent.interface';

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
}
