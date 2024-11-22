import { FieldValues, SubmitHandler } from 'react-hook-form';
import { FieldConfigInterface } from './components/formField/formField.interface';

export interface FormComponentInterface<T extends FieldValues> {
  fields: FieldConfigInterface<T>[]; // Конфигурация полей
  initialValues?: T; // Начальные значения
  onSubmit: SubmitHandler<T>; // Обработчик отправки формы
}
