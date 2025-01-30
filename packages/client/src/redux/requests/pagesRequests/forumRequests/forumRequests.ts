import { createAsyncThunk } from '@reduxjs/toolkit';
import { TTopic, TPaginationOptions } from '@/pages/Forum/components';

import { ICreateTopicDto } from '@/pages/Forum/components/TopicList/TopicList.interface';
import { TOPICS_URL } from '@/constants/apiUrls';

export const fetchForum = createAsyncThunk<
  {
    topicList: TTopic[];
    paginationOptions: TPaginationOptions;
  },
  { pageNumber?: number; id?: number },
  { rejectValue: string }
>('forum/fetchForum', async (data, { rejectWithValue }) => {
  const url = `${TOPICS_URL}${data.pageNumber ? `?page=${data.pageNumber}` : ''}`;

  const request = await fetch(url);

  if (!request.ok) {
    const response = await request.json();
    const rejectReason = response.message ? response.message : 'Unknown error';
    return rejectWithValue(rejectReason);
  }

  return request.json();
});

export const getTopicById = createAsyncThunk<TTopic, { id: number }, { rejectValue: string }>(
  'forum/getTopicById',
  async (data, { rejectWithValue }) => {
    return fetch(`${TOPICS_URL}/${data.id}`)
      .then(res => res.json())
      .catch(err => rejectWithValue(err));
  },
);

export const createTopic = createAsyncThunk<TTopic, ICreateTopicDto, { rejectValue: string }>(
  'forum/createTopic',
  async (data, { rejectWithValue }) => {
    const request = await fetch(TOPICS_URL, {
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

    return request.json();
  },
);

export const addTopicComment = createAsyncThunk<
  TTopic,
  { topicId: number; message: string },
  { rejectValue: string }
>('forum/addTopicComment', async (data, { rejectWithValue }) => {
  const request = await fetch(`${TOPICS_URL}/${data.topicId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: data.message }),
    credentials: 'include',
  });

  if (!request.ok) {
    const response = await request.json();
    const rejectReason = response.reason ? response.reason : 'Unknown error';
    return rejectWithValue(rejectReason);
  }

  return request.json();
});
