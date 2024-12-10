import { RootState } from '@/redux/store';

export const selectUser = (state: RootState) => state.global.user.userInfo;
