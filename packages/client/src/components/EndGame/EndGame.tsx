import { Button } from 'react-bootstrap';
import styles from './EndGame.module.scss';
import { useNavigate } from 'react-router-dom';
import { TResultsProps } from './EndGame.types';
import tgLogo from '@/assets/icons/tgLogo.svg';

const SHARE_URL = 'https://github.com/JulKoroleva/DOMinators';
const SHARE_TITLE = 'Я достиг отличных результатов в игре, проверь сам! Присоединяйся!';

const handleShare = () => {
  const link = `https://telegram.me/share/url?url=${SHARE_URL}&text=${SHARE_TITLE}`;
  window.open(link, '_blank');
};

function EndGame({ results }: TResultsProps) {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/main');
  };

  return (
    <div className={styles['end-game']}>
      <h2 className={styles['end-game__title']}>Match results</h2>
      <div className={styles['end-game__results']}>
        {results.map(({ id, title, value }) => (
          <article key={id} className={styles.result}>
            <h3 className={styles.result__mark}>{title}</h3>
            <p className={styles.result__value}>{value}</p>
          </article>
        ))}
      </div>
      <Button
        className={`${styles['end-game__button']} ${styles['end-game__button_transparent']}`}
        type="button"
        onClick={handleShare}>
        <img src={tgLogo} alt="telegram logo" className={styles['end-game__buttonIcon']} />
        Share to Telegram
      </Button>
      <Button className={styles['end-game__button']} type="button" onClick={handleContinue}>
        Continue
      </Button>
    </div>
  );
}

export default EndGame;
