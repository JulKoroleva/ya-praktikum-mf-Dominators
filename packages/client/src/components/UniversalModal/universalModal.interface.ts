import { ReactNode } from 'react';

export interface IUniversalModal {
  show: boolean;
  onHide: () => void;
  title?: string;
  children?: ReactNode;
  modalSize?: 'sm' | 'lg' | 'xl';
  status?: string;
  zIndex?: number;
}

export interface IModalConfig {
  show: boolean;
  header: string;
  status: undefined | string;
}
