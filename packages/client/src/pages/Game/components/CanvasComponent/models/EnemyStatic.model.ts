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
}
