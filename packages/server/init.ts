import { topicModel, topicCommentModel, reactionModel, themeModel } from './models';
import { sequelize } from './db';

// Инициализируем модели
const Topic = sequelize.define('Topic', topicModel);
const TopicComment = sequelize.define('TopicComment', topicCommentModel);
const Reaction = sequelize.define('Reaction', reactionModel);
const Theme = sequelize.define('Theme', themeModel);

// Настройка ассоциаций
Topic.hasMany(TopicComment, { foreignKey: 'topicId', as: 'commentsList' });
TopicComment.belongsTo(Topic, { foreignKey: 'topicId', as: 'topic' });

// Настройка связи реакций с топиком и комментарием
Topic.hasMany(Reaction, { foreignKey: 'topicId', as: 'reactionList' });
TopicComment.hasMany(Reaction, { foreignKey: 'commentId', as: 'commentReactionList' });

Reaction.belongsTo(Topic, { foreignKey: 'topicId', as: 'topic' });
Reaction.belongsTo(TopicComment, { foreignKey: 'commentId', as: 'comment' });

export { Topic, TopicComment, Reaction, Theme };
