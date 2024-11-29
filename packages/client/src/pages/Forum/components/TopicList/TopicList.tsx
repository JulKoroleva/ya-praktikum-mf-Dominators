import ListItem from '../ListItem/ListItem';
import styles from './TopicList.module.scss';
import { TTopicListProps } from './TopicList.types';

function TopicList({ topicList }: TTopicListProps) {
  return (
    <div className={styles['topic-list']}>
      {topicList.map(item => (
        <ListItem key={item.id} topic={item} />
      ))}
    </div>
  );
}

export default TopicList;
