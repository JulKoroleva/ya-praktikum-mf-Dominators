import { Request, Response, NextFunction } from 'express';
import { Reaction } from '../init';
import { IReaction } from '../models/reaction';

const REACTION_TYPES = {
  TOPIC: 'topic',
  COMMENT: 'comment',
};

class ReactionController {
  async addReaction(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { emoji, type, creatorId } = req.body;

      if (![REACTION_TYPES.TOPIC, REACTION_TYPES.COMMENT].includes(type)) {
        return res.status(400).send({ error: 'Invalid reaction type' });
      }
      const existingReaction = await Reaction.findOne({
        where: {
          [`${type}Id`]: Number(id),
          emoji,
          creatorId,
        },
      });

      if (existingReaction) {
        return res.status(400).send({ error: 'User has already reacted with this emoji' });
      }

      const reaction = await Reaction.create({
        [`${type}Id`]: Number(id),
        emoji,
        creatorId,
      });
      return res.send(reaction);
    } catch (err) {
      return next(err);
    }
  }

  async getReactions(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const type = req.query.type as string | undefined;

      if (!type || ![REACTION_TYPES.TOPIC, REACTION_TYPES.COMMENT].includes(type)) {
        return res.status(400).send({ error: 'Invalid reaction type' });
      }

      const reactionFilter = { [`${type}Id`]: Number(id) };

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

      res.send({ reactions: formattedReactions });
    } catch (err) {
      return next(err);
    }
  }

  async deleteReaction(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { type, emoji, creatorId } = req.body;

      if (![REACTION_TYPES.TOPIC, REACTION_TYPES.COMMENT].includes(type)) {
        return res.status(400).send({ error: 'Invalid reaction type' });
      }

      const reactionFilter = { emoji, creatorId, [`${type}Id`]: Number(id) };
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
