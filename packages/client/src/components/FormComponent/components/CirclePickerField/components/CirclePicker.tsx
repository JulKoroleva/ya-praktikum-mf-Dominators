import { calculateBorderColor } from '../utils/calculateBorderColor';
import { getBackgroundStyles } from '../helpers/helpers';
import styles from '../../CirclePickerField/CirclePickerField.module.scss';
import { Color } from 'react-slider-color-picker/dist/interfaces';
import { hslToRgb } from '../utils/hslToRgb';

export const CirclePicker = ({
  onClick,
  localImage = null,
  color,
  fieldValue = '',
}: {
  onClick: () => void;
  localImage?: string | null;
  color: Color;
  fieldValue?: string;
}) => {
  const backgroundStyles = getBackgroundStyles({
    localImage: localImage || null,
    color: !localImage ? hslToRgb(color.h, color.s, color.l) : null,
    fieldValue,
  });
  return (
    <div
      className={styles['circle']}
      style={{
        ...backgroundStyles,
        backgroundColor: backgroundStyles.backgroundColor || 'transparent',
        border: `8px solid ${calculateBorderColor(color, !!localImage, fieldValue)}`,
      }}
      onClick={onClick}
    />
  );
};
