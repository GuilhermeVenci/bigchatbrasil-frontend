import React, { ButtonHTMLAttributes, FC } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        'w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mt-2',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
