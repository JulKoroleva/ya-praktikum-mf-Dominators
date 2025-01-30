import React from 'react';
import { SliderPicker, ColorChangeHandler } from 'react-color';
import styles from '../../CirclePickerField/CirclePickerField.module.scss';
import { RGBColor } from 'react-color';

export const CircleOptions = ({
  handleChangeColor,
  handleImageUpload,
  color,
}: {
  handleChangeColor: ColorChangeHandler;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color: RGBColor | null;
}) => (
  <div className={styles['options']}>
    <div className={styles['circle-slider']}>
      <SliderPicker color={color || '#FFFFFF'} onChangeComplete={handleChangeColor} />
    </div>
    <div className={styles['upload-option']}>
      <label htmlFor="image-upload" className={styles['upload-label']}>
        Upload Image
        <input
          type="file"
          id="image-upload"
          className={styles['upload-input']}
          onChange={handleImageUpload}
        />
      </label>
    </div>
  </div>
);
