import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Comment } from './components';
import {
  FormComponent,
  IModalConfig,
  Navigation,
  TModalStatus,
  UniversalModal,
} from '@/components';

import { TypeDispatch } from '@/redux/store';
import { addTopicComment, getTopicById } from '@/redux/requests';
import {
  selectGetTopicByIdError,
  selectTopicById,
  selectTopicCommentError,
  selectTopicCommentStatus,
  selectUser,
} from '@/redux/selectors';

import { usePage } from '@/services/hooks';

import { ROUTES } from '@/constants/routes';
import { topicPostFormData, topicPostFormDataInitialValues } from './topicPostFormData';

import { initForumPage } from '@/pages/Forum/Forum';

import { ITopicPostProps } from './TopicPost.interface';
import { TTopic } from '@/pages/Forum/components';

import styles from './TopicPost.module.scss';
import { Reactions } from '@/components/EmojiReactions/EmojiReactions';
import { useEmojiPopupVisibility } from '@/hooks/useEmojiPopupVisibility.hook';

export function TopicPost({ id }: ITopicPostProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<TypeDispatch>();

  const { showPopup, handleMouseEnter, handleMouseLeave } = useEmojiPopupVisibility(0);
  const [topicData, setTopicData] = useState<TTopic | null>(null);
  const [modalConfig, setModalConfig] = useState<IModalConfig>({
    show: false,
    header: '',
    status: undefined,
  });
  const [localTopicPostFormDataInitialValues, setLocalTopicPostFormDataInitialValues] = useState(
    topicPostFormDataInitialValues,
  );

  const topicDataFromServer = useSelector(selectTopicById);
  const getTopicByIdError = useSelector(selectGetTopicByIdError);

  const addTopicCommentStatus = useSelector(selectTopicCommentStatus);
  const addTopicCommentError = useSelector(selectTopicCommentError);

  const userInfo = useSelector(selectUser);

  const onSubmit = (data: Record<string, string>) => {
    const id = topicData?.id;
    if (id) {
      dispatch(
        addTopicComment({
          topicId: id,
          message: data.message,
          creator: userInfo.login,
          creatorId: userInfo.id,
        }),
      ).then(() => {
        dispatch(getTopicById({ id }));
      });
    }
    setLocalTopicPostFormDataInitialValues({ message: '' });
  };

  const handleCloseModal = () => {
    setModalConfig({ show: false, header: '', status: undefined });
  };

  useEffect(() => {
    dispatch(getTopicById({ id }));
  }, []);

  useEffect(() => {
    if (topicDataFromServer) {
      setTopicData(topicDataFromServer);
    }
    if (getTopicByIdError) {
      navigate('/error404');
    }
  }, [topicDataFromServer, getTopicByIdError]);

  useEffect(() => {
    let header = '';
    let statusValue: TModalStatus = 'idle';
    let error: typeof addTopicCommentError = '';
    let succeeded = '';

    if (addTopicCommentStatus !== 'idle') {
      statusValue = addTopicCommentStatus;
      error = addTopicCommentError;
      succeeded = 'Comment added successfully';
    }

    switch (statusValue) {
      case 'loading':
        header = 'Loading...';
        statusValue = 'loading';
        break;
      case 'succeeded':
        header = succeeded;
        statusValue = 'succeeded';
        dispatch(getTopicById({ id }));
        break;
      case 'failed':
        header = error || 'Something went wrong';
        statusValue = 'failed';
        break;
      default:
        break;
    }

    if (statusValue) {
      setModalConfig({
        show: statusValue !== 'idle',
        header,
        status: statusValue,
      });
    }
  }, [addTopicCommentStatus, addTopicCommentError]);

  usePage({ initPage: initForumPage });

  return (
    <div className={`${styles['topic-post']} ${styles['fade-in']}`}>
      <Navigation title={`Discussion #${id}`} to={ROUTES.forum()} />
      <div
        className={styles['topic-post__container']}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <div className={styles['topic-post__info']}>
          <span className={styles['topic-post__topic-author']}>{topicData?.creator}</span>
          <span className={styles['topic-post__topic-date']}>
            {topicData?.createdAt &&
            typeof topicData.createdAt === 'string' &&
            topicData.createdAt.includes('-')
              ? new Date(topicData.createdAt).toDateString()
              : (topicData?.createdAt ?? '-')}
          </span>
        </div>
        <span className={styles['topic-post__topic-title']}>{topicData?.title}</span>
        <span className={styles['topic-post__topic-text']}>{topicData?.description}</span>
        {topicData !== null && <Reactions id={id} type="topic" reactions={topicData.reactions} />}

        {showPopup && (
          <div className={styles['reaction-popup']}>
            <Reactions id={id} type="topic" showPopup={showPopup} />
          </div>
        )}
      </div>
      {topicData?.commentsList && topicData?.commentsList?.length !== 0 && (
        <div className={styles['topic-post__container']}>
          {topicData?.commentsList?.map(message => <Comment comment={message} key={message.id} />)}
        </div>
      )}

      <div
        className={`${styles['topic-post__comment-wrapper']} ${styles['topic-post__container']}`}>
        <FormComponent
          fields={topicPostFormData}
          onSubmit={onSubmit}
          initialValues={localTopicPostFormDataInitialValues}
          submitButtonText="Publish"
        />
      </div>
      <UniversalModal
        show={modalConfig.show}
        title={modalConfig.header}
        status={modalConfig.status}
        zIndex={2000}
        onHide={handleCloseModal}
      />
    </div>
  );
}
