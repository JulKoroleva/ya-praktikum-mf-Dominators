export interface ReactionProps {
  id: number;
  type: 'topic' | 'comment';
  reactions?: { emoji: string; count: number; users?: number[] }[];
  showPopup?: boolean;
  emojiRef?: React.RefObject<HTMLDivElement>;
}
