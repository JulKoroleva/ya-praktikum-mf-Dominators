import { useState } from 'react';
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

interface ReactionProps {
  id: number;
  type: 'topic' | 'comment';
  reactions?: { emoji: string; count: number; users?: number[] }[];
  showPopup?: boolean
}

export function Reactions({ id, type, reactions = [], showPopup }: ReactionProps) {
  const dispatch = useDispatch<TypeDispatch>();
  const userInfo = useSelector(selectUser);
  const { id: urlId } = useParams();
  // const [showPopup, setShowPopup] = useState(reactions.length === 0);

  const handleReactionClick = async (event: React.MouseEvent, emoji: string) => {
    event.stopPropagation();

    if (!userInfo.id) return;

    const reaction = reactions?.find(r => r.emoji === emoji);
    const hasReacted = reaction?.users?.includes(userInfo.id) ?? false;

    console.log('Current reactions:', reactions);

    try {
      if (hasReacted) {
        await dispatch(deleteReaction({ id, type, emoji, creatorId: userInfo.id })).unwrap();
      } else {
        await dispatch(addReaction({ id, type, emoji, creatorId: userInfo.id })).unwrap();
      }
    } catch (error) {
      console.error('Failed to update reaction', error);
    } finally {
      if (location.pathname === '/forum') {
        dispatch(fetchForum({ pageNumber: 1 }));
      } else if (/^\/forum\/\d+$/.test(location.pathname)) {
        console.log('urlId', urlId);
        dispatch(getTopicById({ id: Number(urlId) }));
      }
    }
  };

  return (
    <div className={styles['reactions-container']}>
      {reactions && reactions.length > 0 && (
        <div
          className={`${styles['reactions-list']} ${
            type === 'comment' ? styles['comment'] : 'topic'
          }`}>
          {reactions.map(({ emoji, count }) => (
            <span
              key={emoji}
              className={`${styles['reaction-item']} ${
                (reactions.find(r => r.emoji === emoji)?.users ?? []).includes(userInfo.id)
                  ? styles['active-reaction']
                  : ''
              }`}
              onClick={event => handleReactionClick(event, emoji)}>
              {emoji} {count}
            </span>
          ))}
        </div>
      )}

      {showPopup && (
        <div className={styles['reaction-popup']}>
          {['👍', '❤️', '😂', '🔥', '😢'].map(emoji => (
            <button
              key={emoji}
              className={styles['reaction-button']}
              onClick={event => handleReactionClick(event, emoji)}>
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
