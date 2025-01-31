import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '@/redux/selectors';
import { IThemeProviderProps } from './ThemeProvider.interface';

export const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const darkTheme = useSelector(selectTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkTheme]);

  if (!mounted) return null;

  return children;
};
