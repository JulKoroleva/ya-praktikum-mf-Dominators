import { configureStore } from '@reduxjs/toolkit';

import { authenticationReducer } from '../reducers';
import { IStore } from './store.interface';

//@ts-expect-error
export const store: IStore = configureStore({
  reducer: {
    //@ts-expect-error
    authentication: authenticationReducer,
  },
});

export type RootState = IStore;
//@ts-expect-error
export type TypeDispatch = typeof store.dispatch;
