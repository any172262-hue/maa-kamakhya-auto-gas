import React from 'react';

export default function SectionHeading({
  tagline,
  title,
  highlight,
  description,
  align = 'center',
  badgeVariant = 'yellow',
  className = ''
}) {
  const badgeClass = badgeVariant === 'blue' ? 'badge-tag-blue' : '';
  const alignClass = align === 'left' ? 'text-left' : '';

  return (
    <div className={`section-heading ${alignClass} ${className}`.trim()}>
      {tagline && (
        <div className={`badge-tag ${badgeClass}`}>
          <span>{tagline}</span>
        </div>
      )}
      {title && (
        <h2>
          {title}{' '}
          {highlight && <span className="text-yellow">{highlight}</span>}
        </h2>
      )}
      {description && <p>{description}</p>}
    </div>
  );
}
