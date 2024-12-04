import { ReactNode } from 'react';

export interface IUniversalModalProps {
  show: boolean;
  onHide: () => void;
  title?: string;
  children?: ReactNode;
  modalSize?: 'ct' | 'sm' | 'lg' | 'xl';
  status?: string;
  zIndex?: number;
}

export interface IModalConfig {
  show: boolean;
  header: string;
  status: undefined | string;
}
