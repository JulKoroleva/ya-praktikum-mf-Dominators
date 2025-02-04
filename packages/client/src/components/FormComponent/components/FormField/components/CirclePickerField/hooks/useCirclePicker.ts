import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { RGBColor } from 'react-color';

export const useCirclePicker = () => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [localImage, setLocalImage] = useState<string | null>(null);
  const [color, setLocalColor] = useState<RGBColor | null>({ r: 0, g: 224, b: 255, a: 2 });
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const processedAvatar = useSelector((state: RootState) => state.global.user.processedAvatar);

  useEffect(() => {
    const rgbColor = processedAvatar?.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (rgbColor) {
      const [, r, g, b] = rgbColor.map(Number);
      setLocalColor({ r, g, b, a: 1 });
      setLocalImage(null);
    } else {
      setLocalImage(processedAvatar);
    }
  }, []);

  const handleChangeColor = async (newColor: RGBColor, onChange: (value: string) => void) => {
    setLocalColor(newColor);
    setLocalImage(null);
    onChange(`rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`);
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
