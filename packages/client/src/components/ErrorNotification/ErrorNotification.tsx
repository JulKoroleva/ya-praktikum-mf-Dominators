import React, { ComponentType } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import styles from './ErrorNotification.module.scss';

const FallbackComponent: ComponentType<FallbackProps> = ({ error }) => (
  <div className={styles['notification-error']}>
    <h1>Something went wrong</h1>
    <p>{error.message}</p>
  </div>
);

export const ErrorNotification = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary FallbackComponent={FallbackComponent}>{children}</ErrorBoundary>
);
