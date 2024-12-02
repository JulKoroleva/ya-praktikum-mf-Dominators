import { DefaultValues, FieldValues, useForm } from 'react-hook-form';

import { FormField, IFieldConfig } from './components';
import { Button } from 'react-bootstrap';

import { IFormComponentProps } from './FormComponent.interface';

import styles from './FormComponent.module.scss';

export const FormComponent = <T extends FieldValues>({
  fields,
  initialValues,
  onSubmit,
  submitButtonText,
}: IFormComponentProps<T>) => {
  const { control, handleSubmit, getValues, trigger, clearErrors } = useForm<T>({
    defaultValues: initialValues as DefaultValues<T>,
  });

  return (
    <form className={styles['form-component']} onSubmit={handleSubmit(onSubmit)}>
      {fields.map(field => (
        <FormField
          key={field.id}
          field={field as IFieldConfig<FieldValues>}
          control={control}
          getValues={getValues}
          trigger={trigger}
          clearErrors={clearErrors}
        />
      ))}
      <Button className={styles['submit-button']} type="submit" variant="primary">
        {submitButtonText}
      </Button>
    </form>
  );
};
