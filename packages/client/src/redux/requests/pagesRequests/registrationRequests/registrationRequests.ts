import { createAsyncThunk } from '@reduxjs/toolkit';

import { IRegistrationFormSubmit } from '@/redux/slices/pagesSlices/registrationSlices/registrationSlice.interface';

import { REGISTER_URL } from '@/constants/apiUrls';

export const registrationRequest = createAsyncThunk<
  any,
  IRegistrationFormSubmit,
  { rejectValue: string }
>('registration/registrationRequest', async (data, { rejectWithValue }) => {
  const request = await fetch(REGISTER_URL, {
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

  return request.json();
});
