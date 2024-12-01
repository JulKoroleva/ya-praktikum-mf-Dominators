import { ICoords } from '../CanvasComponent.interface';

import { GameFeatureModel, MapRegionModel } from '.';

export class CameraModel implements ICoords {
  public X = 0;
  public Y = 0;
  public Scale = 1;

  /**
   * @params initialX используем если сразу хотим сдвинуть камеру по X
   * @params initialY используем если сразу хотим сдвинуть камеру по Y
   * */
  constructor(initialX?: number, initialY?: number) {
    this.X = initialX || 0;
    this.Y = initialY || 0;
  }

  focus(
    { width: canvasWidth, height: canvasHeight }: HTMLCanvasElement,
    { Width: mapWidth, Height: mapHeight }: MapRegionModel,
    { X: playerX, Y: playerY }: GameFeatureModel,
  ) {
    this.X = this.clamp(playerX - canvasWidth / this.Scale / 2, 0, mapWidth - canvasWidth);
    this.Y = this.clamp(playerY - canvasHeight / this.Scale / 2, 0, mapHeight - canvasHeight);
  }

  clamp(coord: number, min: number, max: number) {
    if (coord < min) {
      return min;
    }
    if (coord > max) {
      return max;
    }
    return coord;
  }
}
