import { combineReducers } from '@reduxjs/toolkit';
import { authorizationSlice, registrationSlice } from '@/redux/slices';

export const authenticationReducer = combineReducers({
  authorization: authorizationSlice.reducer,
  registration: registrationSlice.reducer,
});

export type IAuthenticationReducer = ReturnType<typeof authenticationReducer>;
