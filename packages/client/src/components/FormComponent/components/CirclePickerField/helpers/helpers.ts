export const getBackgroundStyles = ({
  localImage,
  color,
  fieldValue,
}: {
  localImage: string | null;
  color: string | null;
  fieldValue: string;
}) => ({
  backgroundColor: localImage ? 'white' : color || fieldValue,
  backgroundImage: localImage ? `url(${localImage})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});
