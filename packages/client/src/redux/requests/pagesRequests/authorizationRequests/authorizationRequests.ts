import { createAsyncThunk } from '@reduxjs/toolkit';

import { IAuthorizationFormSubmit } from '@/redux/slices/pagesSlices/authorizationSlices/authorizationSlice.interface';

import { LOGIN_URL } from '@/constants/apiUrls';

export const authorizationRequest = createAsyncThunk<
  boolean,
  IAuthorizationFormSubmit,
  { rejectValue: string }
>('authorization/authorizationRequest', async (data, { rejectWithValue }) => {
  const request = await fetch(LOGIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!request.ok) {
    const response = await request.json();
    const rejectReason = response.reason ? response.reason : 'Unknown error';
    return rejectWithValue(rejectReason);
  }

  return true;
});
