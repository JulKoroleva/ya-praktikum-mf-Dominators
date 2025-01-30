import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { IListItemProps } from './ListItem.interface';
import styles from './ListItem.module.scss';

import { Reactions } from '@/components/EmojiReactions/EmojiReactions';

export function ListItem({ topic }: IListItemProps) {
  const { id, title, createdAt, description, creator, commentsList, reactions } = topic;
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const handleReadTopic = () => {
    navigate(ROUTES.topic(id));
  };

  return (
    <div className={styles['list-item']} onClick={handleReadTopic}>
      <div className={styles['list-item__container']} onMouseEnter={() => setShowPopup(true)}>
        <div className={styles['list-item__header']}>
          <span className={styles['list-item__author']}>{creator}</span>
          <span className={styles['list-item__message-count']}>
            {commentsList?.length !== 0 && commentsList?.length}
          </span>
        </div>
        <div className={styles['list-item__info']}>
          <span className={styles['list-item__id']}>#{id}</span>
          <span className={styles['list-item__date']}>
            {createdAt.includes('-') ? new Date(createdAt).toDateString() : createdAt}
          </span>
        </div>
        <span className={styles['list-item__title']}>{title}</span>
        <span className={styles['list-item__description']}>{description}</span>

        <Reactions id={id} type="topic" reactions={reactions} />
      </div>

      {showPopup && (
        <div className={styles['reaction-popup']} onClick={() => setShowPopup(false)}>
          <Reactions id={id} type="topic" />
        </div>
      )}
    </div>
  );
}
