import { Request, Response } from 'express';
import { createTopic, getAllTopics } from '../handlers/topic';

class TopicController {
  async getAllTopics(_: Request, res: Response) {
    try {
      res.json({
        topicList: await getAllTopics(),
        paginationOptions: {
          page: 1,
          total: 5,
        },
      });
    } catch (e) {
      res.status(500).send(e);
    }

    return res;
  }
  async createTopic(req: Request, res: Response) {
    try {
      if (!req.body) {
        res.sendStatus(400);
        return;
      }
      const { title, description } = req.body;

      if (!title || !description) {
        res.status(400).send('Description and title must be filled');
        return;
      }

      const data = {
        title,
        description,
        creator: res.locals.user,
      };

      const topic = await createTopic(data);

      res.send(topic);
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

const topicController = new TopicController();

export { topicController };
