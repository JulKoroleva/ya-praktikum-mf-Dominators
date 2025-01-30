import { IPopupProps } from './Popup.interface';
import { CloseIcon } from '@/components/Icons';
import styles from './Popup.module.scss';

export function Popup({ open, withOverlay = false, children, onClose }: IPopupProps) {
  return (
    <>
      {withOverlay && (
        <div
          className={`${styles.overlay} ${open ? styles.overlay_active : ''}`}
          onClick={() => {
            onClose && onClose();
          }}
        />
      )}
      <div className={`${styles.popup} ${open ? styles.popup_active : ''}`}>
        <div className="popup-content">{children}</div>
        {onClose && <CloseIcon className={styles.popup__close} onMouseUp={onClose} />}
      </div>
    </>
  );
}
