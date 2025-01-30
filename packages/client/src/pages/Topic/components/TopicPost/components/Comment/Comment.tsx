import { Reactions } from '@/components/EmojiReactions/EmojiReactions';
import { IComment } from './Comment.interface';

import styles from './Comment.module.scss';
import { useEmojiPopupVisibility } from '@/hooks/useEmojiPopupVisibility.hook';

export function Comment({ comment }: IComment) {
  const { id, creator, createdAt, message, reactions } = comment;
  const { showPopup, handleMouseEnter, handleMouseLeave } = useEmojiPopupVisibility(0);

  return (
    <div className={styles.comment} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={styles.comment__info}>
        <span className={styles.comment__author}>{creator}</span>
        <span className={styles.comment__date}>
          {createdAt.includes('-') ? new Date(createdAt).toDateString() : createdAt}
        </span>
      </div>
      <p className={styles.comment__text}>{message}</p>
      <Reactions id={id} type="comment" reactions={reactions} />

      <div className={styles['reaction-popup']}>
        <Reactions id={id} type="comment" showPopup={showPopup} />
      </div>
    </div>
  );
}
