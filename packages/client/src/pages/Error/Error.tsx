import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Error.module.scss';

const ERROR_TEXT = 'UPS...\nsomething went wrong...';

export const Error = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className={styles['error-page']}>
      <div className={styles['error-page__title']}>
        <h1>{ERROR_TEXT}</h1>
      </div>
      <h2>Error {id}</h2>
      <Button className={styles['error-page__button']} type="button" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </div>
  );
};
