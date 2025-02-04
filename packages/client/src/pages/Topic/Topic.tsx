import { ErrorNotification } from '@/components';
import { TopicPost } from './components';
import { useParams } from 'react-router-dom';
import { initForumPage } from '../Forum/Forum';
import { usePage } from '@/services/hooks';

export const Topic = () => {
  const { id } = useParams();

  usePage({ initPage: initForumPage });

  return (
    <ErrorNotification>
      <TopicPost id={Number(id)} />
    </ErrorNotification>
  );
};
