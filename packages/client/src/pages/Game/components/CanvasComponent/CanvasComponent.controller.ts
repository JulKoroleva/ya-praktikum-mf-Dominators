import {
  FOOD_COUNT,
  GROW_BY_FOOD_COEFFICIENT,
  MAP_SIZE,
  START_PLAYER_RADIUS,
} from '@/constants/game';

import {
  CameraModel,
  EnemyStatic,
  GameFeatureModel,
  MapRegionModel,
  PlayerFeatureModel,
  PlayerModel,
} from './models';

import { STATUS } from './interfaces/CanvasComponent.interface';

import { GenerateEnemy, GenerateFood, IsCollided } from './utils';
import { EnemyPlayerModel } from './models/EnemyPlayer.model';
import { isCollidedBySquare } from './utils/isCollidedBySquare';
import { TResult } from '../../Game.interface';
import { animateAbsorption } from './utils/animateAbsorption';
import { generateRandomEnemies } from './utils/generateRandomEnemies';
import { v4 as uuidv4 } from 'uuid';

export class CanvasController {
  public Map = new MapRegionModel();

  public Camera = new CameraModel();

  public Player;

  public EnemyPlayers;

  public FoodFields = GenerateFood({
    width: MAP_SIZE,
    height: MAP_SIZE,
  });

  public EnemyFields: EnemyStatic[] = [...GenerateEnemy({ width: MAP_SIZE, height: MAP_SIZE })];

  constructor(baseColor: string, imageFill?: HTMLImageElement) {
    this.Player = new PlayerModel({
      id: uuidv4(),
      X: 2000,
      Y: 2000,
      Radius: START_PLAYER_RADIUS,
      ColorFill: baseColor,
      ImageFill: imageFill,
      Speed: 1,
    });
    this.EnemyPlayers = generateRandomEnemies(150, this.Player.Player.X, this.Player.Player.Y);
  }

  public MovePlayer(mouseX: number, mouseY: number) {
    this.Player.move(this.Camera, mouseX, mouseY);
    this.Player.moveDivision(this.Camera, mouseX, mouseY);
  }

  public EnemyPlayersMove() {
    for (const enemy of this.EnemyPlayers) {
      enemy.move(this.Player.Player, this.FoodFields, this.EnemyPlayers);
    }
  }

  public CollisionDetection() {
    const { Player } = this.Player;
    const playerArea = Player.getAreaOfCircle();
    const playerRadius = Player.Radius;
    const playerX = Player.X;
    const playerY = Player.Y;

    this.CollisionEnemyToEnemyDetection();
    this.EnemyPlayers = this.filterDeadEnemies();

    for (const element of this.EnemyPlayers) {
      if (!this.isVisible(element, this.getViewBoundary())) {
        continue;
      }

      const collisionData = this.calculateCollisionData(element, playerX, playerY, playerRadius);
      if (!this.shouldProcessCollision(collisionData, playerArea, element, Player)) {
        continue;
      }
      this.resolveCollision(element, Player, collisionData, playerRadius);
    }

    this.AddFoodOverTime();
    this.AddEnemyOverTime();
  }

  private isVisible(
    item: GameFeatureModel,
    viewBoundary: { x: number; y: number; width: number; height: number },
  ) {
    return !(
      item.X + item.Radius < viewBoundary.x ||
      item.X - item.Radius > viewBoundary.x + viewBoundary.width ||
      item.Y + item.Radius < viewBoundary.y ||
      item.Y - item.Radius > viewBoundary.y + viewBoundary.height
    );
  }

  private getViewBoundary() {
    return {
      x: this.Camera.X - this.Camera.ViewWidth / 2,
      y: this.Camera.Y - this.Camera.ViewHeight / 2,
      width: this.Camera.ViewWidth,
      height: this.Camera.ViewHeight,
    };
  }

  filterDeadEnemies() {
    return this.EnemyPlayers.filter(el => el.Status !== STATUS.DEAD);
  }

  isStaticEnemy(enemy: EnemyPlayerModel) {
    return enemy instanceof EnemyStatic;
  }

  calculateCollisionData(
    element: EnemyPlayerModel,
    playerX: number,
    playerY: number,
    playerRadius: number,
  ) {
    const dx = element.X - playerX;
    const dy = element.Y - playerY;
    const distSq = dx * dx + dy * dy;
    const sumRadius = element.Radius + playerRadius;
    const sumRadiusSq = sumRadius * sumRadius;

    return { dx, dy, distSq, sumRadius, sumRadiusSq };
  }

  shouldProcessCollision(
    collisionData: {
      dx?: number;
      dy?: number;
      distSq: number;
      sumRadius?: number;
      sumRadiusSq: number;
    },
    playerArea: number,
    element: GameFeatureModel,
    Player: GameFeatureModel,
  ) {
    const { distSq, sumRadiusSq } = collisionData;

    if (distSq > sumRadiusSq) {
      return false;
    }

    if (isCollidedBySquare(element, Player) < playerArea / 3) {
      return false;
    }

    if (!IsCollided(element, Player)) {
      return false;
    }

    return true;
  }

  resolveCollision(
    element: EnemyPlayerModel,
    Player: PlayerFeatureModel,
    collisionData: {
      dx: number;
      dy: number;
      distSq: number;
      sumRadius: number;
      sumRadiusSq?: number;
    },
    playerRadius: number,
  ) {
    const { dx, dy, distSq, sumRadius } = collisionData;

    const distance = Math.sqrt(distSq);
    const overlap = sumRadius - distance;

    if (Math.abs(playerRadius - element.Radius) < 0.01) {
      return;
    }

    if (distance < sumRadius) {
      this.handleDeformation(element, Player, dx, dy, sumRadius, distance);
    }

    if (overlap > 0) {
      this.handleOverlap(element, Player, dx, dy, overlap);
    }

    if (overlap >= element.Radius * 0.8) {
      this.handleAbsorption(element, Player, playerRadius);
    }
  }

  handleDeformation(
    element: { DeformationX: number; DeformationY: number; X: number; Y: number; Radius: number },
    Player: { DeformationX: number; DeformationY: number },
    dx: number,
    dy: number,
    sumRadius: number,
    distance: number,
  ) {
    const angle = Math.atan2(dy, dx);
    const deformationAmount = (sumRadius - distance) * 0.5;

    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    Player.DeformationX -= cosA * deformationAmount;
    Player.DeformationY -= sinA * deformationAmount;

    const waveSpread = Math.sin(angle * 3) * deformationAmount * 0.4;
    const angleOffset = angle + Math.PI / 4;
    const cosAO = Math.cos(angleOffset);
    const sinAO = Math.sin(angleOffset);

    Player.DeformationX += cosAO * waveSpread;
    Player.DeformationY += sinAO * waveSpread;

    element.DeformationX += cosA * deformationAmount * 0.5;
    element.DeformationY += sinA * deformationAmount * 0.5;
  }

  handleOverlap(
    element: { DeformationX: number; DeformationY: number },
    Player: { DeformationX: number; DeformationY: number },
    dx: number,
    dy: number,
    overlap: number,
  ) {
    const angle = Math.atan2(dy, dx);
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const deformationAmount = overlap * 0.3;

    Player.DeformationX += cosA * deformationAmount;
    Player.DeformationY += sinA * deformationAmount;

    element.DeformationX -= cosA * deformationAmount * 0.5;
    element.DeformationY -= sinA * deformationAmount * 0.5;
  }

  handleAbsorption(element: EnemyPlayerModel, Player: PlayerFeatureModel, playerRadius: number) {
    const absorptionRate = 0.5;
    const absorbedRadius = element.Radius * absorptionRate;

    if (playerRadius > element.Radius) {
      Player.Radius += absorbedRadius;
      element.Radius -= absorbedRadius;

      if (element.Radius <= Player.Radius && element.Radius <= 0.5) {
        element.Status = STATUS.DEAD;
        element.Radius = 0;
      }
    } else {
      element.Radius += playerRadius * absorptionRate;
      Player.Radius -= playerRadius * absorptionRate;

      if (Player.Radius <= element.Radius) {
        animateAbsorption(element, Player);
        element.Destroy();
        Player.Status = STATUS.DEAD;
        element.isColliding = false;
      }
    }
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
        if (IsCollided(element, this.Player.Player)) {
          const collisionAngle = Math.atan2(
            element.Y - this.Player.Player.Y,
            element.X - this.Player.Player.X,
          );
          const deformationAmount = Math.min(element.Radius, this.Player.Player.Radius) * 0.3;

          this.Player.Player.DeformationX -= Math.cos(collisionAngle) * deformationAmount;
          this.Player.Player.DeformationY -= Math.sin(collisionAngle) * deformationAmount;

          element.DeformationX += Math.cos(collisionAngle) * deformationAmount;
          element.DeformationY += Math.sin(collisionAngle) * deformationAmount;
        }
        target.Radius = target.Radius + element.Radius * GROW_BY_FOOD_COEFFICIENT;
        element.Status = STATUS.DEAD;
        if (target instanceof EnemyStatic) {
          target.prepareMove(element.X, element.Y);
        }
      }
    }
  }

  public CollisionEnemyDetection() {
    for (const element of this.EnemyFields) {
      if (!(element instanceof EnemyStatic)) {
        continue;
      }

      this.detectCollisionWithPlayer(element);
      this.detectCollisionWithEnemies(element);
    }
  }

  private detectCollisionWithPlayer(element: EnemyStatic) {
    const { Player } = this.Player;
    const dxPlayer = element.X - Player.X;
    const dyPlayer = element.Y - Player.Y;
    const distSqPlayer = dxPlayer * dxPlayer + dyPlayer * dyPlayer;
    const sumRadiusPlayer = element.Radius + Player.Radius;
    const sumRadiusSqPlayer = sumRadiusPlayer * sumRadiusPlayer;

    if (distSqPlayer <= sumRadiusSqPlayer) {
      this.handlePlayerCollision(Player, element);
    }
  }

  private handlePlayerCollision(player: PlayerFeatureModel, element: { Radius: number }) {
    if (player.Radius > element.Radius) {
      const massLossRate = 0.003;
      const massLoss = player.Radius * massLossRate;

      player.Radius -= massLoss;

      if (player.Radius <= 0.5) {
        player.Status = STATUS.DEAD;
      }
    }
  }

  private detectCollisionWithEnemies(element: EnemyStatic) {
    for (const enemy of this.EnemyPlayers) {
      const dxEnemy = element.X - enemy.X;
      const dyEnemy = element.Y - enemy.Y;
      const distSqEnemy = dxEnemy * dxEnemy + dyEnemy * dyEnemy;
      const sumRadiusEnemy = element.Radius + enemy.Radius;
      const sumRadiusSqEnemy = sumRadiusEnemy * sumRadiusEnemy;

      if (distSqEnemy <= sumRadiusSqEnemy) {
        this.handleEnemyCollision(enemy, element);
      }
    }
  }

  private handleEnemyCollision(enemy: EnemyPlayerModel, element: EnemyStatic) {
    if (enemy.Radius > element.Radius) {
      const massLossRateEnemy = 0.003;
      const massLossEnemy = enemy.Radius * massLossRateEnemy;

      enemy.Radius -= massLossEnemy;
      if (enemy.Radius <= 0.5) {
        enemy.Status = STATUS.DEAD;
      }
    }
  }

  public CollisionEnemyToEnemyDetection() {
    for (let i = 0; i < this.EnemyPlayers.length; i++) {
      const enemyA = this.EnemyPlayers[i];

      for (let j = i + 1; j < this.EnemyPlayers.length; j++) {
        const enemyB = this.EnemyPlayers[j];

        const dx = enemyA.X - enemyB.X;
        const dy = enemyA.Y - enemyB.Y;
        const distSq = dx * dx + dy * dy;
        const sumRadius = enemyA.Radius + enemyB.Radius;
        const sumRadiusSq = sumRadius * sumRadius;

        if (distSq > sumRadiusSq) {
          continue;
        }

        if (enemyA.Radius > enemyB.Radius) {
          const absorptionRate = 0.5;
          const absorbedRadius = enemyB.Radius * absorptionRate;

          enemyA.Radius += absorbedRadius;
          enemyB.Radius -= absorbedRadius;

          if (enemyB.Radius <= 0.5) {
            enemyB.Status = STATUS.DEAD;
            this.EnemyPlayers.splice(j, 1);
            j--;
          }
        } else if (enemyB.Radius > enemyA.Radius) {
          const absorptionRate = 0.5;
          const absorbedRadius = enemyA.Radius * absorptionRate;

          enemyB.Radius += absorbedRadius;
          enemyA.Radius -= absorbedRadius;

          if (enemyA.Radius <= 0.5) {
            enemyA.Status = STATUS.DEAD;
            this.EnemyPlayers.splice(i, 1);
            i--;
            break;
          }
        }
      }
    }
    this.RemoveDeadEnemies();
  }

  public RemoveDeadEnemies() {
    this.EnemyPlayers = this.EnemyPlayers.filter(enemy => enemy.Status === STATUS.ALIVE);
  }

  public AddEnemyOverTime() {
    this.EnemyPlayers = this.filterDeadEnemies();
    requestIdleCallback(() => {
      if (this.EnemyPlayers.length < 130) {
        const newEnemies = generateRandomEnemies(1, this.Player.Player.X, this.Player.Player.Y);
        this.EnemyPlayers.push(...newEnemies);
      }
    });
  }

  public AddFoodOverTime(minFoodCount: number = 4900, foodToAdd: number = 100) {
    requestIdleCallback(() => {
      if (this.FoodFields.length < minFoodCount) {
        const newFood = GenerateFood({
          width: MAP_SIZE,
          height: MAP_SIZE,
        }).slice(0, foodToAdd);
        this.FoodFields.push(...newFood);
      }
    });
  }

  public DrawAll(ctx: CanvasRenderingContext2D) {
    this.DrawFood(ctx);

    const itemsToDraw = [
      this.Player.Player,
      ...this.EnemyPlayers,
      ...this.EnemyFields,
      ...this.Player.Divisions,
    ];

    itemsToDraw.sort((a, b) => a.Radius - b.Radius);

    const viewBoundary = this.getViewBoundary();

    for (const item of itemsToDraw) {
      if (!this.isVisible(item, viewBoundary)) {
        continue;
      }

      if (item.Status === STATUS.ALIVE) {
        item.draw(ctx);
      }
    }
  }

  public DrawFood(ctx: CanvasRenderingContext2D) {
    for (const food of this.FoodFields) {
      if (!this.isVisible(food, this.getViewBoundary())) {
        continue;
      }
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

  public DrawGrid(ctx: CanvasRenderingContext2D) {
    const gridSize = 5;
    const cameraX = this.Camera.X;
    const cameraY = this.Camera.Y;

    const canvasWidth = ctx.canvas.width / this.Camera.Scale;
    const canvasHeight = ctx.canvas.height / this.Camera.Scale;

    const offsetX = -(cameraX % gridSize);
    const offsetY = -(cameraY % gridSize);

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.strokeStyle = '$app-cell-color';
    ctx.lineWidth = 0.1;

    for (let x = offsetX; x < canvasWidth; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x * this.Camera.Scale, 0);
      ctx.lineTo(x * this.Camera.Scale, canvasHeight * this.Camera.Scale);
      ctx.stroke();
    }

    for (let y = offsetY; y < canvasHeight; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y * this.Camera.Scale);
      ctx.lineTo(canvasWidth * this.Camera.Scale, y * this.Camera.Scale);
      ctx.stroke();
    }

    ctx.restore();
  }
}
