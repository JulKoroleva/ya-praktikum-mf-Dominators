export const createImageFile = (width: number, height: number, color: string): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return reject(new Error('Canvas context is not available'));
    }

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);

    canvas.toBlob(blob => {
      if (blob) {
        const file = new File([blob], 'generated_image.jpg', { type: 'image/jpeg' });
        resolve(file);
      } else {
        reject(new Error('Failed to generate image file'));
      }
    }, 'image/jpeg');
  });
};
