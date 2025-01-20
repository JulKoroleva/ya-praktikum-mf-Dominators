import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import { FormComponent, Navigation, Popup, ErrorNotification } from '@/components';
import { TopicList, Pagination, TPaginationOptions, TTopic } from './components';

import { fetchForum } from '@/redux/requests';
import { selectPaginationOptions, selectTopicList } from '@/redux/selectors';

import { useIsAuthorized, usePage } from '@/services/hooks';
import { getCookie } from '@/services/cookiesHandler';

import { ROUTES } from '@/constants/routes';
import { PageInitArgs } from '@/routes';
import { HEADERS } from '@/constants/headers';
import { createNewTopicFields, createNewTopicFieldsInitialValues } from './FormData';

import add from '@/assets/icons/add.svg';

import styles from './Forum.module.scss';
import { createForum } from '@/redux/requests/pagesRequests/forumRequests/forumRequests';
import { TypeDispatch } from '@/redux/store';
import { ICreateTopicDto } from './components/TopicList/TopicList.interface';

export const Forum = () => {
  // /**
  //  * ВРЕМЕННО. УБРАТЬ В GAME-30. До полноценной настройки SRR на клиенте возникает ошибка document is undefined.
  //  * Т.К. мы идём за куки до того, как документ отрендерился. фиксится в уроке 7/12 SSR */

  // Остаётся на 9 спринт в соответствии с задачей, так как в задаче GAME-30 указано, что регистрация по куке будет производиться именно в 9 спринте.
  if (typeof window === 'undefined') {
    return <></>;
  }
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [topicList, setTopicList] = useState<TTopic[]>([]);
  const [paginationOptions, setPaginationOptions] = useState<TPaginationOptions>({
    page: 1,
    total: 5,
  });
  const [isAuthorized, setIsAuthorized] = useIsAuthorized();

  const authCookie = getCookie('auth');

  const topicListFromServer = useSelector(selectTopicList);
  const paginationOptionsFromServer = useSelector(selectPaginationOptions);
  const dispatch = useDispatch<TypeDispatch>();

  const onSubmit = (data: ICreateTopicDto) => {
    dispatch(createForum(data));
  };

  useEffect(() => {
    setIsAuthorized(!!authCookie);
  }, [authCookie]);

  useEffect(() => {
    setTopicList(topicListFromServer);
    setPaginationOptions(paginationOptionsFromServer);
  }, [topicListFromServer, paginationOptionsFromServer]);

  usePage({ initPage: initForumPage });

  return (
    <div className={`${styles['game-forum']} ${styles['fade-in']}`}>
      <ErrorNotification>
        <Navigation title={HEADERS.forum} to={ROUTES.main()} />
        {isAuthorized && (
          <Button
            className={styles['game-forum__button']}
            type="button"
            onClick={() => setIsOpen(prev => !prev)}>
            <img src={add} alt="telegram logo" className={styles['game-forum__buttonIcon']} />
            Add topic
          </Button>
        )}
        <TopicList topicList={topicList} />
        <Pagination options={paginationOptions} />
        <Popup open={isOpen} withOverlay onClose={() => setIsOpen(false)}>
          {isOpen && (
            <FormComponent
              fields={createNewTopicFields}
              onSubmit={onSubmit}
              initialValues={createNewTopicFieldsInitialValues}
              submitButtonText="Create topic"
            />
          )}
        </Popup>
      </ErrorNotification>
    </div>
  );
};

export const initForumPage = ({ dispatch, state }: PageInitArgs) => {
  const queue: Array<Promise<unknown>> = [dispatch(fetchForum())];
  if (!selectTopicList(state)) {
    queue.push(dispatch(fetchForum()));
  }
  return Promise.all(queue);
};
