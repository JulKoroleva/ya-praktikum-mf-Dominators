import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUserInfo } from '@/redux/slices';

import { PROFILE_URL } from '@/constants/apiUrls';

export const profileRequests = createAsyncThunk<IUserInfo, IUserInfo, { rejectValue: string }>(
  'user/profileRequests',
  async (data, { rejectWithValue }) => {
    const request = await fetch(PROFILE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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
