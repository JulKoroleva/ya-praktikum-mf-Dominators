import TopicPost from '@/pages/Forum/components/TopicPost/TopicPost';
import { useParams } from 'react-router-dom';

export const Topic = () => {
  const { id } = useParams();
  return <TopicPost id={Number(id)} />;
};
