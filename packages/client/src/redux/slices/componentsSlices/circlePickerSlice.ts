import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICirclePickerState } from './circlePickerSlice.interface';

const initialState: ICirclePickerState = {
  avatar: 'rgb(0, 224, 255)',
};

const circlePickerSlice = createSlice({
  name: 'circlePicker',
  initialState,
  reducers: {
    setAvatar(state, action: PayloadAction<string | null>) {
      state.avatar = action.payload;
    },
  },
});

export const { setAvatar } = circlePickerSlice.actions;
export const circlePickerReducer = circlePickerSlice.reducer;
