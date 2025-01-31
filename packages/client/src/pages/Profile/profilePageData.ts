import { IFieldConfig } from '@/components/FormComponent/components/FormField/FormField.interface';
import { IUserPassword } from '@/redux/slices';
import { validateEmail } from '@/services/validationUtils';
import { IData } from './Profile.interface';

export const settingsFields: IFieldConfig<IData>[] = [
  {
    id: 'avatar',
    type: 'avatar',
  },
  {
    id: 'theme',
    type: 'checkbox',
    label: 'Dark theme',
  },
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
        if (!/^[A-ZА-ЯЁ][a-zа-яё]*(?:-[A-Za-zА-Яа-яё]*)?$/.test(value)) {
          return 'Enter a valid name';
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
];

export const changePasswordFields: IFieldConfig<IUserPassword>[] = [
  {
    id: 'oldPassword',
    label: 'Old password',
    type: 'password',
    placeholder: 'Enter your old password',
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
    id: 'newPassword',
    label: 'New password',
    type: 'password',
    placeholder: 'Enter your new password',
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
    id: 'newPasswordRepeat',
    label: 'Repeat new password',
    type: 'password',
    placeholder: 'Repeat your new password',
    isRequired: true,
    validation: getValues => ({
      validate: value => {
        if (getValues('newPassword') !== value) {
          return 'Passwords do not match';
        }
        return true;
      },
    }),
  },
];
