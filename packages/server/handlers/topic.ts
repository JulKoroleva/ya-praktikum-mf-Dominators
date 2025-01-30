import { ITopic } from '../models/topic';
import { ITopicComment } from '../models/topicComment';
import { Topic, TopicComment } from '../init';
import { Sequelize } from 'sequelize';

interface IPaginationOptions {
  limit: number;
  offset: number;
}

// Создание топика
export async function createTopic(args: Partial<ITopic>) {
  return Topic.create({
    creatorId: args.creatorId, // 🔥 Добавляем creatorId
    creator: args.creator,
    title: args.title,
    description: args.description,
    comments: 0,
  });
}

// Получить список всех топиков
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

// Получить топик
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

// Создать комментарий к топику
export async function createComment(args: Partial<ITopicComment>) {
  return TopicComment.create({
    topicId: args.topicId,
    creatorId: args.creatorId,
    creator: args.creator,
    message: args.message,
  });
}
