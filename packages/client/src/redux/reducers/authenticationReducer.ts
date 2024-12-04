import { combineReducers } from '@reduxjs/toolkit';

import { authorizationSlice, registrationSlice } from '@/redux/slices';
import { IAuthenticationReducer } from './authenticationReducer.interface';

export const authenticationReducer: IAuthenticationReducer = combineReducers({
  authorization: authorizationSlice,
  registration: registrationSlice,
});
