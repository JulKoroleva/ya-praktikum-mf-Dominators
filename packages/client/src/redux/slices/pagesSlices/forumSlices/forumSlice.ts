import { createSlice } from '@reduxjs/toolkit';

import { fetchForum } from '@/redux/requests';

import { IForumSlice } from './forumSlice.interface';

const initialState: IForumSlice = {
  topicList: [],
  paginationOptions: {
    page: 1,
    total: 5,
  },
  topicListStatus: 'idle',
  topicListError: '',
};

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    clearForumState: state => {
      state.topicList = [];
      state.paginationOptions = {
        page: 1,
        total: 5,
      };
      state.topicListStatus = 'idle';
      state.topicListError = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchForum.pending, state => {
        state.topicListStatus = 'loading';
      })
      .addCase(fetchForum.fulfilled, (state, action) => {
        state.topicListStatus = 'succeeded';
        state.topicList = action.payload.topicList;
        state.paginationOptions = action.payload.paginationOptions;
      })
      .addCase(fetchForum.rejected, (state, action) => {
        state.topicListStatus = 'failed';
        state.topicListError = action.error.message!;
      });
  },
});

export const { clearForumState } = forumSlice.actions;
