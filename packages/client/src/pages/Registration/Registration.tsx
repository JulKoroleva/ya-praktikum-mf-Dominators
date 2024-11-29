import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import { FormComponent } from '@/components/FormComponent';

import {
  registrationPageFields,
  registrationPageFieldsInitialValues,
} from './registrationPageData';

import styles from './registration.module.scss';

export const Registration = () => {
  const navigate = useNavigate();

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
        <Button
          className={styles['back-button']}
          type="button"
          variant="primary"
          onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
};
