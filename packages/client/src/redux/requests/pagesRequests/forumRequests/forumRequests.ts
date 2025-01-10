import { createAsyncThunk } from '@reduxjs/toolkit';
import { TTopic, TPaginationOptions } from '@/pages/Forum/components';

import { SERVER_HOST } from '@/constants/serverHost';

export const fetchForum = createAsyncThunk<
  {
    topicList: TTopic[];
    paginationOptions: TPaginationOptions;
  },
  void,
  { rejectValue: string }
>('forum/fetchForum', async (_, { rejectWithValue }) => {
  const url = `${SERVER_HOST}/forum`;

  return fetch(url)
    .then(res => res.json())
    .catch(err => rejectWithValue(err));
});
