import React from 'react';

import { FormComponent } from '@/components/FormComponent';

import {
  registrationPageFields,
  registrationPageFieldsInitialValues,
} from './registrationPageData';

import styles from './registration.module.scss';

export const Registration = () => {
  const onSubmit = (data: Record<string, string>) => {
    console.log(data);
  };
  return (
    <div className={styles['registration-page']}>
      <div className={styles['form-container']}>
        <h1>Create account</h1>
        <FormComponent
          fields={registrationPageFields}
          onSubmit={onSubmit}
          initialValues={registrationPageFieldsInitialValues}
          submitButtonText="Sign up"
        />
      </div>
    </div>
  );
};
