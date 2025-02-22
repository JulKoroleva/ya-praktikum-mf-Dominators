import { calculateBorderColor } from '../utils/calculateBorderColor';
import { getBackgroundStyles } from '../helpers/helpers';
import styles from '../../CirclePickerField/CirclePickerField.module.scss';
import { RGBColor } from 'react-color';

export const CirclePicker = ({
  onClick,
  localImage = null,
  color,
  fieldValue = '',
}: {
  onClick: () => void;
  localImage?: string | null;
  color: RGBColor | null;
  fieldValue?: string;
}) => {
  const backgroundStyles = getBackgroundStyles({
    localImage: localImage || null,
    color: !localImage && color !== null ? `rgb(${color.r}, ${color.g}, ${color.b})` : null,
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
