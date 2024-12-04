export type TPaginationOptions = {
  page: number;
  total: number;
};

export interface IPaginationProps {
  options: TPaginationOptions;
  onChange?: (paginationOptions: TPaginationOptions) => void;
}
