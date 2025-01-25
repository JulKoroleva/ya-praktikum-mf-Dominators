import { IComment } from './Comment.interface';

import styles from './Comment.module.scss';

export function Comment({ comment }: IComment) {
  const { creator, createdAt, message } = comment;
  return (
    <div className={styles.comment}>
      <div className={styles.comment__info}>
        <span className={styles.comment__author}>{creator}</span>
        <span className={styles.comment__date}>
          {createdAt.includes('-') ? new Date(createdAt).toDateString() : createdAt}
        </span>
      </div>
      <p className={styles.comment__text}>{message}</p>
    </div>
  );
}
