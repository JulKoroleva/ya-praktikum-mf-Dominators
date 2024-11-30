import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import { FormComponent } from '@/components/FormComponent';
import { UniversalModal } from '@/components/UniversalModal';

import { TypeDispatch } from '@/redux/store/store';
import { registrationRequest } from '@/redux/requests/pagesRequests/registrationRequests/registrationRequests';
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
    // const validData: Record<string, string> = {...data};
    // delete validData.password_repeat;
    dispatch(registrationRequest(data));
  };

  const handleCloseModal = () => {
    // const status = modalConfig.status;
    // dispatch(resetRegistrationChangePassword());
    setModalConfig({ show: false, header: '', status: undefined });
    // if (status === 'succeeded') {
    //   navigate('/login');
    // }
  };

  useEffect(() => {
    let header = '';
    let statusValue = undefined;
    let error = '';
    let succeeded = '';

    if (registrationStatus !== 'idle') {
      statusValue = registrationStatus;
      error = registrationError;
      succeeded = 'Пароль успешно изменен';
    }

    switch (statusValue) {
      case 'loading':
        header = 'Загрузка';
        statusValue = 'loading';
        break;
      case 'succeeded':
        header = succeeded;
        statusValue = 'succeeded';
        break;
      case 'failed':
        header = error || 'Ошибка';
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
