import { combineReducers } from '@reduxjs/toolkit';

import authorizationSlice from '../slices/pagesSlices/authorizationSlices/authorizationSlice';
import registrationSlice from '../slices/pagesSlices/registrationSlices/registrationSlice';

export const authenticationReducer = combineReducers({
  authorization: authorizationSlice,
  registration: registrationSlice,
});
