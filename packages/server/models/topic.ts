import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';

export interface ITopic {
  id: number;
  creator: string;
  creatorId: number;
  comments: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const topicModel: ModelAttributes<Model, ITopic> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  creator: {
    type: DataType.TEXT,
    allowNull: false,
  },
  creatorId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  comments: {
    type: DataType.INTEGER,
    defaultValue: 0,
  },
  title: {
    type: DataType.TEXT,
  },
  description: {
    type: DataType.TEXT,
  },
  createdAt: {
    type: DataType.DATE,
  },
  updatedAt: {
    type: DataType.DATE,
  },
};
