import React from 'react';

export default function Logo({ 
  height = 54, 
  className = '',
  alt = 'Maa Kamakhya Auto Gas'
}) {
  const logoSrc = `${import.meta.env.BASE_URL}images/maa-kamakhya-auto-gas-logo.png`;

  return (
    <img
      src={logoSrc}
      alt={alt}
      className={`brand-logo ${className}`}
      style={{
        display: 'block',
        height: typeof height === 'number' ? `${height}px` : height,
        width: 'auto',
        maxWidth: '100%',
        objectFit: 'contain'
      }}
      loading="eager"
    />
  );
}
