import { createAsyncThunk } from '@reduxjs/toolkit';
import { TTopic, TPaginationOptions } from '@/pages/Forum/components';

import {
  ICreateTopicDto,
  TTopicComment,
} from '@/pages/Forum/components/TopicList/TopicList.interface';
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
  TTopicComment,
  { topicId: number; message: string; creator: string; creatorId: number },
  { rejectValue: string }
>(
  'forum/addTopicComment',
  async ({ topicId, message, creator, creatorId }, { rejectWithValue }) => {
    const request = await fetch(`${TOPICS_URL}/${topicId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, creator, creatorId }),
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

export const addReaction = createAsyncThunk<
  void,
  { id: number; type: 'topic' | 'comment'; emoji: string; creatorId: number },
  { rejectValue: string }
>('forum/addReaction', async ({ id, type, emoji, creatorId }, { rejectWithValue }) => {
  const request = await fetch(
    `${TOPICS_URL}/${type === 'comment' ? 'comment/' : 'topic/'}${id}/reactions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emoji, type, creatorId }),
      credentials: 'include',
    },
  );

  if (!request.ok) {
    const response = await request.json();
    const rejectReason = response.reason ? response.reason : 'Unknown error';
    return rejectWithValue(rejectReason);
  }

  return request.json();
});

export const deleteReaction = createAsyncThunk<
  void,
  { id: number; type: 'topic' | 'comment'; emoji: string; creatorId: number },
  { rejectValue: string }
>('forum/deleteReaction', async ({ id, type, emoji, creatorId }, { rejectWithValue }) => {
  const request = await fetch(
    `${TOPICS_URL}/${type === 'comment' ? 'comment/' : 'topic/'}${id}/reactions`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emoji, type, creatorId }),
      credentials: 'include',
    },
  );

  if (!request.ok) {
    const response = await request.json();
    const rejectReason = response.reason ? response.reason : 'Unknown error';
    return rejectWithValue(rejectReason);
  }

  return request.json();
});

export const deleteTopic = createAsyncThunk<void, { id: number }, { rejectValue: string }>(
  'forum/deleteTopic',
  async ({ id }, { rejectWithValue }) => {
    const request = await fetch(`${TOPICS_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
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

export const deleteComment = createAsyncThunk<void, { id: number }, { rejectValue: string }>(
  'forum/deleteComment',
  async ({ id }, { rejectWithValue }) => {
    const request = await fetch(`${TOPICS_URL}/${id}/comments`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
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
