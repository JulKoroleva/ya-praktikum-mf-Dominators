import { GameFeatureModel } from '../models/GameFeature.model';

/**
 * на самом деле должна быть более сложная функция при поедании.
 * в оригинале поедании или детект столкновения с врагом происходит если мы наехали на какую-то часть (30% например)
 */
export function IsCollided(
  { X: x1, Y: y1, Radius: radius1 }: GameFeatureModel,
  { X: x2, Y: y2, Radius: radius2 }: GameFeatureModel,
) {
  const maxDistanceSquared = Math.pow(radius1 + radius2, 2);

  const currentDistanceSquared = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);

  return currentDistanceSquared < maxDistanceSquared;
}
