import { MIN_SPEED, SPEED_COEFFICIENT } from '@/constants/game';

import { CameraModel, GameFeatureModel } from '.';

import { ICircle } from '../CanvasComponent.interface';

export class PlayerModel extends GameFeatureModel {
  constructor(props: ICircle) {
    super(props);
  }

  move(camera: CameraModel, mouseX: number, mouseY: number) {
    const speed = Math.max(SPEED_COEFFICIENT + this.Radius / 2, MIN_SPEED);
    const newX = (mouseX + camera.X - this.X) / speed;
    const newY = (mouseY + camera.Y - this.Y) / speed;
    this.Y += newY;
    this.X += newX;
  }
}
