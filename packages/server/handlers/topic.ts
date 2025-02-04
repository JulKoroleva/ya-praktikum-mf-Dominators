import { ITopic } from '../models/topic';
import { ITopicComment } from '../models/topicComment';
import { Topic, TopicComment } from '../init';
import { Sequelize } from 'sequelize';

interface IPaginationOptions {
  limit: number;
  offset: number;
}

export async function createTopic(args: Partial<ITopic>) {
  return Topic.create({
    creatorId: args.creatorId,
    creator: args.creator,
    title: args.title,
    description: args.description,
    comments: 0,
  });
}

export async function getAllTopics(paginationOptions: IPaginationOptions) {
  const topicList = await Topic.findAll({
    ...paginationOptions,
    order: [['id', 'DESC']],
    attributes: {
      include: [
        [
          Sequelize.literal(`(
            SELECT CAST(COUNT(*) AS INTEGER)
            FROM "TopicComments"
            WHERE "TopicComments"."topicId" = "Topic"."id"
          )`),
          'comments',
        ],
      ],
    },
  });
  const totalCount = await Topic.count();
  return {
    topicList,
    paginationOptions: {
      total: totalCount,
      perPage: topicList.length,
    },
  };
}

export async function getTopic(topicId: number) {
  const topic = await Topic.findByPk(topicId, {
    include: [
      {
        model: TopicComment,
        as: 'commentsList',
      },
    ],
    attributes: {
      include: [
        [
          Sequelize.literal(`(
            SELECT CAST(COUNT(*) AS INTEGER)
            FROM "TopicComments"
            WHERE "TopicComments"."topicId" = "Topic"."id"
          )`),
          'comments',
        ],
      ],
    },
  });

  return topic ? topic.toJSON() : null;
}

export async function createComment(args: Partial<ITopicComment>) {
  return TopicComment.create({
    topicId: args.topicId,
    creatorId: args.creatorId,
    creator: args.creator,
    message: args.message,
  });
}

export async function deleteTopic(topicId: number) {
  await TopicComment.destroy({
    where: { topicId },
  });

  await Topic.destroy({
    where: { id: topicId },
  });
}

export async function deleteComment(commentId: number) {
  await TopicComment.destroy({
    where: { id: commentId },
  });
}
