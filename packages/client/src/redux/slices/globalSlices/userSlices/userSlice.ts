import { createSlice } from '@reduxjs/toolkit';

import { registrationRequest } from '@/redux/requests';

import { IUserSlice } from './userSlice.interface';

const initialState: IUserSlice = {
  getUserStatus: 'idle',
  getUserError: '',
  userInfo: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserState: state => {
      state.getUserStatus = 'idle';
      state.getUserError = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registrationRequest.pending, state => {
        state.getUserStatus = 'loading';
      })
      .addCase(registrationRequest.fulfilled, state => {
        state.getUserStatus = 'succeeded';
      })
      .addCase(registrationRequest.rejected, (state, action) => {
        state.getUserStatus = 'failed';
        state.getUserError = action.payload as string;
      });
  },
});

export const { clearUserState } = userSlice.actions;
