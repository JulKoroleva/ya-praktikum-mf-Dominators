import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button } from 'react-bootstrap';
import { FormComponent, ErrorNotification } from '@/components';

import { selectUser } from '@/redux/selectors';

import { settingsFields, changePasswordFields } from './profilePageData';
import { ROUTES } from '@/constants/routes';
import { HEADERS } from '@/constants/headers';

import styles from './profile.module.scss';

export const Profile = () => {
  const navigate = useNavigate();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const userInfo = useSelector(selectUser);

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
      {userInfo?.id && (
        <FormComponent
          fields={settingsFields}
          onSubmit={onSubmit}
          initialValues={userInfo}
          submitButtonText="Save"
        />
      )}
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
