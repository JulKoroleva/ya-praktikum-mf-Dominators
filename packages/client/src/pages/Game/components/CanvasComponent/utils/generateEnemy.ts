import { ENEMY_COUNT } from '@/constants/game';

import { EnemyStatic } from '../models';

import { v4 as uuidv4 } from 'uuid';

/** временный вариант. супер примитивный */
export function GenerateEnemy({
  width,
  height,
  count = ENEMY_COUNT,
}: {
  width: number;
  height: number;
  count?: number;
}): ReadonlyArray<EnemyStatic> {
  return new Array(count).fill(null).map(
    () =>
      new EnemyStatic({
        X: Math.random() * width,
        Y: Math.random() * height,
        StrokeStyle: 'rgb(0,135,0)',
        ColorFill: 'rgb(0,255,0)',
        Radius: 5,
        Speed: 0,
        id: uuidv4(),
      }),
  );
}
