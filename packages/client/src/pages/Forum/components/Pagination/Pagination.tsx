import { Button } from 'react-bootstrap';
import { IPaginationProps } from './Pagination.interface';
import styles from './Pagination.module.scss';
import arrow from '@/assets/icons/arrow-pagination.svg';

export function Pagination({ options, onChange }: IPaginationProps) {
  const isFirstPage = options.page === 1;
  const isLastPage = options.page === Math.ceil(options.total / 5);

  const handleChangePage = (addend: number) => {
    const newOptions = {
      ...options,
      page: options.page + addend,
    };

    onChange && onChange(newOptions);
  };

  return (
    <div className={styles['pagination']}>
      <Button
        className={styles.pagination__button}
        type="button"
        disabled={isFirstPage}
        onClick={() => handleChangePage(-1)}>
        <img
          src={arrow}
          alt="arrow"
          className={`${styles['pagination__button-icon']} ${styles.previous}`}
        />
        Prev
      </Button>
      <span className={styles.pagination__view}>
        {/* 5 - кол-во топиков на странице */}
        {options.page} / {Math.ceil(options.total / 5)}
      </span>
      <Button
        className={styles.pagination__button}
        type="button"
        disabled={isLastPage}
        onClick={() => handleChangePage(1)}>
        Next
        <img src={arrow} alt="arrow" className={styles['pagination__button-icon']} />
      </Button>
    </div>
  );
}
