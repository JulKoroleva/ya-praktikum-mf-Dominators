import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColor, setImage } from '@/redux/slices/componentsSlices/circlePickerSlice';
import { RootState } from '@/redux/store';
import { Color } from 'react-slider-color-picker/dist/interfaces';
import { hslToRgb } from '../utils/hslToRgb';

export const useCirclePicker = () => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [localImage, setLocalImage] = useState<string | null>(null);
  const [color, setLocalColor] = useState<Color>({ h: 180, s: 100, l: 50, a: 1 });
  const pickerRef = useRef<HTMLDivElement | null>(null);

  const currentState = useSelector((state: RootState) => state.circlePicker);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setPickerVisible(false);
      }
    };

    if (isPickerVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPickerVisible]);

  const handleChangeColor = (newColor: Color, onChange: (value: string) => void) => {
    setLocalColor(newColor);
    const colorString = hslToRgb(newColor.h, newColor.s, newColor.l);

    if (localImage) {
      setLocalImage(null);
      dispatch(setImage(null));
    }

    dispatch(setColor(colorString));
    onChange(colorString);
  };

  const handleImageUpload = (file: File, onChange: (value: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setLocalImage(result);
      dispatch(setImage(result));
      onChange(result);
    };
    reader.readAsDataURL(file);
  };

  return {
    currentState,
    isPickerVisible,
    setPickerVisible,
    localImage,
    color,
    pickerRef,
    handleChangeColor,
    handleImageUpload,
  };
};
