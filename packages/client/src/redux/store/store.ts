import { configureStore } from '@reduxjs/toolkit';

import { authenticationReducer } from '../reducers/pageReducers/authenticationReducer';
import { globalReducer } from '../reducers/globalReducers';
import { leaderboardReducer } from '../reducers/pageReducers/leaderBoardReducer/leaderBoardReducer';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    global: globalReducer,
    leaderboard: leaderboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type TypeDispatch = typeof store.dispatch;
