import { createSlice } from '@reduxjs/toolkit';

import { authorizationRequest, logoutRequest } from '@/redux/requests';

import { IAuthorizationSlice } from './authorizationSlice.interface';

const initialState: IAuthorizationSlice = {
  loginStatus: 'idle',
  loginError: '',
  logoutStatus: 'idle',
  logoutError: '',
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    clearAuthorizationState: state => {
      state.loginStatus = 'idle';
      state.loginError = '';
      state.logoutStatus = 'idle';
      state.logoutError = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(authorizationRequest.pending, state => {
        state.loginStatus = 'loading';
      })
      .addCase(authorizationRequest.fulfilled, state => {
        state.loginStatus = 'succeeded';
      })
      .addCase(authorizationRequest.rejected, (state, action) => {
        state.loginStatus = 'failed';
        state.loginError = action.payload as string;
      })
      .addCase(logoutRequest.pending, state => {
        state.logoutStatus = 'loading';
      })
      .addCase(logoutRequest.rejected, (state, action) => {
        state.logoutStatus = 'failed';
        state.logoutError = action.payload as string;
      })
      .addCase(logoutRequest.fulfilled, state => {
        state.logoutStatus = 'succeeded';
        state.logoutError = '';
      });
  },
});

export const { clearAuthorizationState } = authorizationSlice.actions;
