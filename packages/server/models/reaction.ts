import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';

export interface IReaction {
  id: number;
  topicId?: number;
  commentId?: number;
  emoji: string;
  creatorId: number;
  createdAt: Date;
}

export const reactionModel: ModelAttributes<Model, IReaction> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  topicId: {
    type: DataType.INTEGER,
    allowNull: true,
    references: {
      model: 'Topics',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  commentId: {
    type: DataType.INTEGER,
    allowNull: true,
    references: {
      model: 'TopicComments',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  emoji: {
    type: DataType.STRING(10),
    allowNull: false,
  },
  creatorId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  },
};
