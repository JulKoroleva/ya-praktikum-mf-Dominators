import { useState } from 'react';
import { Popup, UniversalModal } from '@/components';
import { EndGame, StartGame, CanvasComponent } from './components';
import { TResult } from './Game.interface';
import { MODAL_CONTENT } from './components/CanvasComponent/constants/modal.constants';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { GoBackModalContent } from './components/GoBackModal/GoBackModal';

export const Game = () => {
  const navigate = useNavigate();
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [result, setResult] = useState<Array<Array<TResult>>>([]);
  const [isEndedGame, setEndedGame] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [showModal, setShowModal] = useState(false);

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

  const handleBackButtonClick = () => {
    setShowModal(true);
    setIsPaused(true);
  };

  const confirmNavigation = () => {
    setShowModal(false);
    navigate(ROUTES.main());
  };

  const cancelNavigation = () => {
    setShowModal(false);
    setIsPaused(false);
  };

  return (
    <>
      {!isGameStarted ? (
        <StartGame onComplete={handleStartGame} isGameStarted={isGameStarted} />
      ) : (
        <>
          <CanvasComponent
            endGameCallback={handleEndGame}
            onBackButtonClick={handleBackButtonClick}
            isPaused={isPaused}
          />

          <UniversalModal
            show={showModal}
            onHide={cancelNavigation}
            title={MODAL_CONTENT.modalTitle}>
            <GoBackModalContent
              onConfirm={confirmNavigation}
              onCancel={cancelNavigation}
              modalContent={MODAL_CONTENT}
            />
          </UniversalModal>

          <Popup open={isEndedGame} withOverlay={true}>
            <EndGame results={result[0]} handleRepeat={handleRepeat} />
          </Popup>
        </>
      )}
    </>
  );
};
