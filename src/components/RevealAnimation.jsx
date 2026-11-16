import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function RevealAnimation({
  children,
  delay = 0,
  threshold = 0.12,
  className = '',
  as: Component = 'div',
  ...rest
}) {
  const ref = useScrollReveal({ threshold });
  const delayClass = delay ? `reveal-delay-${delay}` : '';

  return (
    <Component
      ref={ref}
      className={`reveal-init ${delayClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
}
