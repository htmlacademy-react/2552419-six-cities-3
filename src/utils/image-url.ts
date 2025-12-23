export const getImageUrl = (imagePath: string): string => {
  const baseUrl = import.meta.env.BASE_URL || '';

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  if (baseUrl && imagePath.startsWith(baseUrl)) {
    return imagePath;
  }

  return `${baseUrl}${imagePath}`;
};

