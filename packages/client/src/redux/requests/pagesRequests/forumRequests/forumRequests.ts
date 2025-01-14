import { createAsyncThunk } from '@reduxjs/toolkit';
import { TTopic, TPaginationOptions } from '@/pages/Forum/components';

import { SERVER_HOST } from '@/constants/serverHost';
import { ICreateTopicDto } from '@/pages/Forum/components/TopicList/TopicList.interface';

const url = `${SERVER_HOST}/forum`;

export const fetchForum = createAsyncThunk<
  {
    topicList: TTopic[];
    paginationOptions: TPaginationOptions;
  },
  void,
  { rejectValue: string }
>('forum/fetchForum', async (_, { rejectWithValue }) => {
  return fetch(url)
    .then(res => res.json())
    .catch(err => rejectWithValue(err));
});

export const createForum = createAsyncThunk<void, ICreateTopicDto, { rejectValue: string }>(
  'forum/createForum',
  async (data, { rejectWithValue }) => {
    const request = await fetch(url, {
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
  },
);
