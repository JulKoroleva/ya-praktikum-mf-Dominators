import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { IListItemProps } from './ListItem.interface';
import styles from './ListItem.module.scss';

import { Reactions } from '@/components/EmojiReactions/EmojiReactions';
import { useEmojiPopupVisibility } from '@/hooks/useEmojiPopupVisibility.hook';

export function ListItem({ topic }: IListItemProps) {
  const { id, title, createdAt, description, creator, comments, reactions } = topic;
  const { showPopup, handleMouseEnter } = useEmojiPopupVisibility();
  const navigate = useNavigate();

  const handleReadTopic = () => {
    navigate(ROUTES.topic(id));
  };

  return (
    <div className={styles['list-item']} onClick={handleReadTopic}>
      <div className={styles['list-item__container']} onMouseEnter={handleMouseEnter}>
        <div className={styles['list-item__header']}>
          <span className={styles['list-item__author']}>{creator}</span>
          {comments !== 0 && <span className={styles['list-item__message-count']}>{comments}</span>}
        </div>
        <div className={styles['list-item__info']}>
          <span className={styles['list-item__date']}>
            {createdAt.includes('-') ? new Date(createdAt).toDateString() : createdAt}
          </span>
        </div>
        <span className={styles['list-item__title']}>{title}</span>
        <span className={styles['list-item__description']}>{description}</span>

        <Reactions id={id} type="topic" reactions={reactions} />
      </div>

      <div className={styles['reaction-popup']}>
        <Reactions id={id} type="topic" showPopup={showPopup} />
      </div>
    </div>
  );
}
