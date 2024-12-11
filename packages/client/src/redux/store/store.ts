import { configureStore } from '@reduxjs/toolkit';

import { authenticationReducer } from '../reducers/pageReducers/authenticationReducer';
import { globalReducer } from '../reducers/globalReducers';

import { IStore } from './store.interface';

export const store = configureStore({
  reducer: {
    //@ts-expect-error
    authentication: authenticationReducer,
    global: globalReducer,
  },
});

export type RootState = IStore;
//@ts-expect-error
export type TypeDispatch = typeof store.dispatch;
