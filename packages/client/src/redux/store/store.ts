import { configureStore } from '@reduxjs/toolkit';

import { authenticationReducer } from '../reducers/authenticationReducer';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type TypeDispatch = typeof store.dispatch;
