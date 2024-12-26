import React, { ComponentType } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { IErrorNotificationProps } from './ErrorNotification.interface';
import styles from './ErrorNotification.module.scss';

const FallbackComponent: ComponentType<FallbackProps> = ({ error }) => (
  <div className={styles['notification-error']}>Something went wrong: {error.message}</div>
);

export const ErrorNotification = ({ children }: IErrorNotificationProps) => (
  <ErrorBoundary FallbackComponent={FallbackComponent}>{children}</ErrorBoundary>
);
