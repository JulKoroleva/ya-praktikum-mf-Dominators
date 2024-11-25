import { DefaultValues, FieldValues, useForm } from 'react-hook-form';

import { FormField } from './components/FormField/FormField';
import { Button } from 'react-bootstrap';

import { FormComponentInterface } from './formComponent.interface';
import { FieldConfigInterface } from './components/FormField/formField.interface';

import styles from './formComponent.module.scss';

const FormComponent = <T extends FieldValues>({
  fields,
  initialValues,
  onSubmit,
  submitButtonText,
}: FormComponentInterface<T>) => {
  const { control, handleSubmit, getValues, trigger, clearErrors } = useForm<T>({
    defaultValues: initialValues as DefaultValues<T>,
  });

  return (
    <form className={styles['form-component']} onSubmit={handleSubmit(onSubmit)}>
      {fields.map(field => (
        <FormField
          key={field.id}
          field={field as FieldConfigInterface<FieldValues>}
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

export default FormComponent;
