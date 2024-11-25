import { FieldValues, SubmitHandler } from 'react-hook-form';
import { FieldConfigInterface } from './components/FormField/formField.interface';

export interface FormComponentInterface<T extends FieldValues> {
  /**
   * Конфигурация полей
   */
  fields: FieldConfigInterface<T>[];
  /**
   * Начальные значения
   */
  initialValues?: T;
  /**
   * Обработчик отправки формы
   */
  onSubmit: SubmitHandler<T>;
  /**
   * Текст кнопки отправки
   */
  submitButtonText: string;
}
