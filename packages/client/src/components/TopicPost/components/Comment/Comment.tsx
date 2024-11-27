import styles from './Comment.module.scss';
import { TCommentProps } from './Comment.types';

function Comment({ comment }: TCommentProps) {
  const { author, createdAt, message } = comment;
  return (
    <div className={styles.comment}>
      <div className={styles.comment__info}>
        <span className={styles.comment__author}>{author}</span>
        <span className={styles.comment__date}>{createdAt}</span>
      </div>
      <p className={styles.comment__text}>{message}</p>
    </div>
  );
}

export default Comment;
