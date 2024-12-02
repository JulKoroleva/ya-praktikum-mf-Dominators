import { createSlice } from '@reduxjs/toolkit';

import { authorizationRequest } from '@/redux/requests';

import { IAuthorizationSlice } from './authorizationSlice.interface';

const initialState: IAuthorizationSlice = {
  loginStatus: 'idle',
  loginError: '',
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    clearAuthorizationState: state => {
      state.loginStatus = 'idle';
      state.loginError = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(authorizationRequest.pending, state => {
        state.loginStatus = 'loading';
      })
      .addCase(authorizationRequest.fulfilled, state => {
        console.log('fulfilled');
        state.loginStatus = 'succeeded';
      })
      .addCase(authorizationRequest.rejected, (state, action) => {
        console.log('rejected');
        state.loginStatus = 'failed';
        state.loginError = action.payload as string;
      });
  },
});

export const { clearAuthorizationState } = authorizationSlice.actions;
