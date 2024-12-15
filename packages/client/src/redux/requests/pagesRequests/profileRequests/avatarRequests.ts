import { createAsyncThunk } from '@reduxjs/toolkit';

import { CHANGE_AVATAR_URL } from '@/constants/apiUrls';

export const avatarRequests = createAsyncThunk<string, File, { rejectValue: string }>(
  'user/avatarRequests',
  async (data, { rejectWithValue }) => {
    const sendData = new FormData();
    sendData.append('avatar', data);
    const response = await fetch(CHANGE_AVATAR_URL, {
      method: 'PUT',
      body: sendData,
      credentials: 'include',
    });

    if (!response.ok) {
      const result = await response.json();
      const rejectReason = result.reason ? result.reason : 'Unknown error';
      return rejectWithValue(rejectReason);
    }

    return response.url;
  },
);
