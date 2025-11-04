import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  disabled,
  ...props 
}) => {
  const baseStyles = 'font-medium rounded-lg px-6 py-3 transition-all duration-200 ease-in-out';
  
  const variantStyles = {
    primary: 'bg-[#174A5B] hover:bg-[#1C586C] text-white disabled:bg-gray-300 disabled:cursor-not-allowed',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed',
    outline: 'border-2 border-[#174A5B] text-[#174A5B] hover:bg-[#174A5B] hover:text-white disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
