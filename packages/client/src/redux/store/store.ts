import { configureStore } from '@reduxjs/toolkit';
import { circlePickerReducer } from '../slices/componentsSlices/circlePickerSlice';
import { authenticationReducer } from '../reducers/authenticationReducer';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    circlePicker: circlePickerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
