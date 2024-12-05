import { ICircle } from '../CanvasComponent.interface';

import { GameFeatureModel } from './GameFeature.model';

export class PlayerFeatureModel extends GameFeatureModel {
  public Score = 0;
  constructor(props: ICircle) {
    super(props);
  }
}
