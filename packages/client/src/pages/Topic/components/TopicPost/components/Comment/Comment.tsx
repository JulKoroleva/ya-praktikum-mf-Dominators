import { Reactions } from '@/components/EmojiReactions/EmojiReactions';
import { IComment } from './Comment.interface';

import styles from './Comment.module.scss';
import { useEmojiPopupVisibility } from '@/hooks/useEmojiPopupVisibility.hook';
import { useRef } from 'react';
import { useDeleteForumEntity } from '@/hooks/useDeleteForumEntity';
import { selectUser } from '@/redux/selectors';
import { useSelector } from 'react-redux';
import trashButton from '@/assets/icons/trash.svg';

export function Comment({ comment, topicId }: IComment) {
  const { id, creator, createdAt, message, reactions } = comment;
  const { showPopup, handleMouseEnter, handleMouseLeave } = useEmojiPopupVisibility(0);
  const emojiRef = useRef<HTMLDivElement | null>(null);
  const userInfo = useSelector(selectUser);
  const handleDelete = useDeleteForumEntity();

  return (
    <div
      className={styles.comment}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={emojiRef}>
      <div className={styles.comment__info}>
        <span className={styles.comment__author}>{creator}</span>
        <div>
          {showPopup && userInfo.login === creator && (
            <button
              onClick={e => handleDelete(id, 'comment', e, topicId)}
              className={styles['comment__delete-btn']}>
              <img src={trashButton} alt="delete" />
            </button>
          )}
          <span className={styles.comment__date}>
            {createdAt.includes('-') ? new Date(createdAt).toDateString() : createdAt}
          </span>
        </div>
      </div>
      <p className={styles.comment__text}>{message}</p>
      <Reactions id={id} type="comment" reactions={reactions} />

      {showPopup && (
        <div id="reaction-popup" className={styles['reaction-popup']} ref={emojiRef}>
          <Reactions id={id} type="comment" showPopup={showPopup} emojiRef={emojiRef} />
        </div>
      )}
    </div>
  );
}
