import { createSlice } from '@reduxjs/toolkit';

import { getUserInfoRequest } from '@/redux/requests';

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
      state.userInfo = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUserInfoRequest.pending, state => {
        state.getUserStatus = 'loading';
      })
      .addCase(getUserInfoRequest.fulfilled, (state, action) => {
        state.getUserStatus = 'succeeded';
        state.getUserError = '';
        state.userInfo = action.payload;
      })
      .addCase(getUserInfoRequest.rejected, (state, action) => {
        state.getUserStatus = 'failed';
        state.getUserError = action.payload as string;
      });
  },
});

export const { clearUserState } = userSlice.actions;
