import { v4 as uuidv4 } from 'uuid';
import { EnemyPlayerModel } from '../models/EnemyPlayer.model';

export function generateRandomEnemies(
  count: number,
  playerX: number,
  playerY: number,
  spawnRadius: number = 1000,
  minDistance: number = 50,
): EnemyPlayerModel[] {
  const enemies: EnemyPlayerModel[] = [];

  for (let i = 0; i < count; i++) {
    let randomX, randomY, distance;

    do {
      const angle = Math.random() * Math.PI * 2;
      const distanceOffset = Math.random() * (spawnRadius - minDistance) + minDistance;
      randomX = playerX + Math.cos(angle) * distanceOffset;
      randomY = playerY + Math.sin(angle) * distanceOffset;

      const dx = playerX - randomX;
      const dy = playerY - randomY;
      distance = Math.sqrt(dx * dx + dy * dy);
    } while (distance < minDistance);

    // const randomRadius = 2;
    const randomRadius = 3 + Math.random() * 5;

    const minR = 3;
    const maxR = 80;
    const R = Math.max(minR, Math.min(randomRadius, maxR));
    const t = (R - minR) / (maxR - minR);
    const randomSpeed = (1 - t) / 2; // Скорость рассчитывается для каждого объекта отдельно
    // const randomSpeed = 0.000002; // Скорость рассчитывается для каждого объекта отдельно

    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    const randomColor = `rgba(${red}, ${green}, ${blue}, 1)`;

    const darkerRed = Math.max(0, red - 50);
    const darkerGreen = Math.max(0, green - 50);
    const darkerBlue = Math.max(0, blue - 50);
    const strokeColor = `rgba(${darkerRed}, ${darkerGreen}, ${darkerBlue}, 1)`;

    const enemy = new EnemyPlayerModel({
      X: randomX,
      Y: randomY,
      Radius: randomRadius,
      ColorFill: randomColor,
      StrokeStyle: strokeColor,
      Speed: randomSpeed,
      id: uuidv4(),
    });

    enemies.push(enemy);
  }

  return enemies;
}
