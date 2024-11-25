import { Button } from 'react-bootstrap';
import styles from './EndGame.module.scss';
import { useNavigate } from 'react-router-dom';

type TResult = {
  id: number;
  title: string;
  value: string;
};

type TResultsProps = {
  results: TResult[];
};

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
    <div className={styles.end}>
      <h2 className={styles.end__title}>Match results</h2>
      <div className={styles.end__results}>
        {results.map(result => (
          <article key={result.id} className={styles.result}>
            <h3 className={styles.result__mark}>{result.title}</h3>
            <p className={styles.result__value}>{result.value}</p>
          </article>
        ))}
      </div>
      <Button
        className={`${styles.end__button} ${styles.end__button_transparent}`}
        type="button"
        onClick={handleShare}>
        <img
          src="src/assets/icons/tgLogo.svg"
          alt="telegram logo"
          className={styles.end__buttonIcon}
        />
        Share to Telegram
      </Button>
      <Button className={styles.end__button} type="button" onClick={handleContinue}>
        Continue
      </Button>
    </div>
  );
}

export default EndGame;
