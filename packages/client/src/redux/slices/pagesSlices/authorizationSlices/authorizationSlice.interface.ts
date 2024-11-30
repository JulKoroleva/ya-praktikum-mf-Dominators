export interface IAuthorizationSlice {
  loginStatus: 'loading' | 'succeeded' | 'failed' | 'idle';
  loginError: string;
}

export interface IAuthorizationFormSubmit {
  login: string;
  password: string;
}
