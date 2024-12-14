import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUserPassword } from '@/redux/slices';

import { CHANGE_PASSWORD_URL } from '@/constants/apiUrls';

export const passwordRequests = createAsyncThunk<boolean, IUserPassword, { rejectValue: string }>(
  'user/passwordRequests',
  async (data, { rejectWithValue }) => {
    const request = await fetch(CHANGE_PASSWORD_URL, {
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

    return true;
  },
);
