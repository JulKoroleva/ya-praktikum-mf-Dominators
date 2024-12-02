import { ListItem } from './components';
import { ITopicListProps } from './TopicList.interface';
import styles from './TopicList.module.scss';

export function TopicList({ topicList }: ITopicListProps) {
  return (
    <div className={styles['topic-list']}>
      {topicList.map(item => (
        <ListItem key={item.id} topic={item} />
      ))}
    </div>
  );
}
