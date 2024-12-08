export type TResult = {
  id: number;
  title: string;
  value: string | number;
};

export interface IEndGameProps {
  results: TResult[];
  handleRepeat: () => void;
}
