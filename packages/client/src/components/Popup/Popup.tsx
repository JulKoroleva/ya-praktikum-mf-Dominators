import styles from './Popup.module.scss';
import { TPopupProps } from './Popup.types';
import closeIcon from '@/assets/icons/close.svg';

function Popup({ open, withOverlay = false, children, onClose }: TPopupProps) {
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

export default Popup;
