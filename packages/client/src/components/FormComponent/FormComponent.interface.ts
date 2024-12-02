import { FieldValues, SubmitHandler } from 'react-hook-form';
import { IFieldConfig } from './components/FormField/FormField.interface';

export interface IFormComponentProps<T extends FieldValues> {
  /**
   * Конфигурация полей
   */
  fields: IFieldConfig<T>[];
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
