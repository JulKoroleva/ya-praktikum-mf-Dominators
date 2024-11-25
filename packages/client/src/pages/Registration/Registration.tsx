import React from 'react';

import FormComponent from '@/components/FormComponent/FormComponent';

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
    <div>
      <h1>Registration page</h1>
      <div className={styles['form-container']}>
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
