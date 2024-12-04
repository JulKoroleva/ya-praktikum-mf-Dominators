import { RootState } from '@/redux/store';

export const selectRegistrationStatus = (state: RootState) =>
  state.authentication.registration?.registerStatus;

export const selectRegistrationError = (state: RootState) =>
  state.authentication.registration?.registerError;
