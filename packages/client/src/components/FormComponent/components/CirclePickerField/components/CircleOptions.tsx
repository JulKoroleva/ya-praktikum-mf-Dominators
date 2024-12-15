import React from 'react';
import { HueSlider } from 'react-slider-color-picker';
import styles from '../../CirclePickerField/CirclePickerField.module.scss';
import { Color } from 'react-slider-color-picker/dist/interfaces';

export const CircleOptions = ({
  handleChangeColor,
  handleImageUpload,
  color,
}: {
  handleChangeColor: (newColor: Color) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color: Color | null;
}) => (
  <div className={styles['options']}>
    <div className={styles['circle-slider']}>
      <HueSlider
        handleChangeColor={handleChangeColor}
        color={color || { h: 0, s: 0, l: 100, a: 1 }}
      />
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
