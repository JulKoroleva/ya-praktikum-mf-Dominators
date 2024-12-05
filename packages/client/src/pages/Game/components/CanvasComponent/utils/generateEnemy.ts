import { ENEMY_COUNT } from '@/constants/game';

import { EnemyStatic } from '../models';

/** временный вариант. супер примитивный */
export function GenerateEnemy({
  width,
  height,
}: {
  width: number;
  height: number;
}): ReadonlyArray<EnemyStatic> {
  return new Array(ENEMY_COUNT).fill(null).map(
    () =>
      new EnemyStatic({
        X: Math.random() * width,
        Y: Math.random() * height,
        StrokeStyle: 'rgb(0,135,0)',
        ColorFill: 'rgb(0,255,0)',
        Radius: 5,
      }),
  );
}
