export type TResult = {
  id: number;
  title: string;
  value: string;
};

export interface IEndGameProps {
  results: TResult[];
}
