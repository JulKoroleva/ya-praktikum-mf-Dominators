import { FieldConfigInterface } from '@/components/FormComponent/components/FormField/formField.interface';
import { validateEmail } from '@/services/validationUtils';

export const profilePageFields: FieldConfigInterface[] = [
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

export const profilePageFieldsInitialValues = {
  email: 'user@mail.ru',
  first_name: 'Username',
  second_name: 'Usersecondname',
  phone: '1234567890',
};
