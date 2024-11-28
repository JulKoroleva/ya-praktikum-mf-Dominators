import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import { FormComponent } from '@/components/FormComponent';

import { profilePageFields, profilePageFieldsInitialValues } from './profilePageData';
import { ROUTES } from '@/constants/routes';

import styles from './profile.module.scss';

export const Profile = () => {
  const navigate = useNavigate();

  const onSubmit = (data: Record<string, string>) => {
    console.log(data);
    navigate(ROUTES.main());
  };
  return (
    <div className={styles['profile-page']}>
      <div className={styles['form-container']}>
        <h1>Profile</h1>
        <FormComponent
          fields={profilePageFields}
          onSubmit={onSubmit}
          initialValues={profilePageFieldsInitialValues}
          submitButtonText="Save"
        />
        <Button
          className={styles['change-password-button']}
          variant="primary"
          href={ROUTES.changePassword()}>
          Change password
        </Button>
      </div>
    </div>
  );
};
