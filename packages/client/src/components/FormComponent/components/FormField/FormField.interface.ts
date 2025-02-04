import {
  Control,
  FieldValues,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormTrigger,
  ValidationValueMessage,
} from 'react-hook-form';

export interface IFormFieldProps<T extends FieldValues> {
  field: IFieldConfig;
  control: Control<T>;
  getValues: UseFormGetValues<T>;
  trigger: UseFormTrigger<T>;
  clearErrors?: UseFormClearErrors<T>;
}

export interface IFieldConfig<T extends FieldValues = FieldValues> {
  // общие параметры
  id: string;
  label?: string;
  type: 'text' | 'select' | 'date' | 'password' | 'textarea' | 'file' | 'avatar' | 'checkbox';
  isRequired?: boolean;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  isInLine?: boolean;
  validation?: (
    _getValues: UseFormGetValues<T>,
    _trigger?: UseFormTrigger<T>,
    _clearErrors?: UseFormClearErrors<T>,
  ) => ValidationRules;

  // используются для input
  upperCase?: boolean;

  // используются для textarea
  rows?: number;
  needMaxLength?: boolean;
  autosize?: boolean;

  // используются для file
  accept?: string;

  // используются для select
  isSearchable?: boolean;
  options?: { value: number | string; label: string }[];
}

export interface ValidationRules {
  required?: ValidationValueMessage<boolean>;
  validate?: (_value: string) => boolean | string;
}
