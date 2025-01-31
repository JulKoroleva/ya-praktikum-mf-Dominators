import { useDispatch, useSelector } from 'react-redux';
import {
  addReaction,
  deleteReaction,
  fetchForum,
  getTopicById,
} from '@/redux/requests/pagesRequests/forumRequests/forumRequests';
import { selectUser } from '@/redux/selectors';
import { TypeDispatch } from '@/redux/store';
import styles from './EmojiReactions.module.scss';
import { useParams } from 'react-router-dom';
import EmojiPicker, { Emoji } from 'emoji-picker-react';
import { useMemo } from 'react';

interface ReactionProps {
  id: number;
  type: 'topic' | 'comment';
  reactions?: { emoji: string; count: number; users?: number[] }[];
  showPopup?: boolean;
  emojiRef?: React.RefObject<HTMLDivElement>;
}

export function Reactions({ id, type, reactions = [], showPopup, emojiRef }: ReactionProps) {
  const dispatch = useDispatch<TypeDispatch>();
  const userInfo = useSelector(selectUser);
  const { id: urlId } = useParams();

  const handleReactionClick = async (event: React.MouseEvent, emojiId: string) => {
    event.preventDefault();
    event.stopPropagation();

    if (!userInfo.id) return;

    const reaction = reactions?.find(r => r.emoji === emojiId);
    const hasReacted = reaction?.users?.includes(userInfo.id) ?? false;

    try {
      if (hasReacted) {
        await dispatch(
          deleteReaction({ id, type, emoji: emojiId, creatorId: userInfo.id }),
        ).unwrap();
      } else {
        await dispatch(addReaction({ id, type, emoji: emojiId, creatorId: userInfo.id })).unwrap();
      }
    } catch (error) {
      /* empty */
    } finally {
      if (location.pathname === '/forum') {
        dispatch(fetchForum({ pageNumber: 1 }));
      } else if (/^\/forum\/\d+$/.test(location.pathname)) {
        dispatch(getTopicById({ id: Number(urlId) }));
      }
    }
  };

  const memoizedReactions = useMemo(
    () =>
      reactions.map(({ emoji, count }) => (
        <div
          key={emoji}
          className={`${styles['reaction-item']} ${
            (reactions.find(r => r.emoji === emoji)?.users ?? []).includes(userInfo.id)
              ? styles['active-reaction']
              : ''
          }`}
          onClick={event => handleReactionClick(event, emoji)}>
          <Emoji unified={emoji} size={20} />
          <span className={styles['count']}>{count}</span>
        </div>
      )),
    [reactions, userInfo.id],
  );

  return (
    <div className={styles['reactions-container']} ref={emojiRef}>
      {memoizedReactions.length > 0 && (
        <div
          className={`${styles['reactions-list']} ${
            type === 'comment' ? styles['comment'] : 'topic'
          }`}>
          {memoizedReactions}
        </div>
      )}

      {showPopup && (
        <div className={styles['reaction-popup']}>
          <EmojiPicker
            reactionsDefaultOpen={showPopup}
            allowExpandReactions={false}
            onEmojiClick={(emoji, event) => {
              if (!event) return;
              handleReactionClick(event as unknown as React.MouseEvent, emoji.unified);
            }}
          />
        </div>
      )}
    </div>
  );
}
