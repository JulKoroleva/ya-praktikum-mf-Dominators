import dotenv from 'dotenv';
import cors from 'cors';
import { resolve } from 'path';
import express, { json } from 'express';
import cookieParser from 'cookie-parser';

import { readFile } from 'fs/promises';
import https from 'https';

dotenv.config({ path: resolve(__dirname, '../../.env') });

import { createClientAndConnect } from './db';
import { mainRouter } from './routes/main';

const app = express();

const corsOptions = {
  origin: [
    'https://localhost:3434',
    `http://localhost:${process.env.CLIENT_PORT}`,
    `http://51.250.28.166:${process.env.CLIENT_PORT}`,
    `https://51.250.28.166:${process.env.CLIENT_PORT}`,
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
};

app.use(json(), cookieParser(), cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://localhost:3434');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
});

const port = Number(process.env.SERVER_PORT) || 3001;

createClientAndConnect();

// Функция для загрузки сертификатов
const getSSLOptions = async () => {
  return {
    key: await readFile('cert.key'), // Приватный ключ
    cert: await readFile('cert.pem'), // Сертификат
  };
};

// Запускаем сервер с HTTPS
const startServer = async () => {
  const options = await getSSLOptions();

  https.createServer(options, app).listen(port, () => {
    console.log(`  ➜ 🔒 HTTPS Server is running on https://localhost:${port}`);
  });
};

startServer();

app.use(mainRouter);
