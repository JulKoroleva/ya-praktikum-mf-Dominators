import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Request as ExpressRequest } from 'express';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';

import { createFetchRequest } from './entry-server.utils';
import { routes } from './routes';
import { reducer } from './redux/store/store';
import { fetchUserThunk } from "./redux/requests/globalRequests";

export const render = async (req: ExpressRequest) => {
  // 1. Создаёт вспомогательные данные.
  const { query, dataRoutes } = createStaticHandler(routes);
  // 2. Создаёт node Request из ExpressRequest.
  const fetchRequest = createFetchRequest(req);
  // 3. Создаёт контекст для роутера, в нем будет находиться информация, которая доступна на клиенте «из коробки».
  const context = await query(fetchRequest);
  // 4. Если context — это Response, то приходит к выводу, что сейчас идёт процесс редиректа и поэтому выбрасывает исключение.
  if (context instanceof Response) {
    throw context;
  }
  // 5. Оставляет конфигурацию стора без изменений.
  const store = configureStore({
    reducer,
  });

  // 6. Создаёт статический роутер, чтобы на сервере можно было отрендерить HTML-разметку.
  const router = createStaticRouter(dataRoutes, context);

  await store.dispatch(fetchUserThunk())

  // 7. Рендерит разметку.
  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>,
    ),
    initialState: store.getState(),
  };
};
