import { IPopupProps } from './Popup.interface';
import closeIcon from '@/assets/icons/close.svg';
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
        {onClose && (
          <img src={closeIcon} alt="close" className={styles.popup__close} onMouseUp={onClose} />
        )}
      </div>
    </>
  );
}
