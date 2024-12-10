export interface IRegistrationFormSubmit {
  email: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
}

export interface IUserSlice {
  getUserStatus?: 'loading' | 'succeeded' | 'failed' | 'idle';
  getUserError?: string;
  userInfo: Record<string, string> | null;
}
