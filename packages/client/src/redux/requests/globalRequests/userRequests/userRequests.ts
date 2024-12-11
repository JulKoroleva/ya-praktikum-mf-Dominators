import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUserInfo } from '@/redux/slices/globalSlices/userSlices/userSlice.interface';

import { GET_USER_INFO_URL } from '@/constants/apiUrls';

export const getUserInfoRequest = createAsyncThunk<IUserInfo, void, { rejectValue: string }>(
  'user/getUserInfo',
  async (_, { rejectWithValue }) => {
    const request = await fetch(GET_USER_INFO_URL, {
      method: 'GET',
      credentials: 'include',
    });

    if (!request.ok) {
      const response = await request.json();
      const rejectReason = response.reason ? response.reason : 'Unknown error';
      return rejectWithValue(rejectReason);
    }

    return request.json();
  },
);
