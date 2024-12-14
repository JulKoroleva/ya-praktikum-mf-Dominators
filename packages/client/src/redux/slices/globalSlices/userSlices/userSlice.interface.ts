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
  getUserStatus?: 'loading' | 'succeeded' | 'failed' | 'idle';
  getUserError?: string;
  userInfo: IUserInfo;
}
