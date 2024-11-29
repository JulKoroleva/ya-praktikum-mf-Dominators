import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FormComponent } from '@/components/FormComponent';
import { Button } from 'react-bootstrap';

import {
  authorizationPageFields,
  authorizationPageFieldsInitialValues,
} from './authorizationPageData';

import styles from './authorization.module.scss';

export const Authorization = () => {
  const navigate = useNavigate();

  const onSubmit = (data: Record<string, string>) => {
    console.log(data);
  };

  return (
    <div className={styles['authorization-page']}>
      <div className={styles['form-container']}>
        <h1>Authorization</h1>
        <FormComponent
          fields={authorizationPageFields}
          onSubmit={onSubmit}
          initialValues={authorizationPageFieldsInitialValues}
          submitButtonText="Sign in"
        />
        <Button
          className={styles['register-button']}
          type="button"
          variant="primary"
          onClick={() => navigate('/registration')}>
          Create account
        </Button>
      </div>
    </div>
  );
};
