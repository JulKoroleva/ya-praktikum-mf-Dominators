import { useDispatch } from 'react-redux';
import { TypeDispatch } from '@/redux/store';
import {
  deleteTopic,
  deleteComment,
  fetchForum,
} from '@/redux/requests/pagesRequests/forumRequests/forumRequests';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export function useDeleteEntity() {
  const dispatch = useDispatch<TypeDispatch>();
  const location = useLocation();
  const navigate = useNavigate();

  return async (id: number, type: 'topic' | 'comment', event?: React.MouseEvent) => {
    event?.stopPropagation();

    if (type === 'topic') {
      await dispatch(deleteTopic({ id }));
    } else {
      await dispatch(deleteComment({ id }));
    }

    if (location.pathname === '/forum') {
      dispatch(fetchForum({ pageNumber: 1 }));
    } else if (/^\/forum\/\d+$/.test(location.pathname)) {
      navigate(ROUTES.forum());
    }
  };
}
