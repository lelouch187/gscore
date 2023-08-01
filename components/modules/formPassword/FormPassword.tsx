'use client';
import { useForm } from 'react-hook-form';
import s from './formPassword.module.scss';
import MyInput from '@/components/UI/MyInput/MyInput';
import { MyButton } from '@/components/UI/MyButton/MyButton';
import { Colors } from '@/variables/colors';
import { useChangePasswordMutation } from '@/store/services';
import { UNAUTHORIZED } from '@/variables/constant';
import { useState } from 'react';

type FormValuesType = {
  currentPassword: string;
  newPassword: string;
};
type FormPasswordPropsType = {
  resetUser: () => void;
};

export const FormPassword = ({ resetUser }: FormPasswordPropsType) => {
  const [changePasswrod] = useChangePasswordMutation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    await changePasswrod(data)
      .unwrap()
      .catch((error) => {
        if (error.statuscode === UNAUTHORIZED) {
          resetUser();
        } else {
          setError(error.data.message);
        }
      })
      .finally(() => setLoading(false));
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
        isLoading={loading}
        disabled={false}>
        Save
      </MyButton>
      <span className="error_message">{error}</span>
    </form>
  );
};
