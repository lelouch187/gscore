'use client';

import { ButtonHTMLAttributes } from 'react';
import './MyButton.scss';

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  variant: 'primary' | 'secondary';
  disabled: boolean;
}

export const MyButton = ({
  isLoading,
  variant,
  disabled,
  children,
  ...props
}: MyButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={variant === 'primary' ? 'primary' : 'secondary'}
      {...props}>
      {children}
    </button>
  );
};
