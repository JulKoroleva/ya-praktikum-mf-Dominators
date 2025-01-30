import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';

export interface ITopicComment {
  id: number;
  topicId: number;
  creator: string;
  creatorId: number;
  message: string;
}

export const topicCommentModel: ModelAttributes<Model, ITopicComment> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  topicId: {
    type: DataType.INTEGER,
    references: {
      model: 'Topics',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  creator: {
    type: DataType.TEXT,
    allowNull: false,
  },
  creatorId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataType.STRING,
  },
};
