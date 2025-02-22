import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { useCirclePicker } from './hooks/useCirclePicker';
import { CirclePicker } from './components/CirclePicker';
import { CircleOptions } from './components/CircleOptions';
import styles from './CirclePickerField.module.scss';
import { CirclePickerFieldProps } from './CirclePickerField.interface';

export const CirclePickerField = <T extends FieldValues>({
  name,
  control,
}: CirclePickerFieldProps<T>) => {
  const {
    isPickerVisible,
    setPickerVisible,
    localImage,
    color,
    pickerRef,
    handleChangeColor,
    handleImageUpload,
  } = useCirclePicker();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div ref={pickerRef} className={styles['circle-picker']}>
          <CirclePicker
            onClick={() => setPickerVisible(!isPickerVisible)}
            localImage={localImage}
            color={color}
            fieldValue={field.value}
          />
          {isPickerVisible && (
            <CircleOptions
              handleChangeColor={({ rgb }) => handleChangeColor(rgb, field.onChange)}
              handleImageUpload={e =>
                e.target.files && handleImageUpload(e.target.files[0], field.onChange)
              }
              color={color}
            />
          )}
        </div>
      )}
    />
  );
};
