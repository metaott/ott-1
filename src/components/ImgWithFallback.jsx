import React, { useState } from 'react';

const IMG = '/자료/images';
const IMG_EXT = ['.jpg', '.jpeg', '.png', '.webp'];

export default function ImgWithFallback({ src, name, alt, className, fallback, ...props }) {
  const [tryIdx, setTryIdx] = useState(0);
  const [failed, setFailed] = useState(false);
  const handleError = () => {
    if (src) setFailed(true);
    else setTryIdx((i) => (i + 1 < IMG_EXT.length ? i + 1 : -1));
  };
  const fullSrc = src || (name != null && tryIdx >= 0 ? `${IMG}/${name}${IMG_EXT[tryIdx]}` : null);
  if (failed || (name != null && tryIdx < 0) || !fullSrc) return fallback || null;
  return (
    <img
      src={fullSrc}
      alt={alt || ''}
      className={className}
      onError={handleError}
      loading="lazy"
      {...props}
    />
  );
}

export { IMG };
