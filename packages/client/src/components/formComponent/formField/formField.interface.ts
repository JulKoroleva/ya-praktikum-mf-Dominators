import {
  Control,
  FieldValues,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormTrigger,
  ValidationValueMessage,
} from 'react-hook-form';

export interface FormFieldInterface<T extends FieldValues> {
  field: FieldConfigInterface;
  control: Control<T>;
  getValues: UseFormGetValues<T>;
  trigger?: UseFormTrigger<T>;
  clearErrors?: UseFormClearErrors<T>;
}

export interface FieldConfigInterface<T extends FieldValues = FieldValues> {
  // общие параметры
  id: string;
  label?: string;
  type: 'text' | 'select' | 'date' | 'password' | 'textarea' | 'file';
  isRequired?: boolean;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  isInLine?: boolean;
  validation?: (
    getValues: UseFormGetValues<T>,
    trigger?: UseFormTrigger<T>,
    clearErrors?: UseFormClearErrors<T>
  ) => ValidationRules;

  // используются для input
  upperCase?: boolean;

  // используются для textarea
  rows?: number;
  needMaxLength?: boolean;
  autosize?: boolean;
  labelPlaceholderRows?: number;

  // используются для file
  accept?: string;

  // используются для select
  isSearchable?: boolean;
  options?: { value: number | string; label: string }[];
}

export interface ValidationRules {
  required?: ValidationValueMessage<boolean>;
  validate?: (value: string) => boolean | string;
}
