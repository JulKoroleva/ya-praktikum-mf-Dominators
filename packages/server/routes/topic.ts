import { checkAuthMiddleware } from '../middlewares/index';
import { topicController } from '../controllers/topic';
import { Router } from 'express';
import { validation } from '../middlewares';

export const topicRouter = Router();

topicRouter.get('/forum', validation.getAllTopicsQuery, topicController.getAllTopics);
topicRouter.post(
  '/forum',
  checkAuthMiddleware,
  validation.createTopicInfo,
  topicController.createTopic,
);
topicRouter.get('/forum/:id', validation.idParams, topicController.getTopic);
topicRouter.post(
  '/forum/:id/comments',
  checkAuthMiddleware,
  validation.createCommentInfo,
  topicController.createComment,
);

topicRouter.delete('/forum/:id', validation.deleteTopic, topicController.deleteTopic);
topicRouter.delete('/forum/:id/comments', validation.deleteComment, topicController.deleteComment);
