import { ICircle } from '../interfaces/CanvasComponent.interface';

import { GameFeatureModel } from './GameFeature.model';

export class PlayerFeatureModel extends GameFeatureModel {
  public Score = 0;
  public isColliding: boolean = false;
  public collisionTime: number = 0;
  constructor(props: ICircle) {
    super(props);
  }
}
