import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';

export interface ITheme {
  id: number;
  userId: number;
  darkTheme: boolean;
}

export const themeModel: ModelAttributes<Model, ITheme> = {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataType.INTEGER,
  },
  darkTheme: {
    type: DataType.BOOLEAN,
  },
};
