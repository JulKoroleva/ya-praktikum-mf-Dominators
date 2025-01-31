import { useDispatch } from 'react-redux';
import { TypeDispatch } from '@/redux/store';
import {
  deleteTopic,
  deleteComment,
  fetchForum,
  getTopicById,
} from '@/redux/requests/pagesRequests/forumRequests/forumRequests';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export function useDeleteForumEntity() {
  const dispatch = useDispatch<TypeDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  return async (
    id: number,
    type: 'topic' | 'comment',
    event?: React.MouseEvent,
    topicId?: number,
  ) => {
    event?.stopPropagation();

    if (type === 'topic') {
      await dispatch(deleteTopic({ id }));
    } else {
      await dispatch(deleteComment({ id }));
    }

    if (location.pathname === '/forum') {
      dispatch(fetchForum({ pageNumber: 1 }));
    } else if (/^\/forum\/\d+$/.test(location.pathname)) {
      if (type === 'comment' && topicId) {
        dispatch(getTopicById({ id: Number(topicId) }));
      } else {
        navigate(ROUTES.forum());
      }
    }
  };
}
