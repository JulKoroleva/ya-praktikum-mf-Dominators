import { RootState } from '@/redux/store';

export const selectTopicList = (state: RootState) => state.forum.topicList;

export const selectPaginationOptions = (state: RootState) => state.forum.paginationOptions;

export const selectTopicListStatus = (state: RootState) => state.forum.topicListStatus;

export const selectTopicListError = (state: RootState) => state.forum.topicListError;
