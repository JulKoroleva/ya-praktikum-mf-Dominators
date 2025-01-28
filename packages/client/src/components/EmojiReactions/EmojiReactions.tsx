import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addReaction,
  deleteReaction,
} from '@/redux/requests/pagesRequests/forumRequests/forumRequests';
import { selectUser } from '@/redux/selectors';
import { TypeDispatch } from '@/redux/store';
import styles from './EmojiReactions.module.scss';

interface ReactionProps {
  id: number;
  type: 'topic' | 'comment';
  reactions?: { emoji: string; count: number; users: number[] }[];
}

export function Reactions({ id, type, reactions }: ReactionProps) {
  const dispatch = useDispatch<TypeDispatch>();
  const userInfo = useSelector(selectUser);
  const [showPopup, setShowPopup] = useState(reactions === undefined); // Открываем попап, если reactions нет

  const handleReactionClick = async (event: React.MouseEvent, emoji: string) => {
    event.stopPropagation();

    if (reactions) {
      const reaction = reactions.find(r => r.emoji === emoji);
      const hasReacted = reaction ? reaction.users.includes(userInfo.id) : false;

      if (hasReacted) {
        try {
          await dispatch(deleteReaction({ id, type, emoji }));
          console.log('Reaction removed');
        } catch (error) {
          console.error('Failed to remove reaction', error);
        }
      } else {
        try {
          await dispatch(addReaction({ id, type, emoji }));
          console.log('Reaction added');
        } catch (error) {
          console.error('Failed to add reaction', error);
        }
      }
    } else {
      try {
        dispatch(addReaction({ id, type, emoji }));
        console.log('Reaction added');
        setShowPopup(false);
      } catch (error) {
        console.error('Failed to add reaction', error);
      }
    }
  };

  return (
    <div className={styles['reactions-container']}>
      {/* Отображаем список реакций */}
      {reactions && reactions.length > 0 && (
        <div
          className={`${styles['reactions-list']} ${
            type === 'comment' ? styles['comment'] : 'topic'
          }`}>
          {reactions.map(({ emoji, count }) => (
            <span
              key={emoji}
              className={`${styles['reaction-item']} ${
                reactions.find(r => r.emoji === emoji)?.users.includes(userInfo.id)
                  ? styles['active-reaction']
                  : ''
              }`}
              onClick={event => handleReactionClick(event, emoji)}>
              {emoji} {count}
            </span>
          ))}
        </div>
      )}

      {/* Отображаем попап, если он открыт */}
      {showPopup && (
        <div className={styles['reaction-popup']} onClick={() => setShowPopup(false)}>
          {['👍', '❤️', '😂', '🔥', '😢'].map(emoji => (
            <button
              key={emoji}
              className={styles['reaction-button']}
              onClick={event => handleReactionClick(event, emoji)}>
              <Emoji emoji={emoji} />;
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
