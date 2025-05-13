import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  footer?: ReactNode;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  description,
  footer,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden ${className}`}>
      {(title || description) && (
        <div className="px-6 py-4 border-b border-neutral-200">
          {title && <h3 className="text-lg font-medium text-neutral-800">{title}</h3>}
          {description && <p className="mt-1 text-sm text-neutral-500">{description}</p>}
        </div>
      )}
      
      <div className="p-6">{children}</div>
      
      {footer && (
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;