import { ROUTES } from '@/constants/routes';
import styles from './ListItem.module.scss';
import { TListItemProps } from './ListItem.types';
import { useNavigate } from 'react-router-dom';

function ListItem({ topic }: TListItemProps) {
  const { id, title, createdAt, description, creator, messages } = topic;
  const navigate = useNavigate();

  const handleReadTopic = () => {
    navigate(ROUTES.topic(id));
  };

  return (
    <div className={styles['list-item']} onClick={handleReadTopic}>
      <div className={styles['list-item__header']}>
        <span className={styles['list-item__author']}>{creator}</span>
        <span className={styles['list-item__message-count']}>
          {messages.length !== 0 && messages.length}
        </span>
      </div>
      <div className={styles['list-item__info']}>
        <span className={styles['list-item__id']}>#{id}</span>
        <span className={styles['list-item__date']}>{createdAt}</span>
      </div>
      <span className={styles['list-item__name']}>{title}</span>
      <span className={styles['list-item__text']}>{description}</span>
    </div>
  );
}

export default ListItem;
