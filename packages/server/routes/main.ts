import { Router } from 'express';
import { topicRouter } from './topic';
import { errorsController } from '../controllers';
import { errors } from 'celebrate';

export const mainRouter = Router();

mainRouter.use(topicRouter);

mainRouter.use('*', errorsController.generateNotFoundError);
mainRouter.use(errorsController.catchCelebrateErrors);
mainRouter.use(errors());
mainRouter.use(errorsController.catchErrors);
