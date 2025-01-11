import { FOOD_COUNT, FOOD_MASS } from '@/constants/game';
import { FoodModel } from '../models';
import { v4 as uuidv4 } from 'uuid';

/** временный вариант. супер примитивный */
export function GenerateFood({
  width,
  height,
}: {
  width: number;
  height: number;
}): Array<FoodModel> {
  return new Array(FOOD_COUNT).fill(null).map(() => {
    const color = `rgb(${Math.round(Math.random() * 255)}, ${Math.round(
      Math.random() * 255,
    )}, ${Math.round(Math.random() * 255)})`;

    return new FoodModel({
      X: Math.random() * width,
      Y: Math.random() * height,
      StrokeStyle: color,
      ColorFill: color,
      Radius: FOOD_MASS,
      id: uuidv4(),
      Speed: 0,
    });
  });
}
