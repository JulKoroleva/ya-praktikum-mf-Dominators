import { combineReducers } from '@reduxjs/toolkit';

import { authorizationSlice, registrationSlice } from '@/redux/slices';
import { IAuthenticationReducer } from './authenticationReducer.interface';

export const authenticationReducer = combineReducers({
  authorization: authorizationSlice.reducer,
  registration: registrationSlice.reducer,
});

export type AuthenticationState = IAuthenticationReducer;
