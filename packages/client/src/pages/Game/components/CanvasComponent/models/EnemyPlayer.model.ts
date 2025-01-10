import { FoodModel, PlayerFeatureModel, PlayerModel } from '.';
import { ICircle, STATUS } from '../interfaces/CanvasComponent.interface';

export class EnemyPlayerModel extends PlayerFeatureModel {
  protected intervalId?: NodeJS.Timeout;

  // Переменные скорости
  private vx: number = 0;
  private vy: number = 0;

  // // Скорость, зависящая от размера
  // public get maxSpeed(): number {
  //   const minR = 5;
  //   const maxR = 80;
  //   const R = Math.max(minR, Math.min(this.Radius, maxR));
  //   const t = (R - minR) / (maxR - minR);
  //   return 1 - 0.5 * t; // Для врагов меньшее замедление
  // }

  // Текущая цель (x,y)
  private currentTarget: { x: number; y: number } | null = null;

  // Последний угол движения
  private lastAngle: number | null = null;

  /**
   * Счётчик перезарядки (cooldown) на выбор новой цели.
   * Например, 30 кадров — это ~0.5 секунды при 60 FPS.
   */
  private targetCooldown = 0;

  constructor(props: ICircle) {
    super(props);
  }

  /**
   * Основной метод движения (вызывается каждый кадр).
   * @param player
   * @param foodFields
   * @param enemies
   */
  public move(player?: PlayerModel, foodFields?: FoodModel[], enemies?: EnemyPlayerModel[]) {
    if (!player || !foodFields || !enemies) return;

    // Удаляем мёртвых врагов
    enemies = enemies.filter(enemy => enemy.Status === STATUS.ALIVE);

    // Уменьшаем cooldown
    if (this.targetCooldown > 0) {
      this.targetCooldown--;
    }

    // Проверка на наличие опасного врага
    const dangerousEnemy = this.findDangerousEnemyNearby(player, enemies);
    if (dangerousEnemy) {
      const dx = (dangerousEnemy as EnemyPlayerModel).X - this.X;
      const dy = (dangerousEnemy as EnemyPlayerModel).Y - this.Y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Если враг рядом, отменяем цель и убегаем
      if (distance < this.Radius + 50) {
        this.currentTarget = {
          x: this.X - dx * 10,
          y: this.Y - dy * 10,
        };
        this.targetCooldown = 1800; // 30 секунд (60 FPS)
      }
    }

    // // Если нет угрозы и цель еще не достигнута — не искать новую
    // if (!dangerousEnemy && this.currentTarget && !this.isCurrentTargetReached()) {
    //   this.moveTowardsCurrentTarget(foodFields);
    //   return;
    // }

    // Если текущая цель отсутствует, выбираем новую
    if (!this.currentTarget || this.isCurrentTargetReached() || this.targetCooldown === 0) {
      this.retargetIfNeeded(player, foodFields, enemies);
    }

    // Постоянное движение к текущей цели
    this.moveTowardsCurrentTarget(foodFields);
  }

  /**
   * Изменено: теперь цель меняется только если текущая цель мертва или достигнута
   */
  private retargetIfNeeded(
    player: PlayerModel,
    foodFields: FoodModel[],
    enemies: EnemyPlayerModel[],
  ) {
    if (
      !this.currentTarget ||
      this.isCurrentTargetReached() ||
      this.isCurrentTargetDead(player, foodFields, enemies)
    ) {
      this.chooseNewTarget(player, foodFields, enemies);
      this.targetCooldown = 30;
    }
  }
  /**
   * Ищем рядом опасного врага или игрока (если у него радиус больше).
   */
  private findDangerousEnemyNearby(
    player: PlayerModel,
    enemies: EnemyPlayerModel[],
  ): EnemyPlayerModel | PlayerModel | null {
    const dangerDistance = this.Radius + 100;

    let dx = player.Player.X - this.X;
    let dy = player.Player.Y - this.Y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (player.Player.Radius > this.Radius && dist < dangerDistance) {
      return player;
    }

    for (const enemy of enemies) {
      if (enemy === this || enemy.Status !== STATUS.ALIVE) continue;
      dx = enemy.X - this.X;
      dy = enemy.Y - this.Y;
      dist = Math.sqrt(dx * dx + dy * dy);

      if (enemy.Radius > this.Radius && dist < dangerDistance) {
        return enemy;
      }
    }

    return null;
  }

  /**
   * Проверяем, достигнута ли текущая цель.
   */
  private isCurrentTargetReached(): boolean {
    if (!this.currentTarget) return false;
    const dx = this.currentTarget.x - this.X;
    const dy = this.currentTarget.y - this.Y;
    return Math.sqrt(dx * dx + dy * dy) < 10;
  }

  /**
   * Проверяем, "жива" ли цель (кусок еды или враг).
   */
  private isCurrentTargetDead(
    player: PlayerModel,
    foodFields: FoodModel[],
    enemies: EnemyPlayerModel[],
  ): boolean {
    if (!this.currentTarget) return true;

    // Проверяем еду
    for (const food of foodFields) {
      if (food.Status !== STATUS.ALIVE) continue;
      const dx = food.X - this.currentTarget.x;
      const dy = food.Y - this.currentTarget.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1) {
        return false;
      }
    }

    // Проверяем вражеских игроков
    for (const enemy of enemies) {
      if (enemy.Status !== STATUS.ALIVE) continue;
      const dx = enemy.X - this.currentTarget.x;
      const dy = enemy.Y - this.currentTarget.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1) {
        return false;
      }
    }

    // Проверяем игрока
    {
      const dx = player.Player.X - this.currentTarget.x;
      const dy = player.Player.Y - this.currentTarget.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1 && player.Player.Status === STATUS.ALIVE && player.Player.Radius > 0) {
        return false;
      }
    }

    return true;
  }

  /**
   * Выбираем новую ближайшую цель:
   * - едим более мелких врагов
   * - либо еду
   * - либо игрока (если он меньше нас)
   */
  private chooseNewTarget(
    player: PlayerModel,
    foodFields: FoodModel[],
    enemies: EnemyPlayerModel[],
  ) {
    let minDistance = Infinity;
    let selected: { x: number; y: number } | null = null;

    // Проверяем игрока
    if (player.Player.Status === STATUS.ALIVE && player.Player.Radius < this.Radius) {
      const dist = Math.hypot(player.Player.X - this.X, player.Player.Y - this.Y);
      if (dist < minDistance) {
        minDistance = dist;
        selected = { x: player.Player.X, y: player.Player.Y };
      }
    }

    // Проверяем врагов
    for (const enemy of enemies) {
      if (enemy === this || enemy.Status !== STATUS.ALIVE || enemy.Radius >= this.Radius) continue;
      const dist = Math.hypot(enemy.X - this.X, enemy.Y - this.Y);
      if (dist < minDistance) {
        minDistance = dist;
        selected = { x: enemy.X, y: enemy.Y };
      }
    }

    // Проверяем еду
    for (const food of foodFields) {
      if (food.Status !== STATUS.ALIVE) continue;
      const dist = Math.hypot(food.X - this.X, food.Y - this.Y);
      if (dist < minDistance) {
        minDistance = dist;
        selected = { x: food.X, y: food.Y };
      }
    }

    // Если найдена цель, сразу вычисляем направление и устанавливаем скорость
    if (selected) {
      this.currentTarget = selected;
      const dx = this.currentTarget.x - this.X;
      const dy = this.currentTarget.y - this.Y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      this.vx = (dx / distance) * this.Speed;
      this.vy = (dy / distance) * this.Speed;
      this.lastAngle = Math.atan2(this.vy, this.vx);
      this.targetCooldown = 30; // Обновление задержки для смены цели
    }
  }

  private moveTowardsCurrentTarget(foodFields: FoodModel[]) {
    if (!this.currentTarget) return;

    const dx = this.currentTarget.x - this.X;
    const dy = this.currentTarget.y - this.Y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Нормализация направления движения
    const directionX = dx / distance;
    const directionY = dy / distance;

    // Вычисление текущего угла
    const currentAngle = Math.atan2(directionY, directionX);
    const lastAngle = this.lastAngle !== null ? this.lastAngle : currentAngle;

    // Проверка отклонения угла
    const angleDifference = Math.abs(currentAngle - lastAngle);

    // Преобразование разницы углов в диапазон 0-180 градусов
    const angleDifferenceDegrees = (angleDifference * 180) / Math.PI;

    // Если угол изменился более чем на 30 градусов, пересчитываем направление
    if (angleDifferenceDegrees > 30 || this.isCurrentTargetChanged(foodFields)) {
      this.vx = directionX * this.Speed;
      this.vy = directionY * this.Speed;
      this.lastAngle = currentAngle; // Обновляем сохранённый угол
    }

    // Обновляем координаты, движение происходит постоянно
    this.X += this.vx;
    this.Y += this.vy;

    // Проверка на достижение цели и выбор новой
    // if (this.isCurrentTargetReached()) {
    //   this.vx = 0;
    //   this.vy = 0;
    //   this.currentTarget = null;
    // }
  }

  private isCurrentTargetChanged(foodFields: FoodModel[]): boolean {
    if (!this.currentTarget) return true;

    for (const food of foodFields) {
      if (
        food.X === this.currentTarget.x &&
        food.Y === this.currentTarget.y &&
        food.Status === STATUS.ALIVE
      ) {
        return false; // Цель не изменилась
      }
    }
    return true; // Цель либо отсутствует, либо больше не существует
  }
  Init = (player?: PlayerModel, foodFields?: FoodModel[], enemies?: EnemyPlayerModel[]) => {
    if (!player || !foodFields || !enemies) {
      return;
    }

    this.chooseNewTarget(player, foodFields, enemies);

    // Постоянное обновление для движения 60 раз в секунду
    this.intervalId = setInterval(() => {
      this.move(player, foodFields, enemies);
    }, 1000 / 60); // 60 FPS
  };

  Destroy = () => {
    clearInterval(this.intervalId);
  };
}
