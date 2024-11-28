import styles from './TopicPost.module.scss';
import { TTopicPost } from './TopicPost.types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { topicsMockData } from '../../../Forum/components/GameForum/ForumMock';
import { TTopic } from '../../../Forum/components/TopicList/TopicList.types';
import Comment from '../Comment/Comment';
import { FormComponent } from '../../../../components/FormComponent';
import { topicPostFormData, topicPostFormDataInitialValues } from './topicPostFormData';
import Navigation from '@/components/Navigation/Navigation';

function TopicPost({ id }: TTopicPost) {
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
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <div className={`${styles['topic-post']} ${styles['fade-in']}`}>
      <Navigation title={`Discussion #${id}`} to="/forum" />
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

export default TopicPost;
