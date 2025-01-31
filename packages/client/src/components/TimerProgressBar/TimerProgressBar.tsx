import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import styles from './TimerProgressBar.module.scss';

export function TimerProgressBar({ progress, isWaitingForTap, remainingTime, onTap }) {
  return (
    <div className={styles['progress-container']}>
      <ProgressBar className={styles['progress-bar']}>
        <ProgressBar
          className={progress < 100 ? styles['progress-fill'] : styles['progress-complete']}
          now={progress}
          max={100}
        />
        <div className={styles['progress-timer']} onClick={onTap}>
          {isWaitingForTap ? 'Tap!' : `${remainingTime}s`}
        </div>
      </ProgressBar>
    </div>
  );
}
