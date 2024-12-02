import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import { FormComponent } from '@/components/FormComponent';
import { UniversalModal } from '@/components/UniversalModal';

import { TypeDispatch } from '@/redux/store/store';
import { registrationRequest } from '@/redux/requests/pagesRequests/registrationRequests/registrationRequests';
import { clearRegistrationState } from '@/redux/slices/pagesSlices/registrationSlices/registrationSlice';
import {
  selectRegistrationStatus,
  selectRegistrationError,
} from '@/redux/selectors/pagesSelectors/registrationSelectors/registrationSelectors';

import { IRegistrationFormSubmit } from '@/redux/slices/pagesSlices/registrationSlices/registrationSlice.interface';
import { IModalConfig } from '@/components/UniversalModal/universalModal.interface';

import {
  registrationPageFields,
  registrationPageFieldsInitialValues,
} from './registrationPageData';
import { ROUTES } from '@/constants/routes';

import styles from './registration.module.scss';

export const Registration = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<TypeDispatch>();

  const [modalConfig, setModalConfig] = useState<IModalConfig>({
    show: false,
    header: '',
    status: undefined,
  });

  const registrationStatus = useSelector(selectRegistrationStatus);
  const registrationError = useSelector(selectRegistrationError);

  const onSubmit = (data: IRegistrationFormSubmit & { password_repeat: string }) => {
    dispatch(registrationRequest(data));
  };

  const handleCloseModal = () => {
    const status = modalConfig.status;
    dispatch(clearRegistrationState());
    setModalConfig({ show: false, header: '', status: undefined });
    if (status === 'succeeded') {
      navigate(ROUTES.main());
    }
  };

  useEffect(() => {
    let header = '';
    let statusValue = undefined;
    let error = '';
    let succeeded = '';

    if (registrationStatus !== 'idle') {
      statusValue = registrationStatus;
      error = registrationError;
      succeeded = 'User successfully registered';
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
  }, [registrationStatus, registrationError]);

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
