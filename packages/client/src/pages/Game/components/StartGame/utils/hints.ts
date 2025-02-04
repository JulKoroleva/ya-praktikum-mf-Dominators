import { IHint } from '../StartGame.interface';
import Tip1 from '@/assets/tips/tip_1.svg';
import Tip2 from '@/assets/tips/tip_2.svg';
import Tip3 from '@/assets/tips/tip_3.svg';
import Tip4 from '@/assets/tips/tip_4.svg';

export const hints: IHint[] = [
  {
    id: 1,
    text: 'Welcome to the game! Take a short tutorial, these tips will help you become the best of the best',
    image: '',
  },
  {
    id: 2,
    text: 'Collect small cells to increase your mass. This helps you grow faster early in the game.',
    image: Tip1,
  },
  {
    id: 3,
    text: 'Avoid larger players that can swallow you up. Try to stay away from dangerous areas.',
    image: Tip2,
  },
  {
    id: 4,
    text: 'Use green viruses for protection: small players can hide behind them to avoid attacks',
    image: Tip3,
  },
  {
    id: 5,
    text: 'Speed ​​up! Space key to move faster. Speed ​​accumulates every 60 seconds and lasts for 5 seconds',
    image: Tip4,
  },
  // {
  //   id: 6,
  //   text: 'Разделяйтесь (клавиша Space), чтобы атаковать более мелких игроков или быстрее перемещаться. Помните, что разделение делает вас уязвимыми: избегайте разделения рядом с большими игроками',
  //   image: Tip4,
  // },
];
