import {
  leaderBoardSlice,
  LeaderBoardState,
} from '@/redux/slices/pagesSlices/leaderBoardSlices/leaderBoard.slice';

export const leaderboardReducer = leaderBoardSlice.reducer;

export type LeaderboardState = LeaderBoardState;
