import React from 'react';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';

import { Loader } from '../Loader';

import { IUniversalModal } from './universalModal.interface';

import Succeeded from '@/assets/icons/succeeded.svg';
import Failed from '@/assets/icons/failed.svg';

import styles from './universalModal.module.scss';

export const UniversalModal: React.FC<IUniversalModal> = ({
  show,
  onHide,
  title = '',
  children,
  modalSize = 'ct',
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
  const sizeClass = styles[`modal-${modalSize}`];

  return (
    <>
      {show && (
        <div className={styles['modal-backdrop']} onClick={onHide}>
          <div
            className={classNames(styles['universal-modal'], sizeClass)}
            style={{ zIndex: zIndex || '1050' }}>
            <div className={classNames(styles['modal-header'], modalColorClass)}>
              <div className={classNames(styles['modal-header-title'], modalColorClass)}>
                {status ? statusHeaderMap[status as StatusType] : title}
              </div>
              <Button
                type="button"
                className={`${styles[closeButtonClass]}`}
                data-dismiss="modal"
                onClick={onHide}>
                &times;
              </Button>
            </div>
            <div className={classNames(styles['modal-body'], modalColorClass)}>
              {status ? statusBodyMap[status as StatusType] : children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
