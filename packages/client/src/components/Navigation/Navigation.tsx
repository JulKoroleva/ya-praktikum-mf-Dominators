import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { INavigationProps } from './Navigation.interface';
import backArrow from '@/assets/icons/back.svg';
import styles from './Navigation.module.scss';

export function Navigation({ to, title }: INavigationProps) {
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
