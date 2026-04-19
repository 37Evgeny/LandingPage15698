import { useState } from "react";

const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i;

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

function useImageUrl(url) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isEmpty = !url.trim();
  const isInvalidUrl = !isEmpty && !isValidUrl(url);
  const isInvalidExtension =
    !isEmpty && !isInvalidUrl && !IMAGE_EXTENSIONS.test(url);

  const validationError = isInvalidUrl
    ? "Введите корректный URL"
    : isInvalidExtension
    ? "URL должен вести на изображение (jpg, png, webp...)"
    : "";

  const showPreview = !isEmpty && !isInvalidUrl;

  return {
    isEmpty,
    isInvalidUrl,
    isInvalidExtension,
    validationError,
    showPreview,
    imageError,
    imageLoaded,
    setImageError,
    setImageLoaded,
  };
}

export default useImageUrl;
