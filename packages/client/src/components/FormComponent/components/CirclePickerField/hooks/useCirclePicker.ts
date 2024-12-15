import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Color } from 'react-slider-color-picker/dist/interfaces';
import { hslToRgb } from '../utils/hslToRgb';
import { TypeDispatch } from '@/redux/store';
import { RESURSES_URL } from '@/constants/apiUrls';
import { rgbStringToHsl } from '../utils/rgbStringToHsl';
import { setUserAvatar } from '@/redux/slices/globalSlices/userSlices/userSlice';
import { extractTextFromImage } from '../../../../../utils/colorFileUtils';
import { urlToFile } from '@/utils/urlToFile';
import { avatarRequests, getUserInfoRequest } from '@/redux/requests';

const getFullImageUrl = (path: string): string => `${RESURSES_URL}${path}`;

export const useCirclePicker = () => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [localImage, setLocalImage] = useState<string | null>(null);
  const [color, setLocalColor] = useState<Color | null>({ h: 180, s: 100, l: 50, a: 1 });
  const pickerRef = useRef<HTMLDivElement | null>(null);

  const avatar = useSelector((state: RootState) => state.global.user.userInfo?.avatar);
  const userInfo = useSelector((state: RootState) => state.global.user.userInfo);
  const dispatch = useDispatch<TypeDispatch>();

  useEffect(() => {
    const isRgbColor = avatar?.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    console.log('userInfo', userInfo);
    if (isRgbColor) {
      setLocalColor(rgbStringToHsl(avatar));
      setLocalImage(null);
    } else {
      const handleAvatar = async () => {
        const res = await dispatch(getUserInfoRequest());

        console.log('res', res);
        const avatarUrl = getFullImageUrl(res.payload.avatar);
        try {
          const avatarFile = await urlToFile(avatarUrl, 'avatar_image.jpg');
          const extractedColor = await extractTextFromImage(avatarFile);

          if (extractedColor) {
            setLocalColor(rgbStringToHsl(extractedColor));
            setLocalImage(null);
          } else {
            setLocalImage(avatarUrl);
          }
        } catch (error) {
          setLocalImage(avatarUrl);
        }
      };

      handleAvatar();
    }
  }, []);

  const handleChangeColor = async (newColor: Color, onChange: (value: string) => void) => {
    const colorString = hslToRgb(newColor.h, newColor.s, newColor.l);
    setLocalColor(newColor);
    setLocalImage(null);
    dispatch(setUserAvatar(colorString));
    onChange(colorString);
  };

  const handleImageUpload = (file: File, onChange: (value: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setLocalImage(result);
      dispatch(setUserAvatar(file));
      dispatch(avatarRequests(file));
      onChange(result);
      setPickerVisible(false);
    };
    reader.readAsDataURL(file);
  };

  return {
    // avatar,
    isPickerVisible,
    setPickerVisible,
    localImage,
    color,
    pickerRef,
    handleChangeColor,
    handleImageUpload,
  };
};
