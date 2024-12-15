import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import { FormComponent, ErrorNotification } from '@/components';

import { settingsFields, changePasswordFields } from './profilePageData';
import { ROUTES } from '@/constants/routes';
import { HEADERS } from '@/constants/headers';

import styles from './profile.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const Profile = () => {
  const navigate = useNavigate();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const userInfo = useSelector((state: RootState) => state.global.user.userInfo);

  const onSubmit = () => {
    if (isChangingPassword) {
      setIsChangingPassword(false);
    } else {
      navigate(ROUTES.main());
    }
  };

  const settings = (
    <>
      <h1>{HEADERS.profile}</h1>
      <FormComponent
        fields={settingsFields}
        onSubmit={onSubmit}
        initialValues={userInfo}
        submitButtonText="Save"
      />
      <Button
        className={styles['change-password-button']}
        variant="primary"
        onClick={() => setIsChangingPassword(true)}>
        Change password
      </Button>
    </>
  );

  const changePassword = (
    <>
      <h1>Change password</h1>
      <FormComponent fields={changePasswordFields} onSubmit={onSubmit} submitButtonText="Save" />
    </>
  );

  return (
    <div className={styles['profile-page']}>
      <div className={styles['form-container']}>
        <ErrorNotification>{isChangingPassword ? changePassword : settings}</ErrorNotification>
      </div>
    </div>
  );
};
