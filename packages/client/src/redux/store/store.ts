import { configureStore } from '@reduxjs/toolkit';

import { authenticationReducer } from '../reducers';
import { IStore } from './store.interface';

export const store: IStore = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});

export type RootState = IStore;
export type TypeDispatch = typeof store.dispatch;
