import { GROW_BY_FOOD_COEFFICIENT, MAP_SIZE } from '@/constants/game';

import { CameraModel, EnemyStatic, FoodModel, MapRegionModel, PlayerModel } from './models';

import { STATUS } from './CanvasComponent.interface';

import { GenerateEnemy, GenerateFood, IsCollided } from './utils';
import { EnemyPlayerModel } from './models/EnemyPlayer.model';

export class CanvasController {
  public Map = new MapRegionModel();
  public Camera = new CameraModel();
  public Player = new PlayerModel({ X: 2000, Y: 2000, Radius: 2 });
  public EnemyPlayers = [
    new EnemyPlayerModel({ X: 2050, Y: 2050, Radius: 3, ColorFill: 'red' }),
    new EnemyPlayerModel({ X: 1950, Y: 1950, Radius: 3, ColorFill: 'blue' }),
    new EnemyPlayerModel({ X: 222, Y: 222, Radius: 3, ColorFill: 'yellow' }),
  ];
  public FoodFields = GenerateFood({
    width: MAP_SIZE,
    height: MAP_SIZE,
  });
  public EnemyFields = GenerateEnemy({ width: MAP_SIZE, height: MAP_SIZE });

  public MovePlayer(mouseX: number, mouseY: number) {
    this.Player.move(this.Camera, mouseX, mouseY);
    this.Player.move2(this.Camera, mouseX, mouseY);
  }

  public MoveStatics() {
    for (const staticField of [...this.FoodFields, ...this.EnemyFields].filter(
      field => field.Movable,
    )) {
      staticField.move();
    }
  }

  public EnemyPlayersMove() {
    for (const enemys of this.EnemyPlayers) {
      enemys.move();
    }
  }

  public CollisionDetection() {
    (() => {
      for (const element of this.EnemyPlayers) {
        if (IsCollided(element, this.Player.Player)) {
          if (this.Player.Player.Radius <= element.Radius) {
            console.log('LOSE');
            /** @TODO game over */
            return;
          }
          this.Player.Player.Radius += element.Radius / 2;
          element.Destroy();
          element.Status = STATUS.DEAD;
          return;
        }
      }
    })();

    this.EnemyPlayers = this.EnemyPlayers.filter(el => el.Status != STATUS.DEAD);
  }

  public CollisionFoodDetection() {
    for (const element of this.FoodFields) {
      if (element.Status === STATUS.ALIVE) {
        for (const target of [
          ...this.Player.Divisions,
          /** поедание подкормки статической бактерией врагом */
          ...this.EnemyFields,
          /** поедание ботами */
          ...this.EnemyPlayers,
          /** поедание игроком */
          this.Player.Player,
        ]) {
          if (IsCollided(element, target)) {
            target.Radius = target.Radius + element.Radius * GROW_BY_FOOD_COEFFICIENT;
            element.Status = STATUS.DEAD;
            if (target instanceof EnemyStatic) {
              target.prepareMove(element.X, element.Y);
            }
          }
        }
      }
    }
  }

  public CollisionEnemyDetection() {
    for (const element of this.EnemyFields) {
      if (IsCollided(element, this.Player.Player)) {
        if (this.Player.Player.Radius <= element.Radius) {
          /** @TODO там как-то разлетается он вроде */
          return;
        }
      }
    }
  }

  public DrawFood(ctx: CanvasRenderingContext2D) {
    for (const element of this.FoodFields) {
      if (element.Status === STATUS.ALIVE) {
        element.draw(ctx);
      }
    }
  }

  public DrawEnemy(ctx: CanvasRenderingContext2D) {
    for (const element of this.EnemyFields) {
      if (element.Status === STATUS.ALIVE) {
        element.draw(ctx);
      }
    }
  }
}
