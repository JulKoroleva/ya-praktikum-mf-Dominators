export type TPaginationOptions = {
  page: number;
  total: number;
  perPage: number;
};

export interface IPaginationProps {
  options: TPaginationOptions;
  onChange?: (paginationOptions: TPaginationOptions) => void;
}
