import React from 'react';
import ReactDOM from 'react-dom/client';
import { MockPage } from './MockPage';

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <MockPage />
  </React.StrictMode>,
);
