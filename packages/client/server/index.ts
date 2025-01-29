import dotenv from 'dotenv';
import serialize from 'serialize-javascript';
import fs from 'fs/promises';
import { createServer as createViteServer, ViteDevServer } from 'vite';
import express, { Request as ExpressRequest } from 'express';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const port = process.env.CLIENT_PORT || 3000;
const clientPath = path.join(__dirname, '..');
const isDev = process.env.NODE_ENV === 'development';

async function createServer() {
  const app = express();

  let vite: ViteDevServer | undefined;

  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
      define: {
        __SERVER_PORT__: process.env.SERVER_PORT,
        __INTERNAL_SERVER_URL__: JSON.stringify(`http://localhost:${process.env.SERVER_PORT}`),
      },
    });

    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(clientPath, 'dist/client')));
  }

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let render: (req: ExpressRequest) => Promise<{ html: string; initialState: unknown }>;
      let template: string;

      if (vite) {
        template = await fs.readFile(path.resolve(clientPath, 'index.html'), 'utf-8');

        // Применяем встроенные HTML-преобразования Vite и плагинов
        template = await vite.transformIndexHtml(url, template);

        // Загружаем модуль клиента, который писали выше,
        // он будет рендерить HTML-код
        render = (await vite.ssrLoadModule(path.join(clientPath, 'src/entry-server.tsx'))).render;
      } else {
        template = await fs.readFile(path.join(clientPath, 'dist/client/index.html'), 'utf-8');

        // Получаем путь до модуля клиента, чтобы не тащить средства сборки клиента на сервер
        const pathToServer = path.join(clientPath, 'dist/server/entry-server.js');

        // Импортируем этот модуль и вызываем с начальным состоянием
        render = (await import(pathToServer)).render;
      }

      // Получаем HTML-строку из JSX
      const { html: appHtml, initialState } = await render(req);

      // Заменяем комментарий на сгенерированную HTML-строку
      const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace(
        `<!--ssr-initial-state-->`,
        `<script>window.APP_INITIAL_STATE = ${serialize(initialState, {
          isJSON: true,
        })}</script>`,
      );

      // Завершаем запрос и отдаём HTML-страницу
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      // vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  app.listen(port, () => {
    console.log(`Client is listening on port: ${port}`);
  });
}

createServer();
