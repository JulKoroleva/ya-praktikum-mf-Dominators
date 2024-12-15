export const embedTextInImage = async (file: File, text: string): Promise<File> => {
  const img = new Image();
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      img.src = reader.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return reject(new Error('Canvas context is not available'));
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const metadata = JSON.stringify({ message: text });

        canvas.toBlob(blob => {
          if (blob) {
            const metadataBlob = new Blob([metadata], { type: 'application/json' });
            const newFile = new File([blob, metadataBlob], file.name, { type: file.type });
            resolve(newFile);
          } else {
            reject(new Error('Failed to generate new file'));
          }
        }, file.type);
      };

      img.onerror = error => {
        reject(error);
      };
    };

    reader.onerror = error => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

export const extractTextFromImage = async (file: File): Promise<string | null> => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      try {
        const metadataStart = reader.result?.toString().lastIndexOf('{');
        if (metadataStart === undefined || metadataStart === -1) {
          return resolve(null);
        }
        const metadataString = reader.result?.toString().slice(metadataStart);
        const metadata = JSON.parse(metadataString || '{}');
        resolve(metadata.message || null);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = error => {
      reject(error);
    };

    reader.readAsText(file);
  });
};
