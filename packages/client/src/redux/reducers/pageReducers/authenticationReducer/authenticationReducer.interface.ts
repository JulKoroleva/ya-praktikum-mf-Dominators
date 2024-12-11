import { IAuthorizationSlice, IRegistrationSlice } from '@/redux/slices';

export interface IAuthenticationReducer {
  authorization: IAuthorizationSlice;
  registration: IRegistrationSlice;
}
