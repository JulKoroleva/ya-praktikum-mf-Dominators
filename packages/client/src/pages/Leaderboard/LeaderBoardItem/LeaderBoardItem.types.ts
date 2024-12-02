export type TLeaderBoardItem = {
  id: number;
  userId: number;
  rank: number;
  userName: string;
  score: number;
};

export type TLeaderBoardItemProps = {
  item: TLeaderBoardItem;
};
