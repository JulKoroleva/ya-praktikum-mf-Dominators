import { useState } from 'react';
import { Popup } from '@/components';
import { EndGame, StartGame, CanvasComponent } from './components';
import { TResult } from './components/EndGame/EndGame.interface';

export const Game = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [result, setResult] = useState<Array<Array<TResult>>>([]);
  const [isEndedGame, setEndedGame] = useState(false);

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  const handleEndGame = (result: Array<TResult> = []) => {
    setResult(prev => [result, ...prev]);
    setEndedGame(true);
  };

  const handleRepeat = () => {
    setEndedGame(false);
    setIsGameStarted(false);
  };

  return (
    <>
      {!isGameStarted ? (
        <StartGame onComplete={handleStartGame} isGameStarted={isGameStarted} />
      ) : (
        <>
          <CanvasComponent endGameCallback={handleEndGame} />
          <Popup open={isEndedGame} withOverlay={true}>
            <EndGame results={result[0]} handleRepeat={handleRepeat} />
          </Popup>
        </>
      )}
    </>
  );
};
