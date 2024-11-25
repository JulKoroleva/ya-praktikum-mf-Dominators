import { MAP_SIZE } from '@/constants/game';

import { CameraModel, MapRegionModel, PlayerModel } from './models';

import { STATUS } from './CanvasComponent.interface';

import { GenerateEnemy, GenerateFood, IsCollided } from './utils';

export class CanvasController {
  public Map = new MapRegionModel();
  public Camera = new CameraModel();
  public Player = new PlayerModel({ X: 2000, Y: 2000, Radius: 10 });
  public FoodFields = GenerateFood({ width: MAP_SIZE, height: MAP_SIZE });
  public EnemyFields = GenerateEnemy({ width: MAP_SIZE, height: MAP_SIZE });

  public MovePlayer(mouseX: number, mouseY: number) {
    this.Player.move(this.Camera, mouseX, mouseY);
  }

  public CollisionDetection() {
    for (const element of this.FoodFields) {
      if (element.Status === STATUS.ALIVE) {
        if (IsCollided(element, this.Player)) {
          this.Player.Radius = this.Player.Radius + element.Radius / 2;
          element.Status = STATUS.DEAD;
        }
      }
    }
  }

  public collisionEnemyDetection() {
    for (const element of this.EnemyFields) {
      if (IsCollided(element, this.Player)) {
        if (this.Player.Radius <= element.Radius) {
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
