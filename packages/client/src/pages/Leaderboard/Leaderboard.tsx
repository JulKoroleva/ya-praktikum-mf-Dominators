import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ErrorNotification } from '@/components';
import { LeaderBoardItem } from './components';
import { leaderboardMockData } from './leaderboardMockData';
import { ROUTES } from '@/constants/routes';
import styles from './Leaderboard.module.scss';

export const Leaderboard = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['leaderboard-page']}>
      <div className={styles['form-container']}>
        <ErrorNotification>
          <h1 className={styles['leaderboard-page__title']}>Leader Board</h1>
          <div className={styles['leaderboard-page__list']}>
            {leaderboardMockData.map(item => (
              <LeaderBoardItem key={item.id} item={item} />
            ))}
          </div>
        </ErrorNotification>
        <Button
          className={styles['back-button']}
          type="button"
          variant="primary"
          onClick={() => navigate(ROUTES.main())}>
          Back
        </Button>
      </div>
    </div>
  );
};
