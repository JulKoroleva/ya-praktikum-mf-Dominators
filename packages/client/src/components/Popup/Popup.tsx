import styles from './Popup.module.scss';
import { TPopupProps } from './Popup.types';

function Popup({ open, withOverlay = false, children }: TPopupProps) {
  return (
    <>
      {withOverlay && <div className={`${styles.overlay} ${open ? styles.overlay_active : ''}`} />}
      <div className={`${styles.popup} ${open ? styles.popup_active : ''}`}>
        <div className="popup-content">{children}</div>
      </div>
    </>
  );
}

export default Popup;
