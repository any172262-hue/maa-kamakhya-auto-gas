import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  type = 'button',
  target,
  rel,
  ariaLabel,
  disabled = false,
  ...rest
}) {
  const variantClass = `btn-${variant}`;
  const sizeClass = size === 'lg' ? 'btn-lg' : '';
  const combinedClasses = `btn ${variantClass} ${sizeClass} ${className}`.trim();

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon size={size === 'lg' ? 20 : 17} className="btn-icon" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={size === 'lg' ? 20 : 17} className="btn-icon" />}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${combinedClasses} ${disabled ? 'disabled' : ''}`.trim()}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          if (onClick) onClick(e);
        }}
        aria-label={ariaLabel}
        aria-disabled={disabled ? 'true' : undefined}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...rest}
    >
      {content}
    </button>
  );
}
