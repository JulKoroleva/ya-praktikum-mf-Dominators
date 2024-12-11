import { TResult } from '../../Game.interface';

export interface IEndGameProps {
  results: TResult[];
  handleRepeat: () => void;
}
