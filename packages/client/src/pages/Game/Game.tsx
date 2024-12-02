import EndGame from './components/EndGame/EndGame';
import { StartGame } from './components/StartGame/StartGame';
import Popup from '@/components/Popup/Popup';
import { useState } from 'react';

const matchResultsMock = [
  {
    id: 1,
    title: 'Time alive',
    value: '08:30',
  },
  {
    id: 2,
    title: 'Food eating',
    value: '1350',
  },
  {
    id: 3,
    title: 'Highest mass',
    value: '2634',
  },
  {
    id: 4,
    title: 'Cells eating',
    value: '2',
  },
  {
    id: 5,
    title: 'Top position',
    value: '1',
  },
  {
    id: 6,
    title: 'Leaderboard time ',
    value: '08:30',
  },
];

import { CanvasComponent } from './components/CanvasComponent';

export const Game = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isEndedGame, setEndedGame] = useState(false);

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  return (
    <>
      {!isGameStarted ? (
        <StartGame onComplete={handleStartGame} isGameStarted={isGameStarted} />
      ) : (
        <>
          <CanvasComponent endGameCallback={setEndedGame} />
          <Popup open={isEndedGame} withOverlay={true}>
            <EndGame results={matchResultsMock} />
          </Popup>
        </>
      )}
    </>
  );
};
