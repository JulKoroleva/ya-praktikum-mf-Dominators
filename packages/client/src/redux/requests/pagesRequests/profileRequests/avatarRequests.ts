import { createAsyncThunk } from '@reduxjs/toolkit';

import { CHANGE_AVATAR_URL } from '@/constants/apiUrls';

export const avatarRequests = createAsyncThunk<string, File, { rejectValue: string }>(
  'user/avatarRequests',
  async (data, { rejectWithValue }) => {
    const sendData = new FormData();
    sendData.append('avatar', data);
    const request = await fetch(CHANGE_AVATAR_URL, {
      method: 'PUT',
      body: sendData,
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
