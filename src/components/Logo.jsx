import React from 'react';

export default function Logo({ 
  height = 54, 
  className = '',
  alt = 'Maa Kamakhya Auto Gas'
}) {
  return (
    <img
      src="/images/maa-kamakhya-auto-gas-logo.png"
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
