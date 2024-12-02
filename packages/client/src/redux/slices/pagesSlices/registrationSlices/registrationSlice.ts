import { createSlice } from '@reduxjs/toolkit';

import { registrationRequest } from '@/redux/requests/pagesRequests/registrationRequests/registrationRequests';

import { IRegistrationSlice } from './registrationSlice.interface';

const initialState: IRegistrationSlice = {
  registerStatus: 'idle',
  registerError: '',
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    clearRegistrationState: state => {
      state.registerStatus = 'idle';
      state.registerError = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registrationRequest.pending, state => {
        state.registerStatus = 'loading';
      })
      .addCase(registrationRequest.fulfilled, state => {
        state.registerStatus = 'succeeded';
      })
      .addCase(registrationRequest.rejected, (state, action) => {
        state.registerStatus = 'failed';
        console.log(action.payload);
        state.registerError = action.payload as string;
      });
  },
});

export const { clearRegistrationState } = registrationSlice.actions;
export default registrationSlice.reducer;
