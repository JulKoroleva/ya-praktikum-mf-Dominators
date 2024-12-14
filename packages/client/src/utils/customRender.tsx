import React from 'react';
import { Provider } from 'react-redux';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { store } from '@/redux/store/store';

const AllTheProviders: RenderOptions['wrapper'] = ({ children }) => {
  return (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
};

export const customRender = (ui: Parameters<typeof render>[0]) =>
  render(ui, { wrapper: AllTheProviders });
