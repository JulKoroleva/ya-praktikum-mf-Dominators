import { ICircle, STATUS } from '../CanvasComponent.interface';

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
