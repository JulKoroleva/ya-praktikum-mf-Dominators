import { combineReducers } from '@reduxjs/toolkit';

import { userSlice } from '@/redux/slices';
import { IGlobalReducer } from './globalReducer.interface';

export const globalReducer = combineReducers({
  user: userSlice.reducer,
});

export type GlobalState = IGlobalReducer;
