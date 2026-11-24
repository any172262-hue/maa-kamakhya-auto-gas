import React from 'react';

export default function Logo({ 
  height = 54, 
  width,
  className = '',
  alt = 'Maa Kamakhya Auto Gas',
  priority = false
}) {
  const finalWidth = width || (typeof height === 'number' ? Math.round(height * (523 / 477)) : undefined);
  const finalHeight = typeof height === 'number' ? height : undefined;
  const webpSrc = `${import.meta.env.BASE_URL}images/maa-kamakhya-auto-gas-logo.webp`;
  const pngSrc = `${import.meta.env.BASE_URL}images/maa-kamakhya-auto-gas-logo.png`;

  return (
    <picture style={{ display: 'contents' }}>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={pngSrc}
        alt={alt}
        width={finalWidth}
        height={finalHeight}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchpriority={priority ? 'high' : 'auto'}
        className={`brand-logo ${className}`}
        style={{
          display: 'block',
          margin: '0 auto',
          height: typeof height === 'number' ? `${height}px` : height,
          width: finalWidth ? `${finalWidth}px` : 'auto',
          aspectRatio: '523 / 477',
          maxWidth: '100%',
          objectFit: 'contain'
        }}
      />
    </picture>
  );
}
