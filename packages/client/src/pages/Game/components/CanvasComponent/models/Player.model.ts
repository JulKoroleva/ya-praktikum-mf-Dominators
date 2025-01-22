import {
  FOOD_MASS,
  GROW_BY_FOOD_COEFFICIENT,
  SPEED_BOOST_COEFFICIENT,
  SPEED_BOOST_PROGRESS_INTERVAL,
  SPEED_BOOST_TIME,
} from '@/constants/game';

import { CameraModel, FoodModel, GameFeatureModel, PlayerFeatureModel } from '.';

import { ICircle } from '../interfaces/CanvasComponent.interface';

import { v4 as uuidv4 } from 'uuid';

export class PlayerModel {
  public id: string = uuidv4();
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
    return Math.round(this.Player.Radius * 10);
  }

  moveDivision(camera: CameraModel, mouseX: number, mouseY: number, deltaTime: number = 1) {
    for (const division of this.Divisions) {
      const dX = mouseX / camera.Scale + camera.X - division.X;
      const dY = mouseY / camera.Scale + camera.Y - division.Y;

      const angle = Math.atan2(dY, dX);

      const speedFactor = deltaTime;

      division.Y += ((Math.sin(angle) * 5) / division.Radius) * speedFactor;
      division.X += ((Math.cos(angle) * 5) / division.Radius) * speedFactor;
    }
  }

  /** движение по нормализованному вектору */
  move(camera: CameraModel, mouseX: number, mouseY: number, deltaTime: number = 1) {
    const dX = mouseX / camera.Scale + camera.X - this.Player.X;
    const dY = mouseY / camera.Scale + camera.Y - this.Player.Y;
    const angle = Math.atan2(dY, dX);

    const speed = this.getPlayerSpeed(this.Player.Radius) * this.SpeedBoostCoefficient;
    const speedFactor = deltaTime * speed;

    this.Player.Y += Math.sin(angle) * speedFactor;
    this.Player.X += Math.cos(angle) * speedFactor;
  }

  getPlayerSpeed(radius: number): number {
    const maxSpeed = 1;
    const minSpeed = 0.5;
    const minR = 1;
    const maxR = 10;

    if (radius <= minR) {
      return maxSpeed;
    } else if (radius >= maxR) {
      return minSpeed;
    }

    return maxSpeed - ((radius - minR) / (maxR - minR)) * (maxSpeed - minSpeed);
  }

  activateSpeedBooster() {
    if (this.BoostProgress < 100) return;
    this.SpeedBoostCoefficient = SPEED_BOOST_COEFFICIENT;

    setTimeout(() => {
      this.SpeedBoostCoefficient = 1;
    }, SPEED_BOOST_TIME);

    this.resestBoostInterval();
  }

  throwFood(
    camera: CameraModel,
    food: Array<GameFeatureModel>,
    mouseX: number,
    mouseY: number,
    deltaTime: number = 1,
  ) {
    if (this.Player.Radius <= 3) {
      return;
    }

    this.Player.Radius -= FOOD_MASS * GROW_BY_FOOD_COEFFICIENT;

    const dX = mouseX / camera.Scale + camera.X - this.Player.X;
    const dY = mouseY / camera.Scale + camera.Y - this.Player.Y;

    const angle = Math.atan2(dY, dX);
    const speedFactor = deltaTime; // Учитываем время между кадрами

    const foode = new FoodModel({
      id: this.Player.id,
      Y: this.Player.Y + (((Math.sin(angle) * this.Player.Radius) / 2) * camera.Scale) / 2,
      X: this.Player.X + (((Math.cos(angle) * this.Player.Radius) / 2) * camera.Scale) / 2,
      ToY:
        this.Player.Y +
        ((Math.sin(angle) * this.Player.Radius) / 2) * camera.Scale * 2 * speedFactor,
      ToX:
        this.Player.X +
        ((Math.cos(angle) * this.Player.Radius) / 2) * camera.Scale * 2 * speedFactor,
      Speed: 1 * speedFactor, // Корректируем скорость
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
