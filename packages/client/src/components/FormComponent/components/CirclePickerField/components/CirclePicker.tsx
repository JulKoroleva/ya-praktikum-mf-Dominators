import { calculateBorderColor } from '../utils/calculateBorderColor';
import { getBackgroundStyles } from '../helpers/helpers';
import styles from '../../CirclePickerField/CirclePickerField.module.scss';
import { Color } from 'react-slider-color-picker/dist/interfaces';
import { ICirclePickerState } from '@/redux/slices/componentsSlices/circlePickerSlice.interface';

export const CirclePicker = ({
  onClick,
  localImage = null,
  currentState,
  color,
  fieldValue = '',
}: {
  onClick: () => void;
  localImage?: string | null;
  currentState: ICirclePickerState;
  color: Color;
  fieldValue?: string;
}) => {
  const backgroundStyles = getBackgroundStyles({
    localImage,
    selectedImage: currentState.selectedImage,
    selectedColor: currentState.selectedColor || '',
    fieldValue,
  });

  return (
    <div
      className={styles['circle']}
      style={{
        ...backgroundStyles,
        border: `8px solid ${calculateBorderColor(
          color,
          !!(localImage || currentState.selectedImage),
          fieldValue || currentState.selectedColor,
        )}`,
      }}
      onClick={onClick}
    />
  );
};
