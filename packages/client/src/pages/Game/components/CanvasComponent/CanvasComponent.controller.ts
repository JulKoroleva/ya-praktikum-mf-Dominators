import { FOOD_COUNT, GROW_BY_FOOD_COEFFICIENT, MAP_SIZE } from '@/constants/game';

import {
  CameraModel,
  EnemyStatic,
  MapRegionModel,
  PlayerFeatureModel,
  PlayerModel,
} from './models';

import { STATUS } from './CanvasComponent.interface';

import { GenerateEnemy, GenerateFood, IsCollided } from './utils';
import { EnemyPlayerModel } from './models/EnemyPlayer.model';
import { isCollidedBySquare } from './utils/isCollidedBySquare';
import { TResult } from '../EndGame/EndGame.interface';

export class CanvasController {
  public Map = new MapRegionModel();
  public Camera = new CameraModel();
  public Player = new PlayerModel({ X: 2000, Y: 2000, Radius: 2 });
  public EnemyPlayers = [
    new EnemyPlayerModel({ X: 3000, Y: 3000, Radius: 10, ColorFill: 'red' }),
    new EnemyPlayerModel({ X: 1000, Y: 1000, Radius: 10, ColorFill: 'blue' }),
    new EnemyPlayerModel({ X: 3000, Y: 1000, Radius: 10, ColorFill: 'yellow' }),
    new EnemyPlayerModel({ X: 1000, Y: 3000, Radius: 10, ColorFill: 'yellow' }),
    new EnemyPlayerModel({ X: 2050, Y: 2050, Radius: 10, ColorFill: 'yellow' }),
  ];
  public FoodFields = GenerateFood({
    width: MAP_SIZE,
    height: MAP_SIZE,
  });
  public EnemyFields = GenerateEnemy({ width: MAP_SIZE, height: MAP_SIZE });

  public MovePlayer(mouseX: number, mouseY: number) {
    this.Player.move(this.Camera, mouseX, mouseY);
    this.Player.moveDivision(this.Camera, mouseX, mouseY);
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
    const { Player } = this.Player;
    (() => {
      for (const element of this.EnemyPlayers) {
        if (isCollidedBySquare(element, Player) < Player.getAreaOfCircle() / 3) {
          continue;
        }
        if (Player.Radius <= element.Radius) {
          Player.Status = STATUS.DEAD;
          return;
        }
        Player.Radius += element.Radius / 2;
        Player.Score += 10;
        element.Destroy();
        element.Status = STATUS.DEAD;
      }
    })();

    this.EnemyPlayers = this.EnemyPlayers.filter(el => el.Status != STATUS.DEAD);
  }

  public CollisionFoodDetection() {
    for (const element of this.FoodFields) {
      if (element.Status !== STATUS.ALIVE) {
        continue;
      }
      for (const target of [
        ...this.Player.Divisions,
        /** поедание подкормки статической бактерией врагом */
        ...this.EnemyFields,
        /** поедание ботами */
        ...this.EnemyPlayers,
        this.Player.Player,
      ]) {
        if (!IsCollided(element, target)) {
          continue;
        }
        target.Radius = target.Radius + element.Radius * GROW_BY_FOOD_COEFFICIENT;
        element.Status = STATUS.DEAD;
        if (target instanceof EnemyStatic) {
          target.prepareMove(element.X, element.Y);
        }
        if (target instanceof PlayerFeatureModel) {
          target.Score++;
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

  public DrawAll(ctx: CanvasRenderingContext2D) {
    this.DrawFood(ctx);
    for (const item of [
      ...this.EnemyPlayers,
      ...this.EnemyFields,
      ...this.Player.Divisions,
      this.Player.Player,
    ].sort((a, b) => a.Radius - b.Radius)) {
      if (item.Status === STATUS.ALIVE) {
        item.draw(ctx);
      }
    }
  }

  public DrawFood(ctx: CanvasRenderingContext2D) {
    for (const food of this.FoodFields) {
      if (food.Status === STATUS.ALIVE) {
        food.draw(ctx);
      }
    }
  }

  public get Result(): Array<TResult> {
    const field = [this.Player.Player, ...this.EnemyPlayers].sort((a, b) => b.Radius - a.Radius);
    const topPosition = field.findIndex(player => !(player instanceof EnemyPlayerModel)) + 1;

    return [
      {
        id: 1,
        title: 'Food eating',
        value: FOOD_COUNT - this.FoodFields.length,
      },
      {
        id: 2,
        title: 'Score Points',
        value: this.Player.MyScore,
      },
      {
        id: 3,
        title: 'Cells eating',
        value:
          this.EnemyFields.length -
          this.EnemyFields.filter(({ Status }) => Status === STATUS.ALIVE).length,
      },
      {
        id: 4,
        title: 'Top position',
        value: topPosition,
      },
    ];
  }
}
