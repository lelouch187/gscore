'use client';

import { ButtonHTMLAttributes } from 'react';
import './myButton.scss';
import '../../../styles/globals.scss';
import { Loader } from '../icons/Loader';

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  disabled: boolean;
}

export const MyButton = ({
  isLoading,
  disabled,
  children,
  ...props
}: MyButtonProps) => {
  return (
    <button type="submit" disabled={disabled} {...props}>
      {isLoading ? (
        <Loader className="animate" width="24" height="18" />
      ) : (
        children
      )}
    </button>
  );
};
