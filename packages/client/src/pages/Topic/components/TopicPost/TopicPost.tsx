import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Comment } from './components';
import { FormComponent, Navigation } from '@/components';

import { selectTopicList } from '@/redux/selectors';

import { usePage } from '@/services/hooks';

import { ROUTES } from '@/constants/routes';
import { topicPostFormData, topicPostFormDataInitialValues } from './topicPostFormData';

import { initForumPage } from '@/pages/Forum/Forum';

import { ITopicPostProps } from './TopicPost.interface';
import { TTopic } from '@/pages/Forum/components';

import styles from './TopicPost.module.scss';
import { Reactions } from '@/components/EmojiReactions/EmojiReactions';

export function TopicPost({ id }: ITopicPostProps) {
  const navigate = useNavigate();

  const [topicData, setTopicData] = useState<TTopic | null>(null);

  const topicListFromServer = useSelector(selectTopicList);

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const res = topicListFromServer.find(topic => topic.id === id);
    if (res) {
      setTopicData(res);
    } else {
      navigate('/error404');
    }
  }, [id, topicListFromServer]);

  const onSubmit = (data: Record<string, string>) => {
    return data;
  };

  usePage({ initPage: initForumPage });

  return (
    <div className={`${styles['topic-post']} ${styles['fade-in']}`}>
      <Navigation title={`Discussion #${id}`} to={ROUTES.forum()} />
      <div
        className={styles['topic-post__container']}
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}>
        <div className={styles['topic-post__info']}>
          <span className={styles['topic-post__topic-author']}>{topicData?.creator}</span>
          <span className={styles['topic-post__topic-date']}>
            {topicData?.createdAt.includes('-')
              ? new Date(topicData?.createdAt).toDateString()
              : topicData?.createdAt}
          </span>
        </div>
        <span className={styles['topic-post__topic-title']}>{topicData?.title}</span>
        <span className={styles['topic-post__topic-text']}>{topicData?.description}</span>
        {topicData !== null && <Reactions id={id} type="topic" reactions={topicData.reactions} />}
        {showPopup && (
          <div className={styles['reaction-popup']} onClick={() => setShowPopup(false)}>
            <Reactions id={id} type="topic" />
          </div>
        )}
      </div>
      <div className={styles['topic-post__container']}>
        {topicData?.messages.map(comment => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
      <div
        className={`${styles['topic-post__comment-wrapper']} ${styles['topic-post__container']}`}>
        <FormComponent
          fields={topicPostFormData}
          onSubmit={onSubmit}
          initialValues={topicPostFormDataInitialValues}
          submitButtonText="Publish"
        />
      </div>
    </div>
  );
}
