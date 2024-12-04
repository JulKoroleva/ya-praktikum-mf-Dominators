import { Button } from 'react-bootstrap';
import { IPaginationProps } from './Pagination.interface';
import styles from './Pagination.module.scss';

export function Pagination({ options, onChange }: IPaginationProps) {
  const isFirstPage = options.page === 1;
  const isLastPage = options.page === options.total;

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
        ⏪ Prev
      </Button>
      <span className={styles.pagination__view}>
        {options.page} / {options.total}
      </span>
      <Button
        className={styles.pagination__button}
        type="button"
        disabled={isLastPage}
        onClick={() => handleChangePage(1)}>
        Next ⏩
      </Button>
    </div>
  );
}
