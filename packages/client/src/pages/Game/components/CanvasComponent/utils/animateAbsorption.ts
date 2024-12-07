import { GameFeatureModel } from '../models';

export function animateAbsorption(winner: GameFeatureModel, loser: GameFeatureModel) {
  const absorptionInterval = setInterval(() => {
    if (loser.Radius > 0) {
      loser.Radius -= 0.5;
      winner.Radius += 0.25;
    } else {
      clearInterval(absorptionInterval);
    }
  }, 30);
}
