import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Color } from 'react-slider-color-picker/dist/interfaces';
import { hslToRgb } from '../utils/hslToRgb';
import { rgbStringToHsl } from '../utils/rgbStringToHsl';

export const useCirclePicker = () => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [localImage, setLocalImage] = useState<string | null>(null);
  const [color, setLocalColor] = useState<Color | null>({ h: 180, s: 100, l: 50, a: 1 });
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const processedAvatar = useSelector((state: RootState) => state.global.user.processedAvatar);

  useEffect(() => {
    const isRgbColor = processedAvatar?.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (isRgbColor) {
      setLocalColor(rgbStringToHsl(processedAvatar));
      setLocalImage(null);
    } else {
      setLocalImage(processedAvatar);
    }
  }, []);

  const handleChangeColor = async (newColor: Color, onChange: (value: string) => void) => {
    const colorString = hslToRgb(newColor.h, newColor.s, newColor.l);
    setLocalColor(newColor);
    setLocalImage(null);
    onChange(colorString);
  };

  const handleImageUpload = (file: File, onChange: (value: string) => void) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
      setLocalImage(result);
      setLocalColor(null);
      onChange(result);
      setPickerVisible(false);
    };
    reader.readAsDataURL(file);
  };

  return {
    isPickerVisible,
    setPickerVisible,
    localImage,
    color,
    pickerRef,
    handleChangeColor,
    handleImageUpload,
  };
};
