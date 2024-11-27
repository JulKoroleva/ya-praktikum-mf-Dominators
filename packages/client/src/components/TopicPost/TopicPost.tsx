import { Button } from 'react-bootstrap';
import styles from './TopicPost.module.scss';
import { TTopicPost } from './TopicPost.types';
import backArrow from '@/assets/icons/back.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { topicsMockData } from '../Forum/ForumMock';
import { TTopic } from '../Forum/components/TopicList/TopicList.types';
import Comment from './components/Comment/Comment';

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

  return (
    <div className={styles['topic-post']}>
      <h1 className={styles['topic-post__title']}>Discussion #{id}</h1>
      <Button
        className={styles['topic-post__button']}
        type="button"
        onClick={() => navigate('/forum')}>
        <img src={backArrow} alt="back arrow" className={styles['topic-post__buttonIcon']} />
      </Button>
      <div className={styles['topic-post__content']}>
        <div className={styles['topic-post__info']}>
          <span className={styles['topic-post__topic-author']}>{topicData?.creator}</span>
          <span className={styles['topic-post__topic-date']}>{topicData?.createdAt}</span>
        </div>
        <span className={styles['topic-post__topic-title']}>{topicData?.title}</span>
        <span className={styles['topic-post__topic-text']}>{topicData?.description}</span>
      </div>
      <div className={styles['topic-post__comments']}>
        {topicData?.messages.map(comment => <Comment comment={comment} key={comment.id} />)}
      </div>
    </div>
  );
}

export default TopicPost;
