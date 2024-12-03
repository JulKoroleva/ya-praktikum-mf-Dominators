import { GameFeatureModel } from '../models/GameFeature.model';

/**
 * на самом деле должна быть более сложная функция при поедании.
 * в оригинале поедании или детект столкновения с врагом происходит если мы наехали на какую-то часть (30% например)
 */
export function isCollidedBySquare(circle1: GameFeatureModel, circle2: GameFeatureModel) {
  const { X: x1, Y: y1, Radius: radius1 } = circle1;
  const { X: x2, Y: y2, Radius: radius2 } = circle2;

  const distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

  if (distance >= radius1 + radius2) {
    return 0;
  }
  if (distance + radius2 <= radius1) {
    return circle1.getAreaOfCircle();
  }
  if (distance + radius1 <= radius2) {
    return circle2.getAreaOfCircle();
  }

  const F1 =
    2 *
    Math.acos(
      (radius1 * radius1 - radius2 * radius2 + distance * distance) / (2 * radius1 * distance),
    );
  const F2 =
    2 *
    Math.acos(
      (radius2 * radius2 - radius1 * radius1 + distance * distance) / (2 * radius2 * distance),
    );

  const S1 = (radius1 * radius1 * (F1 - Math.sin(F1))) / 2;
  const S2 = (radius2 * radius2 * (F2 - Math.sin(F2))) / 2;

  return S1 + S2;
}
