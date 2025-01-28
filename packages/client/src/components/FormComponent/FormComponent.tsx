import { DefaultValues, FieldValues, useForm } from 'react-hook-form';

import { FormField, IFieldConfig } from './components';
import { Button } from 'react-bootstrap';

import { IFormComponentProps } from './FormComponent.interface';

import styles from './FormComponent.module.scss';
import { useEffect } from 'react';

export const FormComponent = <T extends FieldValues>({
  fields,
  initialValues,
  onSubmit,
  submitButtonText,
}: IFormComponentProps<T>) => {
  const { control, handleSubmit, getValues, trigger, clearErrors, reset } = useForm<T>({
    defaultValues: initialValues as DefaultValues<T>,
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

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
