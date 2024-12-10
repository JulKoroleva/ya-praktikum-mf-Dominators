export const getBackgroundStyles = ({
  localImage,
  selectedImage,
  selectedColor,
  fieldValue,
}: {
  localImage: string | null;
  selectedImage: string | null;
  selectedColor: string;
  fieldValue: string;
}) => ({
  backgroundColor: localImage || selectedImage ? 'white' : fieldValue || selectedColor,
  backgroundImage: localImage
    ? `url(${localImage})`
    : selectedImage
      ? `url(${selectedImage})`
      : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});
