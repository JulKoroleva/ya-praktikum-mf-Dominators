import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import {
  FormComponent,
  ErrorNotification,
  UniversalModal,
  IModalConfig,
  TModalStatus,
} from '@/components';

import { profileRequests, passwordRequests } from '@/redux/requests';
import { clearChangeUserState, IUserInfo, IUserPassword } from '@/redux/slices';
import { selectUser, selectUserError, selectUserStatus } from '@/redux/selectors';

import { settingsFields, changePasswordFields } from './profilePageData';
import { HEADERS } from '@/constants/headers';

import { TypeDispatch } from '@/redux/store';

import styles from './profile.module.scss';

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<TypeDispatch>();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const userInfo = useSelector(selectUser);
  const userStatus = useSelector(selectUserStatus);
  const userError = useSelector(selectUserError);

  const [modalConfig, setModalConfig] = useState<IModalConfig>({
    show: false,
    header: '',
    status: undefined,
  });

  const onSubmit = (data: IUserInfo | IUserPassword) => {
    if (isChangingPassword) {
      dispatch(
        passwordRequests({
          oldPassword: (data as IUserPassword).oldPassword,
          newPassword: (data as IUserPassword).newPassword,
        }),
      );
    } else {
      dispatch(profileRequests(data as IUserInfo));
    }
  };

  const handleCloseModal = () => {
    setModalConfig({ show: false, header: '', status: undefined });
    dispatch(clearChangeUserState());
    if (isChangingPassword) {
      setIsChangingPassword(false);
    }
  };

  useEffect(() => {
    let header = '';
    let statusValue: TModalStatus = 'idle';
    let error: typeof userError = '';
    let succeeded = '';

    if (userStatus && userStatus !== 'idle') {
      statusValue = userStatus;
      error = userError;
      succeeded = 'Settings successfully chanched';
    }

    switch (statusValue) {
      case 'loading':
        header = 'Loading...';
        statusValue = 'loading';
        break;
      case 'succeeded':
        header = succeeded;
        statusValue = 'succeeded';
        break;
      case 'failed':
        header = error || 'Something went wrong';
        statusValue = 'failed';
        break;
      default:
        break;
    }

    if (statusValue) {
      setModalConfig({
        show: statusValue !== 'idle',
        header,
        status: statusValue,
      });
    }
  }, [userStatus, userError]);

  const settings = (
    <>
      <h1>{HEADERS.profile}</h1>
      <FormComponent
        fields={settingsFields}
        onSubmit={onSubmit}
        initialValues={userInfo || undefined}
        submitButtonText="Save"
      />
      <Button
        className={styles['change-password-button']}
        variant="primary"
        onClick={() => setIsChangingPassword(true)}>
        Change password
      </Button>
      <Button
        className={styles['back-button']}
        type="button"
        variant="primary"
        onClick={() => navigate(-1)}>
        Back
      </Button>
    </>
  );

  const changePassword = (
    <>
      <h1>Change password</h1>
      <FormComponent fields={changePasswordFields} onSubmit={onSubmit} submitButtonText="Save" />
      <Button
        className={styles['back-button']}
        type="button"
        variant="primary"
        onClick={() => setIsChangingPassword(false)}>
        Back
      </Button>
    </>
  );

  return (
    <div className={styles['profile-page']}>
      <div className={styles['form-container']}>
        <ErrorNotification>{isChangingPassword ? changePassword : settings}</ErrorNotification>
        <UniversalModal
          show={modalConfig.show}
          title={modalConfig.header}
          status={modalConfig.status}
          zIndex={2000}
          onHide={handleCloseModal}
        />
      </div>
    </div>
  );
};
