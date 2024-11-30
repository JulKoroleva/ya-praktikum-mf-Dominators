import { FieldConfigInterface } from '@/components/FormComponent/components/FormField/formField.interface';
import { IAuthorizationFormSubmit } from '@/redux/slices/pagesSlices/authorizationSlices/authorizationSlice.interface';

export const authorizationPageFields: FieldConfigInterface<IAuthorizationFormSubmit>[] = [
  {
    id: 'login',
    label: 'Login',
    type: 'text',
    placeholder: 'Enter your login',
    isRequired: true,
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    isRequired: true,
  },
];

export const authorizationPageFieldsInitialValues = {
  login: '',
  password: '',
};
