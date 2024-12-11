import { RootState } from '@/redux/store';

export const selectAuthorizationStatus = (state: RootState) =>
  state.authentication.authorization.loginStatus;

export const selectAuthorizationError = (state: RootState) =>
  state.authentication.authorization.loginError;
