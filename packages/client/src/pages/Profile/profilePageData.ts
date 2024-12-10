import { IFieldConfig } from '@/components/FormComponent/components/FormField/FormField.interface';
import { validateEmail } from '@/services/validationUtils';

export const settingsFields: IFieldConfig[] = [
  {
    id: 'profileCircle',
    type: 'circlepicker',
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

export const settingsFieldsInitialValues = {
  email: 'user@mail.ru',
  first_name: 'Username',
  second_name: 'Usersecondname',
  phone: '1234567890',
};

export const changePasswordFields: IFieldConfig[] = [
  {
    id: 'old_password',
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
    id: 'new_password',
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
    id: 'new_password_repeat',
    label: 'Repeat new password',
    type: 'password',
    placeholder: 'Repeat your new password',
    isRequired: true,
    validation: getValues => ({
      validate: value => {
        if (getValues('new_password') !== value) {
          return 'Passwords do not match';
        }
        return true;
      },
    }),
  },
];
