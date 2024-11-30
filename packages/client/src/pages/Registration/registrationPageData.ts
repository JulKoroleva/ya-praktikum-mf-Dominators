import { FieldConfigInterface } from '@/components/FormComponent/components/FormField/formField.interface';
import { IRegistrationFormSubmit } from '@/redux/slices/pagesSlices/registrationSlices/registrationSlice.interface';
import { validateEmail } from '@/services/validationUtils';

export const registrationPageFields: FieldConfigInterface<
  IRegistrationFormSubmit & { password_repeat: string }
>[] = [
  {
    id: 'email',
    label: 'Email',
    type: 'text',
    placeholder: 'Enter your email',
    isRequired: true,
    validation: () => ({
      validate: value => {
        return validateEmail(value);
      },
    }),
  },
  {
    id: 'login',
    label: 'Login',
    type: 'text',
    placeholder: 'Enter your login',
    isRequired: true,
    validation: () => ({
      validate: value => {
        if (!/^(?=[a-zA-Z_-]*\d?[a-zA-Z_-])[a-zA-Z0-9_-]{3,20}$/.test(value)) {
          return 'Enter a valid login';
        }
        return true;
      },
    }),
  },
  {
    id: 'first_name',
    label: 'First name',
    type: 'text',
    placeholder: 'Enter your first name',
    isRequired: true,
    validation: () => ({
      validate: value => {
        if (!/^[A-ZА-ЯЁ][a-zа-яё]*(?:-[A-Za-zА-Яа-яё]*)?$/.test(value)) {
          return 'Enter a valid name';
        }
        return true;
      },
    }),
  },
  {
    id: 'second_name',
    label: 'Second name',
    type: 'text',
    placeholder: 'Enter your second name',
    isRequired: true,
    validation: () => ({
      validate: value => {
        if (!/^[A-ZА-ЯЁ][a-zа-яё]*(?:-[A-Za-zА-Яа-яё]*)?$/.test(value)) {
          return 'Enter a valid name';
        }
        return true;
      },
    }),
  },
  {
    id: 'phone',
    label: 'Phone',
    type: 'text',
    placeholder: 'Enter your phone',
    isRequired: true,
    validation: () => ({
      validate: value => {
        if (!/^\+?\d{10,15}$/.test(value)) {
          return 'Enter a valid phone number';
        }
        return true;
      },
    }),
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    isRequired: true,
    validation: () => ({
      validate: value => {
        if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(value)) {
          return 'Enter a valid password';
        }
        return true;
      },
    }),
  },
  {
    id: 'password_repeat',
    label: 'Repeat password',
    type: 'password',
    placeholder: 'Repeat your password',
    isRequired: true,
    validation: getValues => ({
      validate: value => {
        if (getValues('password') !== value) {
          return 'Passwords do not match';
        }
        return true;
      },
    }),
  },
];

export const registrationPageFieldsInitialValues = {
  email: '',
  login: '',
  first_name: '',
  second_name: '',
  phone: '',
  password: '',
  password_repeat: '',
};
