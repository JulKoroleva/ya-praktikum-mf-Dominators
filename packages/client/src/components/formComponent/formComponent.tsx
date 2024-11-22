import { DefaultValues, FieldValues, useForm } from 'react-hook-form';

import { FormField } from './components/formField/formField';

import { FormComponentInterface } from './formComponent.interface';
import { FieldConfigInterface } from './components/formField/formField.interface';

import styles from './formComponent.module.scss';

const FormComponent = <T extends FieldValues>({
  fields,
  initialValues,
  onSubmit,
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
