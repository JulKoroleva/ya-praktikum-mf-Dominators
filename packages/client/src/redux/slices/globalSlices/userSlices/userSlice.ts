import { createSlice } from '@reduxjs/toolkit';

import {
  getUserInfoRequest,
  profileRequest,
  avatarRequests,
  passwordRequests,
} from '@/redux/requests';

import { IUserSlice } from './userSlice.interface';

const initialState: IUserSlice = {
  getUserStatus: 'idle',
  getUserError: '',
  changeUserStatus: 'idle',
  changeUserError: '',
  userInfo: {
    id: 0,
    first_name: '',
    second_name: '',
    login: '',
    avatar: 'rgb(0, 224, 255)',
    email: '',
    phone: '',
  },
  processedAvatar: 'rgb(0, 224, 255)',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserState: state => {
      state.getUserStatus = 'idle';
      state.getUserError = '';
      state.userInfo = initialState.userInfo;
    },
    clearChangeUserState: state => {
      state.changeUserStatus = 'idle';
      state.changeUserError = '';
    },
    setUserAvatar: (state, action) => {
      state.processedAvatar = action.payload;
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
        state.userInfo = action.payload.userInfo;
        state.processedAvatar = action.payload.processedAvatar;
      })
      .addCase(getUserInfoRequest.rejected, (state, action) => {
        state.getUserStatus = 'failed';
        state.getUserError = action.payload as string;
      })
      .addCase(profileRequest.pending, state => {
        state.changeUserStatus = 'loading';
      })
      .addCase(profileRequest.fulfilled, (state, action) => {
        state.changeUserStatus = 'succeeded';
        state.changeUserError = '';
        state.userInfo = action.payload;
      })
      .addCase(profileRequest.rejected, (state, action) => {
        state.changeUserStatus = 'failed';
        state.changeUserError = action.payload as string;
      })
      .addCase(avatarRequests.fulfilled, (state, action) => {
        if (state.userInfo) {
          state.userInfo.avatar = action.payload;
        }
      })
      .addCase(passwordRequests.pending, state => {
        state.changeUserStatus = 'loading';
      })
      .addCase(passwordRequests.fulfilled, state => {
        state.changeUserStatus = 'succeeded';
        state.changeUserError = '';
      })
      .addCase(passwordRequests.rejected, (state, action) => {
        state.changeUserStatus = 'failed';
        state.changeUserError = action.payload as string;
      });
  },
});

export const { clearUserState, clearChangeUserState, setUserAvatar } = userSlice.actions;
