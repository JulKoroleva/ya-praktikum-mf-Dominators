import styles from './GameForum.module.scss';
import { Button } from 'react-bootstrap';
import add from '@/assets/icons/add.svg';
import TopicList from '../TopicList/TopicList';
import { topicsMockData } from './ForumMock';
import Pagination from '../Pagination/Pagination';
import { useEffect, useState } from 'react';
import { TPaginationOptions, TTopic } from '../TopicList/TopicList.types';
import Popup from '../../../../components/Popup/Popup';
import { createNewTopicFields, createNewTopicFieldsInitialValues } from './gameFormData';
import { FormComponent } from '../../../../components/FormComponent';
import Navigation from '@/components/Navigation/Navigation';
import { ROUTES } from '@/constants/routes';

function GameForum() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [topicList, setTopicList] = useState<TTopic[]>([]);
  const [paginationOptions, setPaginationOptions] = useState<TPaginationOptions>({
    page: 1,
    total: 5,
  });

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = (paginationOptions?: TPaginationOptions) => {
    // eslint-disable-next-line no-console
    console.log(paginationOptions);
    const res = topicsMockData;
    setTopicList(res.topics);
    setPaginationOptions(paginationOptions || res.pagination);
  };

  const onSubmit = (data: Record<string, string>) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <div className={`${styles['game-forum']} ${styles['fade-in']}`}>
      <Navigation title="Game Forum" to={ROUTES.main()} />
      <Button
        className={styles['game-forum__button']}
        type="button"
        onClick={() => setIsOpen(prev => !prev)}>
        <img src={add} alt="telegram logo" className={styles['game-forum__buttonIcon']} />
        Add topic
      </Button>
      <TopicList topicList={topicList} />
      <Pagination options={paginationOptions} onChange={fetchTopics} />
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
    </div>
  );
}

export default GameForum;
