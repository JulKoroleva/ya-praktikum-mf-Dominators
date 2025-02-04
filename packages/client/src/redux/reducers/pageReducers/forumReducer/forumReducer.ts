import { forumSlice } from '@/redux/slices';
import { IForumSlice } from '@/redux/slices';

export const forumReducer = forumSlice.reducer;

export type TForumReducer = IForumSlice;
