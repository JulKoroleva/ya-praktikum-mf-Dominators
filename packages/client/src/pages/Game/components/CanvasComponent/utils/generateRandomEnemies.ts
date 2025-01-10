import { MAP_SIZE } from '@/constants/game';
import { EnemyPlayerModel } from '../models/EnemyPlayer.model';

/**
 * Генерация врагов рядом с игроком, но на безопасном расстоянии.
 */
export function generateRandomEnemies(
  count: number,
  playerX: number,
  playerY: number,
  spawnRadius: number = 1000,
  minDistance: number = 100, // Минимальное безопасное расстояние
): EnemyPlayerModel[] {
  const enemies: EnemyPlayerModel[] = [];

  for (let i = 0; i < count; i++) {
    let randomX, randomY, distance;

    do {
      const angle = Math.random() * Math.PI * 2;
      const distanceOffset = Math.random() * (spawnRadius - minDistance) + minDistance;
      randomX = playerX + Math.cos(angle) * distanceOffset;
      randomY = playerY + Math.sin(angle) * distanceOffset;

      // Вычисляем расстояние до игрока для проверки
      const dx = playerX - randomX;
      const dy = playerY - randomY;
      distance = Math.sqrt(dx * dx + dy * dy);
    } while (distance < minDistance); // Повторять генерацию, если враг оказался слишком близко

    const randomRadius = 2 + Math.random() * 5;

    // Генерация случайного цвета для основного заливки
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    const randomColor = `rgba(${red}, ${green}, ${blue}, 1)`;

    // Генерация более тёмного цвета для обводки (уменьшаем RGB значения)
    const darkerRed = Math.max(0, red - 50);
    const darkerGreen = Math.max(0, green - 50);
    const darkerBlue = Math.max(0, blue - 50);
    const strokeColor = `rgba(${darkerRed}, ${darkerGreen}, ${darkerBlue}, 1)`;

    enemies.push(
      new EnemyPlayerModel({
        X: randomX,
        Y: randomY,
        Radius: randomRadius,
        ColorFill: randomColor,
        StrokeStyle: strokeColor,
      }),
    );
  }

  return enemies;
}
