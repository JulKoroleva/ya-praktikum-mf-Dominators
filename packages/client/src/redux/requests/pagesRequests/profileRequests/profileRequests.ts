import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUserInfo } from '@/redux/slices';

import { PROFILE_URL, THEME_URL } from '@/constants/apiUrls';

export const profileRequest = createAsyncThunk<IUserInfo, IUserInfo, { rejectValue: string }>(
  'user/profileRequest',
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

export const setThemeRequest = createAsyncThunk<
  { darkTheme: boolean },
  { userId: number; darkTheme: boolean },
  { rejectValue: string }
>('theme/setThemeRequest', async (data, { rejectWithValue }) => {
  const request = await fetch(`${THEME_URL}/${data.userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ darkTheme: data.darkTheme }),
    credentials: 'include',
  });

  if (!request.ok) {
    const response = await request.json();
    const rejectReason = response.reason ? response.reason : 'Unknown error';
    return rejectWithValue(rejectReason);
  }

  return request.json();
});
