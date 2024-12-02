import React from 'react';

export interface IPopupProps {
  children: React.ReactNode;
  open: boolean;
  withOverlay?: boolean;
  onClose?: () => void;
}
