import { MAP_SIZE } from '@/constants/game';
import { FoodModel, PlayerFeatureModel } from '.';
import { ICircle, STATUS } from '../interfaces/CanvasComponent.interface';

export class EnemyPlayerModel extends PlayerFeatureModel {
  private currentTargetId: string | undefined = undefined;
  private currentTarget: FoodModel | PlayerFeatureModel | null = null;
  private closestThreat: PlayerFeatureModel | EnemyPlayerModel | null = null;
  private isRunningAway: boolean = false;
  private runningAwayFrom: Array<PlayerFeatureModel | EnemyPlayerModel> = [];
  private fleeCooldown: number = 0; // Таймер для текущего убегания
  private readonly fleeDuration: number = 150; // 5 секунд (60 кадров в секунду)
  private readonly detectionRange: number = 20;

  constructor(props: ICircle) {
    super(props);
  }

  /**
   * Основной метод движения (вызывается каждый кадр).
   * @param player
   * @param foodFields
   * @param enemies
   */
  public move(player?: PlayerFeatureModel, food?: FoodModel[], enemies?: EnemyPlayerModel[]): void {
    if (!player || !food || !enemies) {
      return;
    }

    const threats = this.findAllBiggerObjects(player, enemies);

    if (threats.length > 0) {
      this.startFleeing(threats);
      this.flee();
      return;
    }

    if (this.isRunningAway) {
      this.flee();
      return;
    }

    if (!this.currentTarget || !this.isValidTarget(this.currentTarget)) {
      this.currentTarget = this.findNearestSmallerObject(player, food, enemies);
      this.currentTargetId = this.currentTarget?.id;
    }

    if (this.currentTarget) {
      this.moveToTarget(this.currentTarget, food, enemies);
    } else {
      this.wanderRandomly();
    }
  }

  /**
   * Для рандомного движения
   */
  private wanderRandomly(): void {
    const randomAngle = Math.random() * 2 * Math.PI;
    this.X += Math.cos(randomAngle) * this.Speed;
    this.Y += Math.sin(randomAngle) * this.Speed;

    this.X = Math.max(0, Math.min(MAP_SIZE, this.X));
    this.Y = Math.max(0, Math.min(MAP_SIZE, this.Y));
  }

  /**
   * Поиск всех больших объектов (угроз) в пределах detectionRange.
   */
  private findAllBiggerObjects(
    player: PlayerFeatureModel,
    enemies: EnemyPlayerModel[],
  ): Array<PlayerFeatureModel | EnemyPlayerModel> {
    const threats: Array<PlayerFeatureModel | EnemyPlayerModel> = [];
    const candidates: Array<PlayerFeatureModel | EnemyPlayerModel> = [
      player,
      ...enemies.filter(e => e.id !== this.id && e.Status === STATUS.ALIVE),
    ];

    for (const obj of candidates) {
      if (obj.Radius > this.Radius && obj.Status === STATUS.ALIVE) {
        // Исключаем равные по размеру
        const dist = this.calculateDistance(obj);
        if (dist < this.detectionRange) {
          threats.push(obj);
        }
      }
    }

    return threats;
  }

  /**
   * Поиск ближайшего меньшего объекта (цели для преследования).
   */
  private findNearestSmallerObject(
    player: PlayerFeatureModel,
    foods: FoodModel[],
    enemies: EnemyPlayerModel[],
  ): FoodModel | PlayerFeatureModel | null {
    let closestSmallerTarget: FoodModel | PlayerFeatureModel | null = null;
    let closestDistance: number = Infinity;

    const extendedDetectionRange = this.detectionRange * 4;

    const candidates: Array<FoodModel | PlayerFeatureModel> = [player, ...enemies, ...foods];

    for (const obj of candidates) {
      const dist = this.calculateDistance(obj);
      if (dist < extendedDetectionRange && obj.Radius < this.Radius && dist < closestDistance) {
        closestDistance = dist;
        closestSmallerTarget = obj;
      }
    }

    return closestSmallerTarget;
  }

  /**
   * Проверка, актуальна ли текущая цель.
   */
  private isValidTarget(target: FoodModel | PlayerFeatureModel | null): boolean {
    if (!target) return false;
    if (target.Status !== STATUS.ALIVE) return false;
    if (target.Radius >= this.Radius) return false;
    const dist = this.calculateDistance(target);
    if (dist > this.detectionRange) return false;
    return true;
  }

  /**
   * Движение к цели.
   */
  private moveToTarget(
    target: FoodModel | PlayerFeatureModel | EnemyPlayerModel,
    food?: FoodModel[],
    enemies?: EnemyPlayerModel[],
  ) {
    const distance = this.calculateDistance(target);

    // Проверка, достиг ли объект цели: если да, то удаляем съеденый объект
    if (distance <= this.Speed) {
      this.X = target.X;
      this.Y = target.Y;

      if (target instanceof FoodModel && food) {
        const targetIndex = food.findIndex(f => f.id === target.id);
        if (targetIndex !== -1) {
          food.splice(targetIndex, 1);
        }
      }

      if (target instanceof EnemyPlayerModel && enemies) {
        const targetIndex = enemies.findIndex(e => e.id === target.id);
        if (targetIndex !== -1) {
          enemies.splice(targetIndex, 1);
        }
      }

      this.currentTarget = null;
      this.currentTargetId = undefined;

      return;
    }

    const angle = Math.atan2(target.Y - this.Y, target.X - this.X);
    this.X += Math.cos(angle) * this.Speed;
    this.Y += Math.sin(angle) * this.Speed;

    // Ограничение перемещения по границам карты
    this.X = Math.max(0, Math.min(MAP_SIZE, this.X));
    this.Y = Math.max(0, Math.min(MAP_SIZE, this.Y));
  }

  /**
   * Начало бегства от угроз.
   */
  private startFleeing(threats: Array<PlayerFeatureModel | EnemyPlayerModel>) {
    this.isRunningAway = true;
    this.runningAwayFrom = threats;
    this.currentTarget = null;
    this.currentTargetId = undefined;
    this.fleeCooldown = this.fleeDuration; // 5 секунд
  }

  /**
   * Прекращение бегства.
   */
  private stopFleeing() {
    this.isRunningAway = false;
    this.runningAwayFrom = [];
    this.closestThreat = null;
  }

  /**
   * Логика бегства от ближайшей угрозы.
   */
  private flee() {
    if (this.fleeCooldown <= 0) {
      this.stopFleeing();
      return;
    }

    this.fleeCooldown--;

    let dx = 0;
    let dy = 0;

    for (const threat of this.runningAwayFrom) {
      dx += this.X - threat.X;
      dy += this.Y - threat.Y;
    }

    const magnitude = Math.sqrt(dx * dx + dy * dy);
    if (magnitude > 0) {
      this.X += (dx / magnitude) * this.Speed;
      this.Y += (dy / magnitude) * this.Speed;
    }

    this.X = Math.max(0, Math.min(MAP_SIZE, this.X));
    this.Y = Math.max(0, Math.min(MAP_SIZE, this.Y));
  }

  private calculateDistance(obj: { X: number; Y: number }): number {
    const dx = obj.X - this.X;
    const dy = obj.Y - this.Y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  public Init = () => {};

  public Destroy = () => {};
}
