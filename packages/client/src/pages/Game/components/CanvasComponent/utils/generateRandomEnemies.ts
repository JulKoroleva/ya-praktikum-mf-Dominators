import { v4 as uuidv4 } from 'uuid';
import { EnemyPlayerModel } from '../models/EnemyPlayer.model';

function getSpeed(radius: number): number {
  const maxSpeed = 0.8;
  const minSpeed = 0.1;
  const minR = 1;
  const maxR = 10;

  if (radius <= minR) {
    return maxSpeed;
  } else if (radius >= maxR) {
    return minSpeed;
  }

  return maxSpeed - ((radius - minR) / (maxR - minR)) * (maxSpeed - minSpeed);
}

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

    // const randomRadius = 3;
    const randomRadius = 3 + Math.random() * 5;

    const randomSpeed = getSpeed(randomRadius);

    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    const randomColor = `rgba(${red}, ${green}, ${blue}, 1)`;

    const darkerRed = Math.max(0, red - 50);
    const darkerGreen = Math.max(0, green - 50);
    const darkerBlue = Math.max(0, blue - 50);
    const strokeColor = `rgba(${darkerRed}, ${darkerGreen}, ${darkerBlue}, 1)`;
    console.log('speed', randomSpeed);
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
