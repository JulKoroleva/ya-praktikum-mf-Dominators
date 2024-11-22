export const validateEmail = (value: string) => {
  const validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!validEmailPattern.test(value)) {
    return 'Invalid email';
  }
  return true;
};
