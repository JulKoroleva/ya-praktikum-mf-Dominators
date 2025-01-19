import { topicModel } from './models/topic';
import { topicCommentModel } from './models/topicComment';
import { sequelize } from './db';

// Инициализируем модели
const Topic = sequelize.define('Topic', topicModel);
const TopicComment = sequelize.define('TopicComment', topicCommentModel);

// Настройка ассоциаций
Topic.hasMany(TopicComment, { foreignKey: 'topicId', as: 'commentsList' });
TopicComment.belongsTo(Topic, { foreignKey: 'topicId', as: 'topic' });

export { Topic, TopicComment };
