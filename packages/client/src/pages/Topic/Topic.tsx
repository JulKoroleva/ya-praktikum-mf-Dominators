import { ErrorNotification } from '@/components';
import { TopicPost } from './components';
import { useParams } from 'react-router-dom';

export const Topic = () => {
  const { id } = useParams();
  return (
    <ErrorNotification>
      <TopicPost id={Number(id)} />
    </ErrorNotification>
  );
};
