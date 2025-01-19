import { NextFunction, Request, Response } from 'express';
import { createComment, createTopic, getAllTopics, getTopic } from '../handlers/topic';
import { ForeignKeyConstraintError } from 'sequelize';
import { NotFound } from '../errors';

const PAGE_SIZE = 5;

class TopicController {
  async getAllTopics(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1 } = req.query;

      const currentPage = Number(page);
      const isValidPage = !isNaN(currentPage) && currentPage >= 1;
      const validPage = isValidPage ? currentPage : 1;

      const paginationOptions = {
        limit: PAGE_SIZE,
        offset: (validPage - 1) * PAGE_SIZE,
        page: validPage,
      };

      const dbResponce = await getAllTopics(paginationOptions);

      res.send({
        topicList: dbResponce.topicList,
        paginationOptions: {
          ...dbResponce.paginationOptions,
          page: validPage,
        },
      });
    } catch (err) {
      next(err);
    }

    return res;
  }
  async createTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description } = req.body;

      const { id: creatorId, login: creator } = res.locals.user;

      const data = {
        title,
        description,
        creator,
        creatorId,
        comments: 0,
      };

      const topic = await createTopic(data);

      res.send(topic);
    } catch (err) {
      next(err);
    }
  }
  async getTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const topic = await getTopic(Number(id));

      if (!topic) {
        return next(new NotFound(`Topic with id: ${id} - not found`));
      }

      res.send(topic);
    } catch (err) {
      next(err);
    }
  }
  async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { message } = req.body;

      const { login: creator, id: creatorId } = res.locals.user;

      const data = {
        message,
        creator,
        creatorId,
        topicId: Number(id),
      };

      const comment = await createComment(data);

      res.send(comment);
    } catch (err) {
      if (err instanceof ForeignKeyConstraintError) {
        return next(new NotFound(`Topic not found`));
      }

      next(err);
    }
  }
}

const topicController = new TopicController();

export { topicController };
