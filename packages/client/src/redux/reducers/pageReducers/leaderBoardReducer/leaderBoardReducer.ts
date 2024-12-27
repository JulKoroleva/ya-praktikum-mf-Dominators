import { leaderBoardSlice } from '@/redux/slices/pagesSlices/leaderBoardSlices/leaderBoard.slice';
import { LeaderBoardState } from '@/redux/slices/pagesSlices/leaderBoardSlices/leaderBoard.slice.interfaces';

export const leaderboardReducer = leaderBoardSlice.reducer;

export type LeaderboardState = LeaderBoardState;
