import { calculateBorderColor } from '../utils/calculateBorderColor';
import { getBackgroundStyles } from '../helpers/helpers';
import styles from '../../CirclePickerField/CirclePickerField.module.scss';
import { Color } from 'react-slider-color-picker/dist/interfaces';

export const CirclePicker = ({
  onClick,
  localImage = null,
  avatar,
  color,
  fieldValue = '',
}: {
  onClick: () => void;
  localImage?: string | null;
  avatar: string | null;
  color: Color;
  fieldValue?: string;
}) => {
  const backgroundStyles = getBackgroundStyles({
    localImage: localImage || null,
    avatar: !localImage ? avatar : null,
    fieldValue,
  });

  return (
    <div
      className={styles['circle']}
      style={{
        ...backgroundStyles,
        backgroundColor: backgroundStyles.backgroundColor || 'transparent',
        border: `8px solid ${calculateBorderColor(color, !!localImage, fieldValue || avatar)}`,
      }}
      onClick={onClick}
    />
  );
};
