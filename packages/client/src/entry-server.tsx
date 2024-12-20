import React from 'react';
import ReactDOM from 'react-dom/server';
import { MockPage } from './MockPage';

export const render = () => ReactDOM.renderToString(<MockPage />);
