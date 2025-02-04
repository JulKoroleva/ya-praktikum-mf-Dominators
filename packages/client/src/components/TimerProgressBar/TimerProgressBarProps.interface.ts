export interface TimerProgressBarProps {
  progress: number;
  isWaitingForTap: boolean;
  remainingTime: number;
  onTap: () => void;
}
