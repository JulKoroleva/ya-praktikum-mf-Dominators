import { FOOD_MASS, GROW_BY_FOOD_COEFFICIENT, MAX_DIVISIONS } from '@/constants/game';

import { CameraModel, FoodModel, GameFeatureModel, PlayerFeatureModel } from '.';

import { ICircle } from '../CanvasComponent.interface';

export class PlayerModel {
  public Player: PlayerFeatureModel;
  public Speed: number = 0;
  public Way: { x: number; y: number } = { x: 0, y: 0 };
  public Player2: GameFeatureModel;
  // @TODO
  // думаю что в итоге будут Divisions, а плеер будет условно камерой
  // и центр можно исходить от них
  public Divisions: PlayerFeatureModel[] = [];

  constructor(props: ICircle) {
    this.Player = new PlayerFeatureModel(props);
    this.Way.x = props.X;
    this.Way.y = props.Y;
    this.Player2 = new GameFeatureModel({ ...props, ColorFill: 'red' });
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

    // this.Divisions.forEach((division1, index1) => {
    //   const { newX: x1, newY: y1, Radius: r1 } = division1;
    //   this.Divisions.forEach((division2, index2) => {
    //     const { newX: x2, newY: y2, Radius: r2 } = division2;
    //     if (index1 !== index2) {
    //       const delta = sub(x1, y1, x2, y2);
    //       // детект столкновения!
    //       if (getLength(...delta) < r1 + r2) {
    //         const pan = mul(...getUnit(...delta), r1 + r2);
    //         division2.X += pan[0];
    //         division2.Y += pan[1];
    //       }
    //     }
    //   });
    // });
  }

  /** движение по нормализованному вектору */
  move(camera: CameraModel, mouseX: number, mouseY: number) {
    const dX = mouseX / camera.Scale + camera.X - this.Player.X;
    const dY = mouseY / camera.Scale + camera.Y - this.Player.Y;

    const angle = Math.atan2(dY, dX);

    this.Player.Y += (Math.sin(angle) * 1) / Math.sqrt(this.Player.Radius);
    this.Player.X += (Math.cos(angle) * 1) / Math.sqrt(this.Player.Radius);
  }

  cellDivision(camera: CameraModel, mouseX: number, mouseY: number) {
    if (this.Divisions.length >= MAX_DIVISIONS) {
      return;
    }

    this.Player.Radius /= 2;

    // @TODO MAX_COUNT + MIN_SIZE
    this.Divisions.push(
      new PlayerFeatureModel({
        Y:
          this.Player.Y +
          ((mouseY / camera.Scale + camera.Y - this.Player.Y) * 4) / this.Player.Radius,
        X:
          this.Player.X +
          ((mouseX / camera.Scale + camera.X - this.Player.X) * 4) / this.Player.Radius,
        Radius: this.Player.Radius,
        ColorFill: 'red',
      }),
    );
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
      // @TODO тут делиться на 4, пока рандомно. Надо додумать коэффициент
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
}

// function sub(x1: number, y1: number, x2: number, y2: number): [number, number] {
//   return [x1 - x2, y1 - y2];
// }

// function getLength(x: number, y: number): number {
//   return Math.sqrt(x * x + y * y);
// }

// // function getUnit(x: number, y: number): [number, number] {
// //   return mul(x, y, 1 / getLength(x, y));
// // }

// function mul(x: number, y: number, s: number): [number, number] {
//   return [x * s, y * s];
// }
