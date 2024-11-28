import React from 'react';

import { useNavigate } from 'react-router-dom';

import { FormComponent } from '@/components/FormComponent';

import { changePasswordPageFields } from './changePasswordPageData';
import { ROUTES } from '@/constants/routes';

import styles from './changePassword.module.scss';

export const ChangePassword = () => {
  const navigate = useNavigate();

  const onSubmit = (data: Record<string, string>) => {
    console.log(data);
    navigate(ROUTES.profile());
  };
  return (
    <div className={styles['change-password-page']}>
      <div className={styles['form-container']}>
        <h1>Change password</h1>
        <FormComponent
          fields={changePasswordPageFields}
          onSubmit={onSubmit}
          submitButtonText="Save"
        />
      </div>
    </div>
  );
};
