import { TModalStatus } from '@/components';

export interface IAuthorizationSlice {
  loginStatus: TModalStatus;
  loginError: string;
  logoutStatus: TModalStatus;
  logoutError: string;
}

export interface IAuthorizationFormSubmit {
  login: string;
  password: string;
}
