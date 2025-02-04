import { motion, AnimatePresence } from 'framer-motion';

import { ListItem } from './components';
import { ITopicListProps } from './TopicList.interface';
import styles from './TopicList.module.scss';

export function TopicList({ topicList }: ITopicListProps) {
  return (
    <div className={styles['topic-list']}>
      <AnimatePresence>
        {topicList.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}>
            <ListItem key={item.id} topic={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
