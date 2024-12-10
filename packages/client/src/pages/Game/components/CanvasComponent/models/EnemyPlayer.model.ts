import { MAP_SIZE } from '@/constants/game';

import { PlayerFeatureModel } from '.';

import { ICircle } from '../interfaces/CanvasComponent.interface';

export class EnemyPlayerModel extends PlayerFeatureModel {
  protected directionX: DIRECTION = DIRECTION.LEFT;
  protected directionY: DIRECTION = DIRECTION.LEFT;
  protected intervalId?: NodeJS.Timeout;

  constructor(props: ICircle) {
    super(props);
  }

  move() {
    const newX =
      this.X >= MAP_SIZE || this.X <= 0 ? 0 : Math.sin(this.directionX) / Math.sqrt(this.Radius);
    const newY =
      this.Y >= MAP_SIZE || this.Y <= 0 ? 0 : Math.sin(this.directionY) / Math.sqrt(this.Radius);

    this.Y += newY;
    this.X += newX;
  }

  Init = () => {
    this.intervalId = setInterval(() => {
      this.directionX = Math.random() < 0.5 ? DIRECTION.LEFT : DIRECTION.RIGHT;
      this.directionY = Math.random() < 0.5 ? DIRECTION.LEFT : DIRECTION.RIGHT;
    }, 1000);
  };

  Destroy = () => {
    clearInterval(this.intervalId);
  };
}

enum DIRECTION {
  RIGHT = 1,
  LEFT = -1,
}
