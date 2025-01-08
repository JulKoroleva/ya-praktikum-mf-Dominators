import {
  FOOD_MASS,
  GROW_BY_FOOD_COEFFICIENT,
  SPEED_BOOST_COEFFICIENT,
  SPEED_BOOST_PROGRESS_INTERVAL,
  SPEED_BOOST_TIME,
} from '@/constants/game';

import { CameraModel, FoodModel, GameFeatureModel, PlayerFeatureModel } from '.';

import { ICircle } from '../interfaces/CanvasComponent.interface';

export class PlayerModel {
  public Player: PlayerFeatureModel;
  public Speed = 0;
  public SpeedBoostLastTime = 0;
  public SpeedBoostCoefficient = 1;
  public Way: { x: number; y: number } = { x: 0, y: 0 };
  public Divisions: PlayerFeatureModel[] = [];

  constructor(props: ICircle) {
    this.Player = new PlayerFeatureModel(props);
    this.Way.x = props.X;
    this.Way.y = props.Y;
    this.resestBoostInterval();
  }

  public get MyScore() {
    return this.Player.Score;
  }

  moveDivision(camera: CameraModel, mouseX: number, mouseY: number) {
    for (const division of this.Divisions) {
      const dX = mouseX / camera.Scale + camera.X - division.X;
      const dY = mouseY / camera.Scale + camera.Y - division.Y;

      const angle = Math.atan2(dY, dX);

      division.Y += (Math.sin(angle) * 5) / division.Radius;
      division.X += (Math.cos(angle) * 5) / division.Radius;
    }
  }

  /** движение по нормализованному вектору */
  move(camera: CameraModel, mouseX: number, mouseY: number) {
    const dX = mouseX / camera.Scale + camera.X - this.Player.X;
    const dY = mouseY / camera.Scale + camera.Y - this.Player.Y;

    const angle = Math.atan2(dY, dX);

    this.Player.Y +=
      ((Math.sin(angle) * 1) / Math.sqrt(this.Player.Radius)) * this.SpeedBoostCoefficient;
    this.Player.X +=
      ((Math.cos(angle) * 1) / Math.sqrt(this.Player.Radius)) * this.SpeedBoostCoefficient;
  }

  activateSpeedBooster() {
    if (this.BoostProgress < 100) {
      return;
    }
    this.SpeedBoostCoefficient = SPEED_BOOST_COEFFICIENT;
    setTimeout(() => {
      this.SpeedBoostCoefficient = 1;
    }, SPEED_BOOST_TIME);
    this.resestBoostInterval();
  }

  throwFood(camera: CameraModel, food: Array<GameFeatureModel>, mouseX: number, mouseY: number) {
    if (this.Player.Radius <= 3) {
      return;
    }

    this.Player.Radius -= FOOD_MASS * GROW_BY_FOOD_COEFFICIENT;

    const dX = mouseX / camera.Scale + camera.X - this.Player.X;
    const dY = mouseY / camera.Scale + camera.Y - this.Player.Y;

    const angle = Math.atan2(dY, dX);

    const foode = new FoodModel({
      /** тут делиться на 4, пока рандомно. Надо додумать коэффициент */
      Y: this.Player.Y + (((Math.sin(angle) * this.Player.Radius) / 2) * camera.Scale) / 2,
      X: this.Player.X + (((Math.cos(angle) * this.Player.Radius) / 2) * camera.Scale) / 2,
      ToY: this.Player.Y + ((Math.sin(angle) * this.Player.Radius) / 2) * camera.Scale * 2,
      ToX: this.Player.X + ((Math.cos(angle) * this.Player.Radius) / 2) * camera.Scale * 2,
      Speed: 1,
      Radius: FOOD_MASS,
      ColorFill: 'black',
    });

    food.push(foode);
  }

  resestBoostInterval() {
    this.SpeedBoostLastTime = new Date().getTime();
  }

  public get BoostProgress() {
    return ((new Date().getTime() - this.SpeedBoostLastTime) / SPEED_BOOST_PROGRESS_INTERVAL) * 100;
  }
}
