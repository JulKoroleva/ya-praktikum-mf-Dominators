import { createSlice } from '@reduxjs/toolkit';

import { getUserInfoRequest } from '@/redux/requests';

import { IUserSlice } from './userSlice.interface';

const initialState: IUserSlice = {
  getUserStatus: 'idle',
  getUserError: '',
  userInfo: {
    id: 0,
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    avatar: 'rgb(0, 224, 255)',
    email: '',
    phone: '',
  },
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
    setUserAvatar: (state, action) => {
      if (state.userInfo) {
        state.userInfo.avatar = action.payload;
      }
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
        state.userInfo = {
          ...action.payload,
          avatar: action.payload.avatar || initialState.userInfo?.avatar,
        };
      })
      .addCase(getUserInfoRequest.rejected, (state, action) => {
        state.getUserStatus = 'failed';
        state.getUserError = action.payload as string;
      });
  },
});

export const { clearUserState, setUserAvatar } = userSlice.actions;
