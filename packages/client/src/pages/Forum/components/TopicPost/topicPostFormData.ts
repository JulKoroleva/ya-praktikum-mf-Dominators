import { FieldConfigInterface } from '@/components/FormComponent/components/FormField/formField.interface';

export const topicPostFormData: FieldConfigInterface[] = [
  {
    id: 'comment',
    label: 'Comment text',
    type: 'textarea',
    placeholder: 'Enter topic title',
    maxLength: 500,
    validation: () => ({
      validate: value => {
        if (value.length < 20) {
          return 'Minimum 20 characters';
        }
        return true;
      },
    }),
  },
];

export const topicPostFormDataInitialValues = {
  comment: '',
};
