import { createAsyncThunk } from '@reduxjs/toolkit';

import { IAuthorizationFormSubmit } from '@/redux/slices';

import { LOGIN_URL, LOGOUT_URL, OAUTH_SIGN_IN_UP } from '@/constants/apiUrls';

export const authorizationRequest = createAsyncThunk<
  boolean,
  IAuthorizationFormSubmit,
  { rejectValue: string }
>('authorization/authorizationRequest', async (data, { rejectWithValue }) => {
  const request = await fetch(data.code ? OAUTH_SIGN_IN_UP : LOGIN_URL, {
    method: 'POST',
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
});

export const logoutRequest = createAsyncThunk<void, void, { rejectValue: string }>(
  'authorization/logoutRequest',
  async (_, { rejectWithValue }) => {
    const request = await fetch(LOGOUT_URL, {
      method: 'POST',
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
