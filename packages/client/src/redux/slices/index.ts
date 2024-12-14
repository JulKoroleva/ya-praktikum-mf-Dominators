export {
  authorizationSlice,
  clearAuthorizationState,
  registrationSlice,
  clearRegistrationState,
} from './pagesSlices';
export type {
  IAuthorizationFormSubmit,
  IAuthorizationSlice,
  IRegistrationFormSubmit,
  IRegistrationSlice,
} from './pagesSlices';
export { userSlice, clearUserState, clearChangeUserState } from './globalSlices';
export type { IUserSlice, IUserInfo, IUserPassword } from './globalSlices';
