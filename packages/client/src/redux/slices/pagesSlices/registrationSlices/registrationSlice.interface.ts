import { TModalStatus } from '@/components';

export interface IRegistrationFormSubmit {
  email: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
}

export interface IRegistrationSlice {
  registerStatus: TModalStatus;
  registerError: string;
}
