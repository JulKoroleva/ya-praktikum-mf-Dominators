import { TModalStatus } from '@/components';

export interface IUserInfo {
  id: number;
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  avatar?: string;
  email: string;
  phone: string;
}

export interface IUserSlice {
  getUserStatus?: TModalStatus;
  getUserError?: string;
  changeUserStatus?: TModalStatus;
  changeUserError?: string;
  userInfo: IUserInfo | null;
}

export interface IUserPassword {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat?: string;
}
