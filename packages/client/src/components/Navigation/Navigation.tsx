import { Button } from 'react-bootstrap';
import styles from './Navigation.module.scss';
import backArrow from '@/assets/icons/back.svg';
import { useNavigate } from 'react-router-dom';

export type NavigationProps = {
  to: string;
  title: string;
};

function Navigation({ to, title }: NavigationProps) {
  const navigate = useNavigate();

  return (
    <>
      <h1 className={styles.navigation__title}>{title}</h1>
      <Button className={styles.navigation__button} type="button" onClick={() => navigate(to)}>
        <img src={backArrow} alt="back arrow" className={styles['topic-post__button-icon']} />
      </Button>
    </>
  );
}

export default Navigation;
