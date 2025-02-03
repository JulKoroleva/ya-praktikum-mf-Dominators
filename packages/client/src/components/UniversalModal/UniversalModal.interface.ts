import { ReactNode } from 'react';

export type TModalStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
export interface IUniversalModalProps {
  show: boolean;
  onHide: () => void;
  title?: string;
  children?: ReactNode;
  modalSize?: 'ct' | 'sm' | 'lg' | 'xl';
  status?: TModalStatus;
  zIndex?: number;
}

export interface IModalConfig {
  show: boolean;
  header: string;
  status?: TModalStatus;
  children?: ReactNode;
}
