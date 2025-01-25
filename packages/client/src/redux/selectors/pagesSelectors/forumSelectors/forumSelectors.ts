import { RootState } from '@/redux/store';

export const selectTopicList = (state: RootState) => state.forum.topicList;

export const selectPaginationOptions = (state: RootState) => state.forum.paginationOptions;

export const selectTopicListStatus = (state: RootState) => state.forum.topicListStatus;

export const selectTopicListError = (state: RootState) => state.forum.topicListError;

export const selectCreateTopicStatus = (state: RootState) => state.forum.createTopicStatus;

export const selectCreateTopicError = (state: RootState) => state.forum.createTopicError;

export const selectTopicCommentStatus = (state: RootState) => state.forum.addTopicCommentStatus;

export const selectTopicCommentError = (state: RootState) => state.forum.addTopicCommentError;

export const selectTopicById = (state: RootState) => state.forum.topicById;

export const selectGetTopicByIdStatus = (state: RootState) => state.forum.getTopicByIdStatus;

export const selectGetTopicByIdError = (state: RootState) => state.forum.getTopicByIdError;
