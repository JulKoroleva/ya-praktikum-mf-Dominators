import React, { useEffect, useState } from 'react';
import Popup from '@/components/Popup/Popup';
import { Button } from 'react-bootstrap';
import { StartGameProps } from './interfaces/StartGame.interface';
import styles from './StartGame.module.scss';
import { hints } from './utils/hints';

export const StartGame: React.FC<StartGameProps> = ({ onComplete, isGameStarted }) => {
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showGo, setShowGo] = useState(false);

  useEffect(() => {
    if (isCountdownActive) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
        return () => clearTimeout(timer);
      }

      if (countdown === 0) {
        setShowGo(true);
        const goTimer = setTimeout(() => {
          setShowGo(false);
          onComplete();
        }, 1000);
        return () => clearTimeout(goTimer);
      }
    }
  }, [isCountdownActive, countdown, onComplete]);

  const handleNext = () => {
    if (currentHintIndex < hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    } else {
      setIsCountdownActive(true);
    }
  };

  const Hint = React.memo(({ text, image }: { text: string; image?: string }) => (
    <div className={styles['game-start__hint']}>
      <p>{text}</p>
      {image && (
        <div className={styles['game-start__tip']}>
          <img src={image} alt="Hint tip" />
        </div>
      )}
    </div>
  ));

  if (isCountdownActive) {
    return (
      <div className={styles['game-start__countdown']}>
        {showGo ? (
          <h1 className={styles['countdown-go']}>Go!</h1>
        ) : (
          <h1 className={styles['countdown-number']}>{countdown}...</h1>
        )}
      </div>
    );
  }

  if (!isGameStarted) {
    return (
      <Popup open={!isGameStarted} withOverlay={true}>
        <div className={styles['game-start']}>
          <Hint text={hints[currentHintIndex].text} image={hints[currentHintIndex].image} />
          <div
            className={`${styles['game-start__buttons']} ${
              currentHintIndex === hints.length - 1 ? styles.centered : ''
            }`}>
            {currentHintIndex < hints.length - 1 ? (
              <>
                <Button
                  className={`${styles['game-start__button']} ${styles['game-start__button_skip']}`}
                  onClick={onComplete}>
                  Skip
                </Button>
                <Button className={styles['game-start__button']} onClick={handleNext}>
                  Next
                </Button>
              </>
            ) : (
              <Button className={styles['game-start__button']} onClick={handleNext}>
                Ready!
              </Button>
            )}
          </div>
        </div>
      </Popup>
    );
  }

  return null;
};
