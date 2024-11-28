import { FieldConfigInterface } from '@/components/FormComponent/components/FormField/formField.interface';

export const changePasswordPageFields: FieldConfigInterface[] = [
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
        if (getValues('password') !== value) {
          return 'Passwords do not match';
        }
        return true;
      },
    }),
  },
];
