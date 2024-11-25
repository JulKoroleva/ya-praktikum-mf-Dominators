import React from 'react';
import styles from './Popup.module.scss';

type TPopupProps = {
  children: React.ReactNode;
  open: boolean;
  withOverlay?: boolean;
};

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
