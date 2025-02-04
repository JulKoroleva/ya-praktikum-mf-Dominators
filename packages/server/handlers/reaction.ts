import { Reaction } from '../init';
import { IReaction } from '../models/reaction';
import { Op } from 'sequelize';

export async function getReactionsForEntity(ids: number[], type: 'topic' | 'comment') {
  if (!ids.length) {
    return {};
  }

  const reactions = await Reaction.findAll({
    where: {
      [`${type}Id`]: { [Op.in]: ids },
    },
    attributes: ['emoji', 'creatorId', `${type}Id`],
  });

  const reactionMap = reactions.reduce(
    (acc: Record<number, { emoji: string; count: number; users: number[] }[]>, reaction) => {
      const reactionData = reaction.get() as IReaction;
      const entityId = reactionData[`${type}Id`] as number | undefined;

      if (entityId === undefined) {
        return acc;
      }

      if (!acc[entityId]) {
        acc[entityId] = [];
      }

      const existingReaction = acc[entityId].find(r => r.emoji === reactionData.emoji);
      if (existingReaction) {
        existingReaction.count += 1;
        if (!existingReaction.users.includes(reactionData.creatorId)) {
          existingReaction.users.push(reactionData.creatorId);
        }
      } else {
        acc[entityId].push({
          emoji: reactionData.emoji,
          count: 1,
          users: [reactionData.creatorId],
        });
      }

      return acc;
    },
    {} as Record<number, { emoji: string; count: number; users: number[] }[]>,
  );

  return reactionMap;
}
