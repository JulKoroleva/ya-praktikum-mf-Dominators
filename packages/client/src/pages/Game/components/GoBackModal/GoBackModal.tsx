import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './GoBackModal.module.scss';
import { GoBackModalContentProps } from './GoBackModal.interface';

export const GoBackModalContent: React.FC<GoBackModalContentProps> = ({
  onConfirm,
  onCancel,
  modalContent,
}) => {
  return (
    <div className={styles['modal__content']}>
      <p>{modalContent.modalBody}</p>
      <div className={styles['modal__content_buttons']}>
        <Button className={styles['confirm-btn']} onClick={onConfirm}>
          {modalContent.confirmButton}
        </Button>
        <Button className={styles['cancel-btn']} onClick={onCancel}>
          {modalContent.cancelButton}
        </Button>
      </div>
    </div>
  );
};
