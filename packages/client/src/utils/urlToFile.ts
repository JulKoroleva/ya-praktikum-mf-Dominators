export const urlToFile = async (url: string, fileName: string): Promise<File> => {
  try {
    const response = await fetch(url, { credentials: 'include' }); // Добавлено включение куки
    if (!response.ok) {
      throw new Error(`Failed to fetch image from URL: ${url}`);
    }
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  } catch (error) {
    console.error(`Error fetching image from URL: ${url}`, error);
    throw error;
  }
};
