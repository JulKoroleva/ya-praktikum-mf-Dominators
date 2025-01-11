import { ICoords } from '../interfaces/CanvasComponent.interface';
import { GameFeatureModel, MapRegionModel } from '.';

export class CameraModel implements ICoords {
  public X = 0;
  public Y = 0;
  public Scale = 1;
  public ViewWidth: number;
  public ViewHeight: number;

  /**
   * @params initialX используем если сразу хотим сдвинуть камеру по X
   * @params initialY используем если сразу хотим сдвинуть камеру по Y
   */
  constructor(initialX?: number, initialY?: number) {
    this.X = initialX || 0;
    this.Y = initialY || 0;
    this.ViewWidth = window.innerWidth / this.Scale;
    this.ViewHeight = window.innerHeight / this.Scale;
  }

  /**
   * Центрирование камеры на игроке
   */
  focus(canvas: HTMLCanvasElement, map: MapRegionModel, player: GameFeatureModel) {
    const canvasWidth = canvas.width / this.Scale;
    const canvasHeight = canvas.height / this.Scale;

    this.X = this.clamp(player.X - canvasWidth / 2, 0, map.Width - canvasWidth);
    this.Y = this.clamp(player.Y - canvasHeight / 2, 0, map.Height - canvasHeight);
  }

  /**
   * Ограничение движения камеры в пределах карты
   */
  clamp(coord: number, min: number, max: number) {
    if (coord < min) {
      return min;
    }
    if (coord > max) {
      return max;
    }
    return coord;
  }

  /**
   * Метод для обновления размеров камеры при изменении масштаба
   */
  updateViewSize() {
    this.ViewWidth = window.innerWidth / this.Scale;
    this.ViewHeight = window.innerHeight / this.Scale;
  }
}
