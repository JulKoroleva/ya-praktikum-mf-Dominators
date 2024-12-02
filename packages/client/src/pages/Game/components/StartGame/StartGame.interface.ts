export interface IStartGameProps {
  onComplete: () => void;
  isGameStarted: boolean;
}

export interface IHint {
  id: number;
  text: string;
  image?: string;
}
