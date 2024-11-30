import { combineReducers } from '@reduxjs/toolkit';

import registrationSlice from '../slices/pagesSlices/registrationSlices/registrationSlice';

export const authenticationReducer = combineReducers({
  registration: registrationSlice,
});
