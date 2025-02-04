import { Router } from 'express';
import { topicRouter } from './topic';
import { themeRouter } from './theme';
import { errorsController } from '../controllers';
import { errors } from 'celebrate';
import { reactionRouter } from './reaction';

export const mainRouter = Router();

mainRouter.use(topicRouter);
mainRouter.use(reactionRouter);
mainRouter.use(themeRouter);

mainRouter.use('*', errorsController.generateNotFoundError);
mainRouter.use(errorsController.catchCelebrateErrors);
mainRouter.use(errors());
mainRouter.use(errorsController.catchErrors);
