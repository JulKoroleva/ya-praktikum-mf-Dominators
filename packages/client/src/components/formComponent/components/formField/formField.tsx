import React, { useState } from 'react';
import { Controller, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

import { Form } from 'react-bootstrap';
import Select from 'react-select';
import TextareaAutosize from 'react-textarea-autosize';

// import CrossedEyeIcon from '@/assets/icons/crossed-eye.svg?react';
// import EyeIcon from '@/assets/icons/eye.svg?react';
// import CloseIcon from '@/assets/icons/close.svg?react';

import { FieldConfigInterface, FormFieldInterface } from './formField.interface';

import { formFieldSelectStyles, OptionType } from './formFieldSelectStyles';

import styles from './formField.module.scss';

export const FormField = <T extends FieldValues>({
  field,
  control,
  getValues,
  trigger,
  clearErrors,
}: FormFieldInterface<T>) => {
  const { validation, isRequired } = field as FieldConfigInterface<T>;

  const validationRules = {
    ...(validation ? validation(getValues, trigger, clearErrors) : {}),
    ...(isRequired
      ? { required: { value: true, message: 'This field is required' } }
      : { required: '' }),
  };

  const [isEyeVisible, setIsEyeVisible] = useState(false);

  const onFieldBlur =
    (fieldData: ControllerRenderProps<T, Path<T>>) => (e: React.FocusEvent<HTMLInputElement>) => {
      if (e.target.value) {
        const value = e.target.value.trimEnd();
        fieldData.onChange(value);
      }
    };

  const handleMouseDown = () => {
    setIsEyeVisible(true);
  };

  const handleMouseUp = () => {
    setIsEyeVisible(false);
  };

  return (
    <Form.Group className={`${styles['form-field']} ${field.isInLine && styles['form-field-row']}`}>
      {field.label && (
        <Form.Label className={styles['label']}>
          <div>
            {field.label}
            {field.isRequired && <span className={styles['required-star']}>*</span>}
          </div>
        </Form.Label>
      )}
      <div className={`${field.isInLine && styles['form-field-main']}`}>
        {field.type === 'file' && (
          <Controller
            name={field.id as Path<T>}
            control={control}
            rules={validationRules}
            render={({ field: fieldData, fieldState: { error } }) => {
              return (
                <>
                  <label className={styles['file-upload']}>
                    <input
                      type="file"
                      accept={field.accept}
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          fieldData.onChange(file);
                        } else {
                          fieldData.onChange(null);
                        }
                      }}
                      name={field.id}
                      disabled={field.disabled}
                      className={styles['file-input']}
                    />
                  </label>
                  {fieldData.value && (
                    <div className={styles['file-name']}>
                      <span>{fieldData.value?.name}</span>
                      {/* <CloseIcon
                        className={styles['clear-file-icon']}
                        onClick={() => {
                          const inputElem = document.querySelector(
                            `input[name="${field.id}"]`,
                          ) as HTMLInputElement;
                          if (inputElem.files?.length) {
                            inputElem.value = '';
                          }
                          fieldData.onChange(null);
                        }}
                      /> */}
                    </div>
                  )}

                  {error && <div className="invalid-feedback d-block">{error.message}</div>}
                </>
              );
            }}
          />
        )}
        {field.type === 'text' && (
          <Controller
            name={field.id as Path<T>}
            control={control}
            rules={validationRules}
            render={({ field: fieldData, fieldState: { error } }) => {
              return (
                <>
                  <Form.Control
                    className={styles['input']}
                    placeholder={field?.placeholder ? field?.placeholder : ''}
                    type="text"
                    {...fieldData}
                    value={
                      (fieldData.value !== null
                        ? (field.upperCase
                            ? String(fieldData.value).toUpperCase()
                            : String(fieldData.value)
                          )?.trimStart()
                        : '') || ''
                    }
                    onChange={e => {
                      const value = e.target.value.trimStart();
                      fieldData.onChange(value === '' ? null : value);
                    }}
                    isInvalid={!!error}
                    disabled={field.disabled}
                    maxLength={field.maxLength}
                    onBlur={() => {
                      trigger(field.id as Path<T>);
                      onFieldBlur(fieldData);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>
                </>
              );
            }}
          />
        )}
        {field.type === 'password' && (
          <Controller
            name={field.id as Path<T>}
            control={control}
            rules={validationRules}
            render={({ field: fieldData, fieldState: { error } }) => {
              return (
                <>
                  <Form.Control
                    className={styles['input']}
                    placeholder={field?.placeholder ? field?.placeholder : ''}
                    type={!isEyeVisible ? 'password' : 'text'}
                    {...fieldData}
                    value={fieldData.value?.trimStart()?.trimEnd() || ''}
                    onChange={e => fieldData.onChange(e.target.value.trimStart().trimEnd())}
                    isInvalid={!!error}
                    disabled={field.disabled}
                    maxLength={field.maxLength}
                    onBlur={() => {
                      trigger(field.id as Path<T>);
                      onFieldBlur(fieldData);
                    }}
                  />
                  <button
                    className={styles['invisible-button']}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleMouseDown}
                    onTouchEnd={handleMouseUp}
                    onTouchCancel={handleMouseUp}
                    type="button">
                    {/* {isEyeVisible ? <CrossedEyeIcon /> : <EyeIcon />} */}
                  </button>
                  <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>
                </>
              );
            }}
          />
        )}
        {field.type === 'select' && field.options && (
          <Controller
            name={field.id as Path<T>}
            control={control}
            rules={validationRules}
            render={({ field: controllerField, fieldState: { error } }) => {
              const placeholderOption = field.placeholder
                ? {
                    value: null,
                    label: field.placeholder,
                  }
                : null;

              const optionsWithPlaceholder = [
                ...(placeholderOption ? [placeholderOption] : []),
                ...(field.options ?? []),
              ];

              const normalizeValue = (value: string | number | boolean) => {
                if (value === true || value === false) return value;
                if (value === 'true') return true;
                if (value === 'false') return false;
                return value;
              };

              const selectedOption = optionsWithPlaceholder.find(option => {
                const normalizedValue = normalizeValue(controllerField.value);
                return option.value === normalizedValue || option.value === String(normalizedValue);
              });

              return (
                <>
                  <Select
                    isDisabled={field.disabled}
                    isSearchable={field.isSearchable !== undefined ? field.isSearchable : true}
                    placeholder={field?.placeholder ? field?.placeholder : ''}
                    {...controllerField}
                    options={optionsWithPlaceholder}
                    value={selectedOption?.value ? selectedOption : null}
                    styles={formFieldSelectStyles}
                    aria-invalid={!!error}
                    onChange={(newValue: unknown) => {
                      const value = (newValue as OptionType)?.value;
                      // это сделано для обработки булевых значений, потому что пакет из react-select некорректно поддерживает boolean
                      const processedValue =
                        value === 'true' ? true : value === 'false' ? false : value;
                      controllerField.onChange(processedValue);
                    }}
                  />
                  {error && <div className="invalid-feedback d-block">{error.message}</div>}
                </>
              );
            }}
          />
        )}
        {field.type === 'date' && (
          <Controller
            name={field.id as Path<T>}
            control={control}
            rules={validationRules}
            render={({ field: fieldData, fieldState: { error } }) => {
              return (
                <>
                  <Form.Control
                    type="date"
                    {...fieldData}
                    value={fieldData.value || ''}
                    disabled={field.disabled}
                    onChange={e => {
                      const value = e.target.value.trimStart();
                      fieldData.onChange(value === '' ? null : value);
                    }}
                    isInvalid={!!error}
                  />
                  <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>
                </>
              );
            }}
          />
        )}

        {field.type === 'textarea' && (
          <Controller
            name={field.id as Path<T>}
            control={control}
            rules={validationRules}
            render={({ field: fieldData, fieldState: { error } }) => {
              const maxLength = field.maxLength ? field.maxLength : 1000;
              const currentLength = fieldData.value ? fieldData.value.length : 0;
              return (
                <>
                  {field.autosize ? (
                    <TextareaAutosize
                      id={field.id}
                      minRows={field.rows || 3}
                      className={`${styles['form-textarea']} ${error ? 'is-invalid' : ''}`}
                      placeholder={field.placeholder || ''}
                      value={fieldData.value?.trimStart() || ''}
                      onChange={e => {
                        const value = e.target.value.trimStart();
                        fieldData.onChange(value === '' ? null : value);
                      }}
                      disabled={field.disabled}
                      maxLength={maxLength}
                      // onBlur={onFieldBlur(fieldData)}
                    />
                  ) : (
                    <Form.Control
                      as="textarea"
                      rows={field.rows || 3}
                      placeholder={field.placeholder || ''}
                      {...fieldData}
                      value={fieldData.value?.trimStart() || ''}
                      onChange={e => {
                        const value = e.target.value.trimStart();
                        fieldData.onChange(value === '' ? null : value);
                      }}
                      isInvalid={!!error}
                      disabled={field.disabled}
                      style={!field.rows ? { height: '96px' } : {}}
                      maxLength={maxLength}
                      onBlur={() => {
                        trigger(field.id as Path<T>);
                        onFieldBlur(fieldData);
                      }}
                    />
                  )}
                  <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>
                  {field.needMaxLength && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '5px',
                        fontSize: 'smaller',
                        color: '#6c757d',
                      }}>
                      {currentLength} / {maxLength}
                    </div>
                  )}
                </>
              );
            }}
          />
        )}
      </div>
    </Form.Group>
  );
};
