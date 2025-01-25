import { IFieldConfig } from '@/components/FormComponent/components/FormField/FormField.interface';

export const topicPostFormData: IFieldConfig[] = [
  {
    id: 'message',
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
  message: '',
};
