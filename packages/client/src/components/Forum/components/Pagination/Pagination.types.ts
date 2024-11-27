export type TPaginationOptions = {
  page: number;
  total: number;
};

export type TPaginationProps = {
  options: TPaginationOptions;
  onChange?: (paginationOptions: TPaginationOptions) => void;
};
