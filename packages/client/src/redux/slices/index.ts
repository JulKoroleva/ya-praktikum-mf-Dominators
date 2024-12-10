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
export { userSlice, clearUserState } from './globalSlices';
export type { IUserSlice } from './globalSlices';
