import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 p-6 ${
        hover ? 'transition-all duration-200 hover:bg-gray-50 hover:shadow-md' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
