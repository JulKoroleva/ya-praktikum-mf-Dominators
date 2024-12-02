import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { topicsMockData } from '@/pages/Forum/ForumMock';
import { TTopic } from '@/pages/Forum/components';
import { Comment } from './components';
import { FormComponent, Navigation } from '@/components';
import { topicPostFormData, topicPostFormDataInitialValues } from './topicPostFormData';
import { ROUTES } from '@/constants/routes';

import { ITopicPostProps } from './TopicPost.interface';

import styles from './TopicPost.module.scss';

export function TopicPost({ id }: ITopicPostProps) {
  const [topicData, setTopicData] = useState<TTopic | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // fetchData;
    const res = topicsMockData.topics.find(topic => topic.id === id);
    if (res) {
      setTopicData(res);
    } else {
      navigate('/error404');
    }
  }, []);

  const onSubmit = (data: Record<string, string>) => {
    return data;
  };

  return (
    <div className={`${styles['topic-post']} ${styles['fade-in']}`}>
      <Navigation title={`Discussion #${id}`} to={ROUTES.forum()} />
      <div className={styles['topic-post__container']}>
        <div className={styles['topic-post__info']}>
          <span className={styles['topic-post__topic-author']}>{topicData?.creator}</span>
          <span className={styles['topic-post__topic-date']}>{topicData?.createdAt}</span>
        </div>
        <span className={styles['topic-post__topic-title']}>{topicData?.title}</span>
        <span className={styles['topic-post__topic-text']}>{topicData?.description}</span>
      </div>
      <div className={styles['topic-post__container']}>
        {topicData?.messages.map(comment => <Comment comment={comment} key={comment.id} />)}
      </div>
      <div
        className={`${styles['topic-post__commment-wrapper']} ${styles['topic-post__container']}`}>
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
