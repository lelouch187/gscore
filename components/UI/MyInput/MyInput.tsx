'use client';
import React, { InputHTMLAttributes } from 'react';
import './myInput.scss';
import { FieldError } from 'react-hook-form';

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error: FieldError | undefined;
  placeholder: string;
}

const MyInput = React.forwardRef<HTMLInputElement, MyInputProps>(
  ({ error, placeholder, ...props }, ref) => {
    const className = error ? 'input danger' : 'input';
    return (
      <input
        ref={ref}
        className={className}
        placeholder={placeholder}
        {...props}
      />
    );
  },
);

MyInput.displayName = 'MyInput';

export default MyInput;
