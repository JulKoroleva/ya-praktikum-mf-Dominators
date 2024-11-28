import { ENEMY_COUNT } from '@/constants/game';

import { GameFeatureModel } from '../models/GameFeature.model';

/** временный вариант. супер примитивный */
export function GenerateEnemy({
  width,
  height,
}: {
  width: number;
  height: number;
}): ReadonlyArray<GameFeatureModel> {
  return new Array(ENEMY_COUNT).fill(null).map(
    () =>
      new GameFeatureModel({
        X: Math.random() * width,
        Y: Math.random() * height,
        StrokeStyle: 'green',
        ColorFill: 'green',
        Radius: 50,
      }),
  );
}
