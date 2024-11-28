import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import { Loader } from '../Loader';

import CloseIcon from '@/assets/icons/close.svg';
import Succeeded from '@/assets/icons/succeeded.svg';
import Failed from '@/assets/icons/failed.svg';

import { IUniversalModal } from './universalModal.interface';

import styles from './universalModal.module.scss';

export const UniversalModal: React.FC<IUniversalModal> = ({
  show,
  onHide,
  title = '',
  children,
  modalSize,
  status,
  zIndex,
}) => {
  type StatusType = 'loading' | 'succeeded' | 'failed';

  const statusHeaderMap: Record<StatusType, React.ReactNode> = {
    loading: title,
    succeeded: (
      <div className={styles['status-header']}>
        <div className={styles['svg']}>
          <img src={Succeeded} alt="Succeeded" />
        </div>
        <div>{title}</div>
      </div>
    ),
    failed: (
      <div className={styles['status-header']}>
        <div className={styles['svg']}>
          <img src={Failed} alt="Failed" />
        </div>
        <div>{title}</div>
      </div>
    ),
  };

  const statusBodyMap: Record<StatusType, React.ReactNode> = {
    loading: (
      <div className={styles['modal-loader']}>
        <Loader />
      </div>
    ),
    succeeded: null,
    failed: null,
  };

  const modalColorClass = status === 'succeeded' || status === 'failed' ? styles[status] : '';
  const closeButtonClass =
    status === 'succeeded' || status === 'failed' ? 'close-button' : 'modal-header-close';

  return (
    <Modal
      className={styles['universal-modal']}
      show={show}
      onHide={onHide}
      centered
      size={modalSize}
      backdrop="static"
      style={{ zIndex: zIndex || '1050' }}>
      <Modal.Header className={`${styles['modal-header']} ${modalColorClass}`}>
        <Modal.Title className={`${styles['modal-header-title']} ${modalColorClass}`}>
          {status ? statusHeaderMap[status as StatusType] : title}
        </Modal.Title>
        <Button
          type="button"
          className={`${styles[closeButtonClass]}`}
          data-dismiss="modal"
          onClick={onHide}>
          <img src={CloseIcon} alt="Close" />
        </Button>
      </Modal.Header>
      <Modal.Body className={`${styles['modal-body']} ${modalColorClass}`}>
        {status ? statusBodyMap[status as StatusType] : children}
      </Modal.Body>
    </Modal>
  );
};
