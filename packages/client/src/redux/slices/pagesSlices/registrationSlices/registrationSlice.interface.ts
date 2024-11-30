export interface IRegistrationFormSubmit {
  email: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
}

export interface IRegistrationSlice {
  registerStatus: 'loading' | 'succeeded' | 'failed' | 'idle';
  registerError: string;
}
