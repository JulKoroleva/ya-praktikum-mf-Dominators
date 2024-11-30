import { Button } from 'react-bootstrap';
import LeaderBoardItem from '../LeaderBoardItem/LeaderBoardItem';
import leaderboardMockData from '../leaderboardMockData';
import styles from './LeaderBoardPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

function LeaderBoardPage() {
  const navigate = useNavigate();

  return (
    <div className={styles['leaderboard-page']}>
      <div className={styles['form-container']}>
        <h1 className={styles['leaderboard-page__title']}>Leader Boaard</h1>
        <div className={styles['leaderboard-page__list']}>
          {leaderboardMockData.map(item => (
            <LeaderBoardItem key={item.id} item={item} />
          ))}
        </div>
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
}

export default LeaderBoardPage;
