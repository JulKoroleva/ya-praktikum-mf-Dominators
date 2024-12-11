export const getBackgroundStyles = ({
  localImage,
  avatar,
  fieldValue,
}: {
  localImage: string | null;
  avatar: string | null;
  fieldValue: string;
}) => ({
  backgroundColor: localImage ? 'white' : fieldValue || avatar,
  backgroundImage: localImage ? `url(${localImage})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});
