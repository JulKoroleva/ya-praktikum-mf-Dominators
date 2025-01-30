import { Reactions } from '@/components/EmojiReactions/EmojiReactions';
import { IComment } from './Comment.interface';

import styles from './Comment.module.scss';
import { useState } from 'react';

export function Comment({ comment }: IComment) {
  const { id, creator, createdAt, message, reactions } = comment;
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div
      className={styles.comment}
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}>
      <div className={styles.comment__info}>
        <span className={styles.comment__author}>{creator}</span>
        <span className={styles.comment__date}>
          {createdAt.includes('-') ? new Date(createdAt).toDateString() : createdAt}
        </span>
      </div>
      <p className={styles.comment__text}>{message}</p>
      <Reactions id={id} type="comment" reactions={reactions} />
      {showPopup && (
        <div className={styles['reaction-popup']} onClick={() => setShowPopup(false)}>
          <Reactions id={id} type="comment" />
        </div>
      )}
    </div>
  );
}
