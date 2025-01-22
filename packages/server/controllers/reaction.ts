import { Request, Response, NextFunction } from 'express';
import { Reaction } from '../init';
import { IReaction } from '../models/reaction';

class ReactionController {
  async addReaction(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { emoji, type } = req.body;
      const { id: creatorId } = res.locals.user;

      if (type === 'topic') {
        const reaction = await Reaction.create({
          topicId: Number(id),
          emoji,
          creatorId,
        });
        return res.send(reaction);
      }

      if (type === 'comment') {
        const reaction = await Reaction.create({
          commentId: Number(id),
          emoji,
          creatorId,
        });
        return res.send(reaction);
      }

      return res.status(400).send({ error: 'Invalid reaction type' });
    } catch (err) {
      return next(err);
    }
  }

  async getReactions(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { type } = req.query;

      let reactionFilter = {};
      if (type === 'topic') {
        reactionFilter = { topicId: Number(id) };
      } else if (type === 'comment') {
        reactionFilter = { commentId: Number(id) };
      } else {
        return res.status(400).send({ error: 'Invalid reaction type' });
      }

      const reactions = await Reaction.findAll({
        where: reactionFilter,
        attributes: ['emoji', 'creatorId'],
      });

      const reactionData: IReaction[] = reactions.map(r => r.get() as IReaction);

      const reactionMap = reactionData.reduce(
        (acc: Record<string, { count: number; users: number[] }>, reaction: IReaction) => {
          const { emoji, creatorId } = reaction;
          if (!acc[emoji]) {
            acc[emoji] = { count: 0, users: [] };
          }
          acc[emoji].count += 1;
          acc[emoji].users.push(creatorId);
          return acc;
        },
        {} as Record<string, { count: number; users: number[] }>,
      );

      const formattedReactions = Object.entries(reactionMap).map(([emoji, data]) => ({
        emoji,
        count: data.count,
        users: data.users,
      }));

      return res.send({ reactions: formattedReactions });
    } catch (err) {
      return next(err);
    }
  }

  async deleteReaction(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { type, emoji } = req.body;
      const { id: userId } = res.locals.user;

      const reactionFilter = { emoji, creatorId: userId };
      if (type === 'topic') {
        Object.assign(reactionFilter, { topicId: Number(id) });
      } else if (type === 'comment') {
        Object.assign(reactionFilter, { commentId: Number(id) });
      } else {
        return res.status(400).send({ error: 'Invalid reaction type' });
      }

      const deletedRows = await Reaction.destroy({ where: reactionFilter });

      if (deletedRows > 0) {
        return res.send({ success: true, message: 'Reaction deleted successfully' });
      } else {
        return res.status(404).send({ error: 'Reaction not found or unauthorized' });
      }
    } catch (err) {
      return next(err);
    }
  }
}

export const reactionController = new ReactionController();
