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
        X: 2100,
        Y: 2100,
        StrokeStyle: 'green',
        ColorFill: 'green',
        Radius: 5,
      }),
  );
}
