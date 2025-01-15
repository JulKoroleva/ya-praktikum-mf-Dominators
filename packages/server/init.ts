import { topicModel } from './models/topic';
import { sequelize } from './db';

// Инициализируем модели
export const Topic = sequelize.define('Topic', topicModel, {});
