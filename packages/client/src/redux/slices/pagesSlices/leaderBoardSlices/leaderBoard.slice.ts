import { createSlice } from '@reduxjs/toolkit';

import {
  fetchLeaderBoard,
  addLeaderBoardEntry,
} from '@/redux/requests/pagesRequests/leaderBoardRequest/leaderBoardRequest';
import { LeaderBoardState } from './leaderBoard.slice.interfaces';

const initialState: LeaderBoardState = {
  data: [],
  loading: 'idle',
  error: null,
};

export const leaderBoardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    clearLeaderBoardState: state => {
      state.data = [];
      state.loading = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLeaderBoard.pending, state => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchLeaderBoard.fulfilled, (state, { payload }) => {
        state.loading = 'succeeded';
        state.data = payload;
      })
      .addCase(fetchLeaderBoard.rejected, (state, { payload }) => {
        state.loading = 'failed';
        state.error = payload || 'Unknown error';
      })
      .addCase(addLeaderBoardEntry.pending, state => {
        state.error = null;
      })
      .addCase(addLeaderBoardEntry.rejected, (state, { payload }) => {
        state.error = payload || 'Unknown error';
      });
  },
});

export const { clearLeaderBoardState } = leaderBoardSlice.actions;

export const leaderboardReducer = leaderBoardSlice.reducer;
