import { createSlice } from '@reduxjs/toolkit';

import { fetchForum } from '@/redux/requests';

import { IForumSlice } from './forumSlice.interface';
import {
  addTopicComment,
  createTopic,
  getTopicById,
} from '@/redux/requests/pagesRequests/forumRequests/forumRequests';

const initialState: IForumSlice = {
  topicList: [],
  paginationOptions: {
    page: 1,
    total: 5,
    perPage: 5,
  },
  topicListStatus: 'idle',
  topicListError: '',
  createTopicStatus: 'idle',
  createTopicError: '',
  addTopicCommentStatus: 'idle',
  addTopicCommentError: '',
  topicById: null,
  getTopicByIdStatus: 'idle',
  getTopicByIdError: '',
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
        perPage: 5,
      };
      state.topicListStatus = 'idle';
      state.topicListError = '';
      state.createTopicStatus = 'idle';
      state.createTopicError = '';
      state.addTopicCommentStatus = 'idle';
      state.addTopicCommentError = '';
      state.topicById = null;
      state.getTopicByIdStatus = 'idle';
      state.getTopicByIdError = '';
    },
    clearForumStatus: state => {
      state.createTopicStatus = 'idle';
      state.createTopicError = '';
    },
    clearTopicCommentStatus: state => {
      state.addTopicCommentStatus = 'idle';
      state.addTopicCommentError = '';
    },
    clearTopicById: state => {
      state.topicById = null;
      state.getTopicByIdStatus = 'idle';
      state.getTopicByIdError = '';
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
      })
      .addCase(createTopic.pending, state => {
        state.createTopicStatus = 'loading';
      })
      .addCase(createTopic.fulfilled, state => {
        state.createTopicStatus = 'succeeded';
      })
      .addCase(createTopic.rejected, (state, action) => {
        state.createTopicStatus = 'failed';
        state.createTopicError = action.error.message!;
      })
      .addCase(addTopicComment.pending, state => {
        state.addTopicCommentStatus = 'loading';
      })
      .addCase(addTopicComment.fulfilled, state => {
        state.addTopicCommentStatus = 'succeeded';
      })
      .addCase(addTopicComment.rejected, (state, action) => {
        state.addTopicCommentStatus = 'failed';
        state.addTopicCommentError = action.error.message!;
      })
      .addCase(getTopicById.pending, state => {
        state.getTopicByIdStatus = 'loading';
      })
      .addCase(getTopicById.fulfilled, (state, action) => {
        state.getTopicByIdStatus = 'succeeded';
        state.topicById = action.payload;
      })
      .addCase(getTopicById.rejected, (state, action) => {
        state.getTopicByIdStatus = 'failed';
        state.getTopicByIdError = action.error.message!;
      });
  },
});

export const { clearForumState, clearForumStatus, clearTopicCommentStatus, clearTopicById } =
  forumSlice.actions;
