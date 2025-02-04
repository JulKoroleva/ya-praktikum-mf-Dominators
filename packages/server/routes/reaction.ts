import { Router } from 'express';
import { reactionController } from '../controllers/reaction';
import { checkAuthMiddleware, validation } from '../middlewares';

const reactionRouter = Router();

reactionRouter.post(
  '/forum/topic/:id/reactions',
  checkAuthMiddleware,
  validation.addReaction,
  reactionController.addReaction,
);
reactionRouter.post(
  '/forum/comment/:id/reactions',
  checkAuthMiddleware,
  validation.addReaction,
  reactionController.addReaction,
);

reactionRouter.get(
  '/forum/topic/:id/reactions',
  validation.getReactions,
  reactionController.getReactions,
);
reactionRouter.get(
  '/forum/comment/:id/reactions',
  validation.getReactions,
  reactionController.getReactions,
);

reactionRouter.delete(
  '/forum/topic/:id/reactions',
  checkAuthMiddleware,
  validation.deleteReaction,
  reactionController.deleteReaction,
);

reactionRouter.delete(
  '/forum/comment/:id/reactions',
  checkAuthMiddleware,
  validation.deleteReaction,
  reactionController.deleteReaction,
);

export { reactionRouter };
