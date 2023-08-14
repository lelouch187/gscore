'use client';

import { ButtonHTMLAttributes } from 'react';
import './myButton.scss';
import '../../../styles/globals.scss';
import { Loader } from '../icons/Loader';

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  disabled: boolean;
  loaderColor?: string;
}

export const MyButton = ({
  isLoading,
  disabled,
  loaderColor,
  children,
  ...props
}: MyButtonProps) => {
  return (
    <button type="submit" disabled={disabled} {...props}>
      {isLoading ? (
        <Loader color={loaderColor} className="animate" />
      ) : (
        children
      )}
    </button>
  );
};
