import React from 'react';

import { FadeLoader } from 'react-spinners';

import styles from './loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={styles['loader']}>
      <FadeLoader color="#259252" />
    </div>
  );
};
