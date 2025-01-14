import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';

export interface ITopic {
  creator?: string;
  title: string;
  createdAt?: Date;
  comments?: number;
  description: string;
}

export const topicModel: ModelAttributes<Model, ITopic> = {
  creator: {
    type: DataType.TEXT,
  },
  title: {
    type: DataType.TEXT,
  },
  createdAt: {
    type: DataType.DATE,
  },
  comments: {
    type: DataType.INTEGER,
  },
  description: {
    type: DataType.TEXT,
  },
};
