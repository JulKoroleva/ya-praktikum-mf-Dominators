import { RootState } from '@/redux/store';

export const selectUser = (state: RootState) => state.global.user.userInfo;

export const selectUserStatus = (state: RootState) => state.global.user.changeUserStatus;

export const selectUserError = (state: RootState) => state.global.user.changeUserError;
