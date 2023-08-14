'use client';
import { useForm } from 'react-hook-form';
import s from './formPassword.module.scss';
import MyInput from '@/components/UI/MyInput/MyInput';
import { MyButton } from '@/components/UI/MyButton/MyButton';
import { Colors } from '@/variables/colors';
import { useChangePasswordMutation } from '@/store/services';
import { UNAUTHORIZED } from '@/variables/constant';
import { useState } from 'react';
import { ErrorRegistrationType } from '@/store/types';

type FormValuesType = {
  currentPassword: string;
  newPassword: string;
};
type FormPasswordPropsType = {
  resetUser: () => void;
};

export const FormPassword = ({ resetUser }: FormPasswordPropsType) => {
  const [changePassword, { isLoading, error }] =
    useChangePasswordMutation<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>();

  const onSubmit = handleSubmit(async (data) => {
    await changePassword(data)
      .unwrap()
      .catch((error: ErrorRegistrationType) => {
        if (error.statusCode === UNAUTHORIZED) {
          resetUser();
        }
      });
  });

  return (
    <form onSubmit={onSubmit} className={s.form}>
      <h3 className={s.form__title}>Change password</h3>
      <MyInput
        {...register('currentPassword', {
          minLength: {
            value: 6,
            message: 'password cannot be shorter than 6 characters',
          },
        })}
        error={errors.currentPassword}
        placeholder="Current Password"
      />
      {errors.currentPassword && (
        <span className="error_message">{errors.currentPassword.message}</span>
      )}
      <MyInput
        {...register('newPassword', {
          minLength: {
            value: 6,
            message: 'password cannot be shorter than 6 characters',
          },
        })}
        error={errors.newPassword}
        placeholder="New Password"
      />
      {errors.newPassword && (
        <span className="error_message">{errors.newPassword.message}</span>
      )}
      <MyButton
        className={`${Colors.primary} user`}
        isLoading={isLoading}
        disabled={false}>
        Save
      </MyButton>
      {error && <span className="error_message">{error.data.message}</span>}
    </form>
  );
};
