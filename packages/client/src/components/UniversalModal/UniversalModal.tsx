import React from 'react';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';

import { Loader } from '@/components';

import { IUniversalModalProps, TModalStatus } from './UniversalModal.interface';

import Succeeded from '@/assets/icons/succeeded.svg';
import Failed from '@/assets/icons/failed.svg';

import styles from './UniversalModal.module.scss';

export const UniversalModal: React.FC<IUniversalModalProps> = ({
  show,
  onHide,
  title = '',
  children,
  modalSize = 'ct',
  status,
  zIndex,
}) => {
  const statusHeaderMap: Record<Exclude<TModalStatus, 'idle'>, React.ReactNode> = {
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

  const statusBodyMap: Record<Exclude<TModalStatus, 'idle'>, React.ReactNode> = {
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
        <>
          <div className={styles['modal-backdrop']} onClick={onHide}></div>
          <div
            className={classNames(styles['universal-modal'], sizeClass)}
            style={{ zIndex: zIndex || '1050' }}>
            <div className={classNames(styles['modal-header'], modalColorClass)}>
              <div className={classNames(styles['modal-header-title'], modalColorClass)}>
                {status ? statusHeaderMap[status as Exclude<TModalStatus, 'idle'>] : title}
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
              {status ? statusBodyMap[status as Exclude<TModalStatus, 'idle'>] : children}
              {children}
            </div>
          </div>
        </>
      )}
    </>
  );
};
