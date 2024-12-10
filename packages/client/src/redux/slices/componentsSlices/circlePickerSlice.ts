import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICirclePickerState } from './circlePickerSlice.interface';

const initialState: ICirclePickerState = {
  selectedColor: 'rgb(0, 224, 255)',
  selectedImage: null,
};

const circlePickerSlice = createSlice({
  name: 'circlePicker',
  initialState,
  reducers: {
    setColor(state, action: PayloadAction<string | null>) {
      state.selectedColor = action.payload;
    },
    setImage(state, action: PayloadAction<string | null>) {
      state.selectedImage = action.payload;
    },
  },
});

export const { setColor, setImage } = circlePickerSlice.actions;
export const circlePickerReducer = circlePickerSlice.reducer;
