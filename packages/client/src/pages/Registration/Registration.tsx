import React from 'react';

import FormComponent from '@/components/formComponent/formComponent';

import {
  registrationPageFields,
  registrationPageFieldsInitialValues,
} from './registrationPageData';

export const Registration = () => {
  const onSubmit = (data: Record<string, string>) => {
    console.log(data);
  };
  return (
    <div>
      <h1>Registration page</h1>
      <FormComponent
        fields={registrationPageFields}
        onSubmit={onSubmit}
        initialValues={registrationPageFieldsInitialValues}
      />
    </div>
  );
};
