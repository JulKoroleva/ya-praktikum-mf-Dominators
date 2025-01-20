import dotenv from 'dotenv';
import cors from 'cors';
import { resolve } from 'path';
dotenv.config({ path: resolve(__dirname, '../../.env') });

import express from 'express';
import { topicController } from './controllers';
import { createClientAndConnect } from './db';

const app = express();
app.use(cors());
const port = Number(process.env.SERVER_PORT) || 3001;

createClientAndConnect();

const jsonParser = express.json();

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)');
});

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});

app.get('/user', (_, res) => {
  res.json({ name: '</script>Степа', secondName: 'Степанов' });
});

app.get('/forum', topicController.getAllTopics);

app.post('/forum', jsonParser, topicController.createTopic);
